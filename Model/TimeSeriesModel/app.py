import statsmodels.api as sm
from io import StringIO
import pandas as pd
from flask import Flask, request, jsonify
import os
app = Flask(__name__)
def predictSamar():
    try:
        file = request.files['file']

        content = file.stream.read().decode("utf-8")
        df = pd.read_csv(StringIO(content))

        if "year" not in df.columns or "month" not in df.columns or "carbon_footprint_kgCO2" not in df.columns:
            return jsonify({"error": "CSV must contain 'year', 'month', and 'carbon_footprint_kgCO2' columns"}), 400

        df['date'] = pd.to_datetime(df[['year', 'month']].assign(day=1))


        train = df["carbon_footprint_kgCO2"]

        model = sm.tsa.ExponentialSmoothing(train, trend='mul', seasonal='add', seasonal_periods=12)
        fitted_model = model.fit()

        forecast = fitted_model.forecast(6).tolist()

        
        last_date = df['date'].iloc[-1]  
        forecast_dates = pd.date_range(start=last_date, periods=7, freq='M')[1:]  
        forecast_df = pd.DataFrame({
            "date": forecast_dates,
            "carbon_footprint_kgCO2": forecast
        })

        forecast_df['year'] = forecast_df['date'].dt.year
        forecast_df['month'] = forecast_df['date'].dt.month

        result = forecast_df[['year', 'month', 'carbon_footprint_kgCO2']].to_dict(orient='records')

        return jsonify({"predicted_carbon_footprint_kgCO2": result})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
