import pandas as pd
import numpy as np
import statsmodels.api as sm
import matplotlib.pyplot as plt
from io import StringIO
import io
from flask import Flask, request, jsonify
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from statsmodels.tsa.statespace.sarimax import SARIMAX
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from azure.ai.inference import ChatCompletionsClient
from azure.ai.inference.models import SystemMessage, UserMessage
from azure.core.credentials import AzureKeyCredential
import xgboost as xgb
import base64
import os
import joblib

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


app = Flask(__name__)
@app.route('/forecast', methods=['POST'])

def ForecastCarbonFootprint():
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


#partie eya
# Define the custom_loss function (must match the one used during training)
def custom_loss(y_true, y_pred):
    gradient = np.where(y_pred < 0, -1, 2 * (y_pred - y_true))
    hessian = np.where(y_pred < 0, 0, 2)
    return gradient, hessian
'''
# Load the ensemble model
ensemble_model = joblib.load('ensemble_event_emission_model.pkl')
xgb_pipeline = ensemble_model['xgb_model']
gamma_pipeline = ensemble_model['gamma_model']
best_alpha = ensemble_model['alpha']

@app.route('/eventPredict', methods=['POST'])
def eventPredict():
    try:
        # Get the JSON data from the request
        data = request.get_json(force=True)

        # Ensure the input is a list of dictionaries
        if not isinstance(data, list):
            return jsonify({"error": "Input data must be a list of dictionaries"}), 400

        # Convert input data to a DataFrame
        input_data = pd.DataFrame(data)

        # Define required columns
        required_columns = [
            "Duration (hours)", "Participants", "Number of Devices", "Avg Power per Device (kW)",
            "Energy Usage Hours", "Transport Distance (km)", "Attendees Using Transport",
            "Number of Meals", "Printed Material (kg)", "Decoration Material (kg)",
            "Event Type", "Venue Type", "Location", "Transport Mode", "Meal Type"
        ]
        missing_columns = set(required_columns) - set(input_data.columns)
        if missing_columns:
            return jsonify({"error": f"Columns are missing: {missing_columns}"}), 400

        # Make predictions using the XGBoost model
        xgb_pred = xgb_pipeline.predict(input_data)

        # Make predictions using the Gamma Regression model
        gamma_pred = np.expm1(gamma_pipeline.predict(input_data))  # Reverse log-transform

        # Combine predictions using the best alpha value
        ensemble_pred = best_alpha * xgb_pred + (1 - best_alpha) * gamma_pred

        # Replace negative ensemble predictions with Gamma Regression predictions
        ensemble_pred = np.where(ensemble_pred < 0, gamma_pred, ensemble_pred)

        # Return the predictions as a JSON response
        return jsonify({"predictions": ensemble_pred.tolist()})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

'''
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
        xgb.XGBRegressor(objective='reg:squarederror', n_estimators=100, learning_rate=0.1, max_depth=5, random_state=42))
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
AZURE_ENDPOINT = "https://models.inference.ai.azure.com"
AZURE_TOKEN = "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"
MODEL_NAME = "gpt-4o-mini"
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
    - Business Sector : {data.get('activitySector', 'Not specified')}
    - Number of Full-Time Employees : {data.get('numberOfFullTimeEmployees', 'Not specified')}
    - Telework Percentage : {data.get('percentageOfTelework', 'Not specified')}%
    ## Energy ##
    - Annual Electricity Consumption : {data.get('annualConsumptionOfElectricity', 0)}
    - Annual Natural Gas Consumption : {data.get('annualConsumptionOfNaturalGas', 0)}
    - Annual Propane Consumption : {data.get('annualConsumptionOfPropane', 0)}
    - Annual Fuel Consumption : {data.get('annualConsumptionOfFuel', 0)}
    - Annual Coal Consumption : {data.get('annualConsumptionOfCoal', 0)}
    - Annual Refrigerant Consumption : {data.get('annualConsumptionOfRefrigerant', 0)}
    - Annual LPG Consumption : {data.get('annualConsumptionOfGPL', 0)}
    ## Transport ##
    - Gasoline Fuel Consumption : {data.get('fuelConsumptionOfGasoline', 0)}
    - Diesel Fuel Consumption : {data.get('fuelConsumptionOfDiesel', 0)}
    - LPG Consumption : {data.get('consumptionOfLPG', 0)}
    - Number of Light Duty Vehicles : {data.get('numberOfLightDutyVehicles', 0)}
    - Number of Commercial Vehicles : {data.get('numberOfCommercialVehicles', 0)}
    - Number of Heavy Vehicles : {data.get('numberOfHeavyVehicles', 0)}
    ## Logistics ##
    - Air Freight (<3000 tons) : {data.get('tonsOfAirFreightLt3000', 0)}
    - Air Freight (>3000 tons) : {data.get('tonsOfAirFreightGt3000', 0)}
    - Sea Freight (<3000 tons) : {data.get('tonsOfSeaFreightLt3000', 0)}
    - Sea Freight (>3000 tons) : {data.get('tonsOfSeaFreightGt3000', 0)}
    ## Office ##
    - Paper Expenses : {data.get('expensesOfPaper', 0)}
    - Office Supplies Expenses : {data.get('expensesOfSmallOfficeSupplies', 0)}
    - Company Built Area : {data.get('builtAreaOfCompany', 0)}
    ## IT ##
    - Number of Desktop Computers : {data.get('numberOfDesktopComputers', 0)}
    - Number of Laptops : {data.get('numberOfLaptops', 0)}
    - Number of Individual Printers : {data.get('numberOfIndividualPrinters', 0)}
    - Number of Servers : {data.get('numberOfServers', 0)}
    - Number of Multifunction Printers : {data.get('numberOfMultifunctionPrinters', 0)}
    - Number of Flat Panel Screens : {data.get('numberOfFlatPanelScreens', 0)}
    ## Mobility ##
    - Short-Haul Round Trips: {data.get('numberOfShortHaulRoundTrip', 0)}
    - Medium-Haul Round Trips: {data.get('numberOfMediumHaulRoundTrip', 0)}
    - Long-Haul Round Trips: {data.get('numberOfLongHaulRoundTrip', 0)}
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
        # Générer le prompt
        prompt = generate_prompt(data)

        # Initialiser le client Azure
        client = ChatCompletionsClient(
            endpoint=AZURE_ENDPOINT,
            credential=AzureKeyCredential(AZURE_TOKEN),
        )

        # Appeler l'API Azure
        response = client.complete(
            messages=[
                SystemMessage("""
                              Vous êtes un assistant d’analyse de données spécialisé dans la génération de prédictions précises et détaillées. Votre tâche est de fournir des prédictions claires en respectant le format demandé, sans ajouter de texte superflu ou d'explications hors sujet.
                              """),
                UserMessage(prompt),
            ],
            model=MODEL_NAME,
            temperature=0.74,
            max_tokens=4096,
            top_p=1
        )

        # Extraire le contenu de la réponse
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
      
@app.route('/generate-recommendations-event', methods=['POST'])
def generate_recommendations_event():
    try:
        # Récupérer les données JSON de la requête
        data = request.get_json()
    
        # Créer une instance de EventData avec les données reçues
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
        # Générer le prompt
        prompt = generate_event_prompt(event_data)
        # Initialiser le client Azure
        client = ChatCompletionsClient(
            endpoint=AZURE_ENDPOINT,
            credential=AzureKeyCredential(AZURE_TOKEN),
        )

        # Appeler l'API Azure
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


if __name__ == '__main__':
    app.run(debug=True)