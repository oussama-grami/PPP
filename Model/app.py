from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from azure.ai.inference import ChatCompletionsClient
from azure.ai.inference.models import SystemMessage, UserMessage
from azure.core.credentials import AzureKeyCredential
import xgboost as xgb
import joblib
from flask import Flask
import pandas as pd

import numpy as np
import torch
import torch.nn as nn
from datetime import datetime
from dateutil.relativedelta import relativedelta
import os
app = Flask(__name__)
class EventData:
    def __init__(self,
                 event_name: str,
                 event_type: str,
                 duration: int,
                 participants: int,
                 venue_type: str,
                 location: str,
                 number_of_devices: int,
                 avg_power_per_device: float,
                 energy_usage_hours: int,
                 transport_mode: str,
                 transport_distance: float,
                 attendees_using_transport: int,
                 meal_type: str,
                 number_of_meals: int,
                 printed_material: float,
                 decoration_material: float,
                 total_emissions: float):
        self.event_name = event_name
        self.event_type = event_type
        self.duration = duration
        self.participants = participants
        self.venue_type = venue_type
        self.location = location
        self.number_of_devices = number_of_devices
        self.avg_power_per_device = avg_power_per_device
        self.energy_usage_hours = energy_usage_hours
        self.transport_mode = transport_mode
        self.transport_distance = transport_distance
        self.attendees_using_transport = attendees_using_transport
        self.meal_type = meal_type
        self.number_of_meals = number_of_meals
        self.printed_material = printed_material
        self.decoration_material = decoration_material
        self.total_emissions = total_emissions




# partie eya
# Define the custom_loss function (must match the one used during training)
def custom_loss(y_true, y_pred):
    gradient = np.where(y_pred < 0, -1, 2 * (y_pred - y_true))
    hessian = np.where(y_pred < 0, 0, 2)
    return gradient, hessian

model = joblib.load('ensemble_event_emission_model.pkl')
xgb_pipeline = model["xgb_model"]
gamma_pipeline = model["gamma_model"]

# Used columns (exclude Event Type, Venue Type, Location)
used_columns = [
    "Duration (hours)", "Participants", "Number of Devices", "Avg Power per Device (kW)",
    "Energy Usage Hours", "Transport Distance (km)", "Attendees Using Transport",
    "Number of Meals", "Printed Material (kg)", "Decoration Material (kg)",
    "Transport Mode", "Meal Type"
]

@app.route('/eventPredict', methods=['POST'])
def eventPredict():
    try:
        data = request.get_json(force=True)

        if not isinstance(data, list):
            return jsonify({"error": "Input must be a list of event objects"}), 400

        input_df = pd.DataFrame(data)

        missing = set(used_columns) - set(input_df.columns)
        if missing:
            return jsonify({"error": f"Missing columns: {missing}"}), 400

        categorical_features = ["Transport Mode", "Meal Type"]
        for col in categorical_features:
            if col in input_df.columns and input_df[col].dtype == object:
                input_df[col] = input_df[col].str.lower()

        input_filtered = input_df[used_columns]

        xgb_preds = xgb_pipeline.predict(input_filtered)
        final_preds = []

        for i, pred in enumerate(xgb_preds):
            if pred < 0:
                gamma_pred = np.expm1(gamma_pipeline.predict(input_filtered.iloc[[i]]))[0]
                averaged = (pred + gamma_pred) / 2
                final_preds.append(float(averaged))
            else:
                final_preds.append(float(pred))

        print("Final Predictions:", final_preds)
        return jsonify({"predictions": final_preds})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = pd.read_csv('carbon_footprint_dataset.csv')
        X = data.drop(columns=['carbon_footprint'])
        y = data['carbon_footprint']

        categorical_cols = X.select_dtypes(include=['object']).columns
        numerical_cols = X.select_dtypes(include=['int64', 'float64']).columns

        preprocessor = ColumnTransformer(
            transformers=[
                ('num', StandardScaler(), numerical_cols),
                ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_cols)
            ])

        model = Pipeline(steps=[
            ('preprocessor', preprocessor),
            ('regressor',
             xgb.XGBRegressor(objective='reg:squarederror', n_estimators=100, learning_rate=0.1, max_depth=5,
                              random_state=42))
        ])
        model.fit(X, y)
        data = request.get_json()
        params = data.get('parameters')

        if not params:
            return jsonify({"error": "Paramètres manquants"}), 400
        input_data = pd.DataFrame([params])
        prediction = model.predict(input_data)
        prediction_value = float(prediction[0])
        return jsonify({"carbon_footprint_prediction": prediction_value})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Configuration Azure
AZURE_ENDPOINT = os.getenv("AZURE_ENDPOINT", "https://models.github.ai/inference")
AZURE_TOKEN = os.getenv("AZURE_TOKEN")
MODEL_NAME = os.getenv("MODEL_NAME", "openai/gpt-4.1-mini")


# Fonction pour générer le prompt à partir des données
def generate_prompt(data):
    return f"""
    ### COMPANY CONTEXT ###
    Generate as many relevant technical recommendations as possible
    related to the value of each parameter below
    unknown to the company or normal user IN ENGLISH
    and only for parameters with values
    slightly high or very high compared to standards
    and display parameters in a more readable/clearer way
    than the example provided below
    REQUIRED FORMAT is specified by the two examples below
    ### ABSOLUTE RULES ###
    1. Only character strings
    2. Percentage format: -12% (not 0.12 or .12)
    3. No isolated numbers
    4. No subarrays
    ### DATA ###
    ## GENERAL ##
    - Country : {data.get('country', 'Not specified')}
    - Business Sector : {data.get('activity_sector', 'Not specified')}
    - Number of Full-Time Employees : {data.get('number_of_full_time_employees', 'Not specified')}
    - Telework Percentage : {data.get('percentage_of_telework', 'Not specified')}%
    ## Energy ##
    - Annual Electricity Consumption : {data.get('annual_consumption_of_electricity', 0)}
    - Annual Natural Gas Consumption : {data.get('annual_consumption_of_natural_gas', 0)}
    - Annual Propane Consumption : {data.get('annual_consumption_of_propane', 0)}
    - Annual Fuel Consumption : {data.get('annual_consumption_of_fuel', 0)}
    - Annual Coal Consumption : {data.get('annual_consumption_of_coal', 0)}
    - Annual Refrigerant Consumption : {data.get('annual_consumption_of_refrigerant', 0)}
    - Annual LPG Consumption : {data.get('annual_consumption_of_GPL', 0)}
    ## Transport ##
    - Gasoline Fuel Consumption : {data.get('fuel_consumption_of_gasoline', 0)}
    - Diesel Fuel Consumption : {data.get('fuel_consumption_of_diesel', 0)}
    - LPG Consumption : {data.get('consumption_of_LPG', 0)}
    - Number of Light Duty Vehicles : {data.get('number_of_light_duty_vehicles', 0)}
    - Number of Commercial Vehicles : {data.get('number_of_commercial_vehicles', 0)}
    - Number of Heavy Vehicles : {data.get('number_of_heavy_vehicles', 0)}
    ## Logistics ##
    - Air Freight (<3000 tons) : {data.get('tons_of_air_freight_lt_3000', 0)}
    - Air Freight (>3000 tons) : {data.get('tons_of_air_freight_gt_3000', 0)}
    - Sea Freight (<3000 tons) : {data.get('tons_of_sea_freight_lt_3000', 0)}
    - Sea Freight (>3000 tons) : {data.get('tons_of_sea_freight_gt_3000', 0)}
    ## Office ##
    - Paper Expenses : {data.get('expenses_of_paper', 0)}
    - Office Supplies Expenses : {data.get('expenses_of_small_office_supplies', 0)}
    - Company Built Area : {data.get('built_area_of_company', 0)}
    ## IT ##
    - Number of Desktop Computers : {data.get('number_of_desktop_computers', 0)}
    - Number of Laptops : {data.get('number_of_laptops', 0)}
    - Number of Individual Printers : {data.get('number_of_individual_printers', 0)}
    - Number of Servers : {data.get('number_of_servers', 0)}
    - Number of Multifunction Printers : {data.get('number_of_multifunction_printers', 0)}
    - Number of Flat Panel Screens : {data.get('number_of_flat_panel_screens', 0)}
    ## Mobility ##
    - Short-Haul Round Trips: {data.get('number_of_short_haul_round_trip', 0)}
    - Medium-Haul Round Trips: {data.get('number_of_medium_haul_round_trip', 0)}
    - Long-Haul Round Trips: {data.get('number_of_long_haul_round_trip', 0)}
    ### VALID EXAMPLES ###
    [
    {{
        'parameter': 'Annual Consumption Of Electricity',
        'interpretation':'High energy consumption represents 15% of operational costs',
        'objective':'Reduce consumption by -12% through LED retrofitting'
    }},{{
        'parameter': 'Number Of Light Duty Vehicles',
        'interpretation':'Vehicle fleet exceeds industry average by 20%',
        'objective':'Transition 30% of fleet to electric vehicles by Q4'
    }}
    ]
    ### SANCTIONS ###
    Any non-compliant response will be automatically rejected.
    Do not give an empty response or a response that does not respect the format
    """


def generate_event_prompt(event_data):
    return f"""
    ### EVENT CONTEXT ###
    Generate sustainability recommendations for event management
    based on parameters exceeding industry standards
    Format requirements and rules remain identical to original prompt
    Focus on event-specific carbon reduction strategies

    ### ABSOLUTE RULES ###
    1. Only use event-related parameters from below
    2. Percentage format: -12% (not decimal)
    3. Concrete actionable objectives
    4. No markdown formatting

    ### EVENT DATA ###
    ## GENERAL ##
    - Event Name : {event_data.event_name}
    - Event Type : {event_data.event_type}
    - Duration : {event_data.duration} hours
    - Participants : {event_data.participants}
    - Venue Type : {event_data.venue_type}
    - Location : {event_data.location}

    ## ENERGY ##
    - Number of Devices : {event_data.number_of_devices}
    - Avg Power/Device : {event_data.avg_power_per_device:.2f} kW
    - Energy Usage Hours : {event_data.energy_usage_hours}

    ## TRANSPORT ##
    - Transport Mode : {event_data.transport_mode}
    - Transport Distance : {event_data.transport_distance:.2f} km
    - Attendees Using Transport : {event_data.attendees_using_transport}

    ## CATERING ##
    - Meal Type : {event_data.meal_type}
    - Number of Meals : {event_data.number_of_meals}

    ## MATERIALS ##
    - Printed Material : {event_data.printed_material:.2f} kg
    - Decoration Material : {event_data.decoration_material:.2f} kg

    ## IMPACT ##
    - Total Emissions : {event_data.total_emissions:.2f} CO2e

    ### VALID EXAMPLES ###
    [
        {{
            "parameter": "Transport Distance",
            "interpretation": "Transport distance exceeds average by 25%",
            "objective": "Optimize attendee transportation to reduce distance by -15%"
        }},
        {{
            "parameter": "Printed Material",
            "interpretation": "Paper usage is 40% higher than green event standards",
            "objective": "Implement digital alternatives to reduce printing by -20%"
        }}
    ]

    ### SANCTIONS ###
    Non-compliant responses will be rejected
    Do not give an empty response or a response that does not respect the format
    """


# Endpoint Flask

@app.route('/generate-recommendations-entreprise', methods=['POST'])
def generate_recommendations_entreprise():
    try:
        # Récupérer les données JSON de la requête
        data = request.get_json()
        print("+++++++++++++++++++++++++++")
        # Générer le prompt
        prompt = generate_prompt(data)
        print("---------------------------")
        # Initialiser le client Azure
        client = ChatCompletionsClient(
            endpoint=AZURE_ENDPOINT,
            credential=AzureKeyCredential(AZURE_TOKEN),
        )
        print("***************************")
        # Appeler l'API Azure
        response = client.complete(
            messages=[
                SystemMessage("""
                              Vous êtes un assistant d’analyse de données spécialisé dans la génération de prédictions précises et détaillées. Votre tâche est de fournir des prédictions claires en respectant le format demandé, sans ajouter de texte superflu ou d'explications hors sujet.
                              """),
                UserMessage(prompt),
            ],
            model=MODEL_NAME,
            temperature=1,
            top_p=1
        )
        print("/////////////////////////////////")
        print(response)
        # Extraire le contenu de la réponse
        raw_recommendations = response.choices[0].message.content
        return jsonify({
            "status": "success",
            "recommendations": raw_recommendations
        })
    except Exception as e:
        print(f"Error generating recommendations: {e}")
        return jsonify({
            "status": "error",
            "recommendations": []
        }), 500


@app.route('/generate-recommendations-event', methods=['POST'])
def generate_recommendations_event():
    try:
        data = request.get_json()

        mapped_data = {
            "event_name": data.get("eventName", "Not specified"),
            "event_type": data.get("eventType", "Not specified"),
            "duration": data.get("duration", 0),
            "participants": data.get("participants", 0),
            "venue_type": data.get("venueType", "Not specified"),
            "location": data.get("location", "Not specified"),
            "number_of_devices": data.get("numberOfDevices", 0),
            "avg_power_per_device": data.get("avgPowerPerDevice", 0.0),
            "energy_usage_hours": data.get("energyUsageHours", 0),
            "transport_mode": data.get("transportMode", "Not specified"),
            "transport_distance": data.get("transportDistance", 0.0),
            "attendees_using_transport": data.get("attendeesUsingTransport", 0),
            "meal_type": data.get("mealType", "Not specified"),
            "number_of_meals": data.get("numberOfMeals", 0),
            "printed_material": data.get("printedMaterial", 0.0),
            "decoration_material": data.get("decorationMaterial", 0.0),
            "total_emissions": data.get("totalEmissions", 0.0),
        }
        event_data = EventData(**mapped_data)
        prompt = generate_event_prompt(event_data)
        # Initialiser le client Azure
        client = ChatCompletionsClient(
            endpoint=AZURE_ENDPOINT,
            credential=AzureKeyCredential(AZURE_TOKEN),
        )

        response = client.complete(
            messages=[
                SystemMessage("""
                              Vous êtes un assistant d’analyse de données spécialisé
                              dans la génération de
                              prédictions précises et détaillées. Votre tâche est de
                              fournir des prédictions claires en respectant le
                              format demandé, sans ajouter de texte superflu
                              ou d'explications hors sujet.
                              """),
                UserMessage(prompt),
            ],
            model=MODEL_NAME,
            temperature=0.74,
            max_tokens=4096,
            top_p=1
        )

        raw_recommendations = response.choices[0].message.content
        return jsonify({
            "status": "success",
            "recommendations": raw_recommendations
        })
    except Exception as e:
        return jsonify({
            "status": "error",
            "recommendations": []
        }), 500



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

class LSTMModel(nn.Module):
    def __init__(self, input_size=1, hidden_size=64, num_layers=2):
        super(LSTMModel, self).__init__()
        self.lstm = nn.LSTM(input_size, hidden_size, num_layers, batch_first=True)
        self.fc = nn.Linear(hidden_size, 1)

    def forward(self, x):
        out, _ = self.lstm(x)
        return self.fc(out[:, -1, :])
from datetime import date

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
@app.route('/forecast', methods=['POST'])
def predict_carbon_footprint():
    try:
        # Get and validate input
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

if __name__ == '__main__':
    app.run(debug=False,port=7860,host="0.0.0.0")
