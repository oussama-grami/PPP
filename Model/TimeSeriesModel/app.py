from flask import Flask, request, jsonify
import torch
import torch.nn as nn
import pandas as pd
import numpy as np
from dateutil.relativedelta import relativedelta
from datetime import date, datetime

app = Flask(__name__)

# --- Input Validation ---
def validate_input(data):
    required_keys = {'year', 'month', 'carbon_footprint_kgCO2'}
    for key in required_keys:
        if key not in data:
            raise ValueError(f"Missing required field: {key}")

    if len(data['year']) != len(data['month']) or len(data['year']) != len(data['carbon_footprint_kgCO2']):
        raise ValueError("The lengths of 'year', 'month', and 'carbon_footprint_kgCO2' must be the same.")

    if not np.issubdtype(np.array(data['year']).dtype, np.integer):
        raise ValueError("Year must be integers.")
    if not np.all((np.array(data['month']) >= 1) & (np.array(data['month']) <= 12)):
        raise ValueError("Month must be in range 1-12.")
    if not np.issubdtype(np.array(data['carbon_footprint_kgCO2']).dtype, np.floating):
        raise ValueError("Carbon footprint must be float values.")

# --- LSTM Model ---
class LSTMModel(nn.Module):
    def __init__(self, input_size=1, hidden_size=64, num_layers=2):
        super(LSTMModel, self).__init__()
        self.lstm = nn.LSTM(input_size, hidden_size, num_layers, batch_first=True)
        self.fc = nn.Linear(hidden_size, 1)

    def forward(self, x):
        out, _ = self.lstm(x)
        return self.fc(out[:, -1, :])


@app.route('/forecast', methods=['POST'])
def predict_carbon_footprint():
    try:
        #Get and validate input
        raw = request.get_json(force=True)
        validate_input(raw)

        df = pd.DataFrame({
            'year': raw['year'],
            'month': raw['month'],
            'carbon_footprint_kgCO2': raw['carbon_footprint_kgCO2']
        })
        df['date'] = pd.to_datetime(df['year'].astype(str) + '-' + df['month'].astype(str))
        df.sort_values('date', inplace=True)
        df.reset_index(drop=True, inplace=True)

        #Normalize data
        values = df['carbon_footprint_kgCO2'].values.astype(np.float32)
        min_val, max_val = values.min(), values.max()
        normalized = (values - min_val) / (max_val - min_val)

        #Prepare training sequence
        sequence_length = 6
        X, y = [], []
        for i in range(len(normalized) - sequence_length):
            X.append(normalized[i:i+sequence_length])
            y.append(normalized[i+sequence_length])
        X, y = np.array(X), np.array(y)

        X_tensor = torch.tensor(X).unsqueeze(-1)
        y_tensor = torch.tensor(y)

        #Train LSTM
        model = LSTMModel()
        criterion = nn.MSELoss()
        optimizer = torch.optim.Adam(model.parameters(), lr=0.01)

        model.train()
        for epoch in range(300):
            output = model(X_tensor)
            loss = criterion(output.squeeze(), y_tensor)
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()

        #Forecast next 6 months
        model.eval()
        predictions = []
        input_seq = normalized[-sequence_length:].tolist()

        for _ in range(6):
            seq_tensor = torch.tensor(input_seq[-sequence_length:]).unsqueeze(0).unsqueeze(-1)
            with torch.no_grad():
                pred = model(seq_tensor).item()
            predictions.append(pred)
            input_seq.append(pred)

        #Denormalize predictions
        denorm = [(p * (max_val - min_val) + min_val) for p in predictions]

        #Construct date info for output
        last_date = df['date'].iloc[-1]
        result = []
        for value in denorm:
            last_date += relativedelta(months=1)
            result.append({
                'year': last_date.year,
                'month': last_date.month,
                'carbon_footprint_kgCO2': round(float(max(0, value)), 2)
            })

        return jsonify(result)

    except Exception as e:
        return jsonify({'error': str(e)}), 400


import pandas as pd
import numpy as np
from datetime import date
from dateutil.relativedelta import relativedelta

import pandas as pd
import numpy as np
from datetime import date
from dateutil.relativedelta import relativedelta


def interpolate(historical_df: pd.DataFrame, start_date: date, end_date: date, total_value: float):
    # Step 1: Convert year/month to datetime
    historical_df['date'] = pd.to_datetime(historical_df[['year', 'month']].assign(day=1))

    # Step 2: Calculate median carbon footprint per month
    monthly_medians = historical_df.groupby(historical_df['date'].dt.month)['carbon_footprint_kgCO2'].median()

    # Step 3: Reindex to ensure all 12 months are represented
    all_months = monthly_medians.reindex(range(1, 13))

    # Step 4: Fill missing months using interpolation and fallback
    seasonal_profile = (
        all_months.interpolate(method='linear', limit_direction='both')
        .ffill()
        .bfill()
    )

    # Step 5: Normalize the seasonal profile so it sums to 1
    seasonal_profile /= seasonal_profile.sum()

    # Step 6: Generate list of months in the target date range
    num_months = (end_date.year - start_date.year) * 12 + (end_date.month - start_date.month) + 1
    months = [start_date + relativedelta(months=i) for i in range(num_months)]

    # Step 7: Assign weights based on seasonal profile
    weights = np.array([seasonal_profile[dt.month] for dt in months])
    weights /= weights.sum()

    # Step 8: Distribute total_value across months
    monthly_values = weights * total_value

    # Step 9: Round and adjust for rounding error
    rounded_values = [round(float(val), 4) for val in monthly_values]
    difference = round(total_value - sum(rounded_values), 5)  # Small tolerance for floating point drift

    if abs(difference) > 1e-5:
        rounded_values[-1] += difference  # Adjust the last month to preserve total

    # Step 10: Construct final result
    result = [
        {
            "year": dt.year,
            "month": dt.month,
            "carbon_footprint_kgCO2": val
        }
        for dt, val in zip(months, rounded_values)
    ]

    return result


from flask import Flask, request, jsonify
import datetime

app = Flask(__name__)

@app.route('/interpolate', methods=['POST'])
def interpolate_handler():
    data = request.get_json()

    df = pd.DataFrame(data['historical'])

    start_date = datetime.datetime.strptime(data['start_date'], "%Y-%m-%d").date()
    end_date = datetime.datetime.strptime(data['end_date'], "%Y-%m-%d").date()
    total_value = data['total_value']

    result = interpolate(df, start_date, end_date, total_value)

    # Format result to match CreateCarbonFootprintHistoryDTO shape
    flask_result = [{
        'date': f"{item['year']}-{item['month']:02d}",
        'predicted': True,
        'value': item['carbon_footprint_kgCO2']
    } for item in result]

    return jsonify(flask_result), 200
if __name__ == '__main__':
    app.run(debug=True)
