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
from flask import Flask, request, jsonify
import pandas as pd
from prophet import Prophet


from statsmodels.tsa.arima.model import ARIMA
from prophet import Prophet
import itertools


from flask import Flask, request, jsonify
import pandas as pd
import numpy as np

# forecasting libraries
from statsmodels.tsa.statespace.sarimax import SARIMAX
from statsmodels.tsa.holtwinters import ExponentialSmoothing
from prophet import Prophet

from sklearn.metrics import mean_absolute_error, r2_score, mean_squared_error
import itertools

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


def validate_input(data):
    required = {'year', 'month', 'carbon_footprint_kgCO2'}
    if not isinstance(data, dict) or not required.issubset(data):
        missing = required - set(data)
        raise ValueError(f"Missing required fields: {missing}")
    df = pd.DataFrame(data)
    if not np.issubdtype(df['year'].dtype, np.integer):
        raise ValueError("Year must be integer values")
    if not df['month'].between(1, 12).all():
        raise ValueError("Month values must be between 1 and 12")

def preprocess_data(df):
    df = df.copy()
    df['date'] = pd.to_datetime({
        'year':  df['year'],
        'month': df['month'],
        'day':   1
    })
    df = df.set_index('date').sort_index().asfreq('MS')

    if len(df) < 12:
        raise ValueError("Need at least 12 months of data")

    # Remove extreme outliers (3×IQR)
    q1 = df['carbon_footprint_kgCO2'].quantile(0.25)
    q3 = df['carbon_footprint_kgCO2'].quantile(0.75)
    iqr = q3 - q1
    mask = (df['carbon_footprint_kgCO2'] >= q1 - 3*iqr) & \
           (df['carbon_footprint_kgCO2'] <= q3 + 3*iqr)
    df = df.loc[mask]

    # Interpolate and fill missing, then clamp to non-negative
    df['carbon_footprint_kgCO2'] = (
        df['carbon_footprint_kgCO2']
          .interpolate(method='time')
          .bfill()
          .ffill()
    )

    df['carbon_footprint_kgCO2'] = df['carbon_footprint_kgCO2'].clip(lower=0)
    return df

def tune_and_select(train, val):
    best_mae = np.inf
    best = (None, None, None, None)
    h = len(val)

    # Seasonal SARIMAX grid
    non_seasonal = list(itertools.product(range(0,3), repeat=3))
    seasonal = [(P, D, Q, 12) for P, D, Q in itertools.product(range(0,2), repeat=3)]
    for order in non_seasonal:
        for seas in seasonal:
            try:
                m = SARIMAX(
                    train,
                    order=order,
                    seasonal_order=seas,
                    enforce_stationarity=False,
                    enforce_invertibility=False
                )
                res = m.fit(disp=False)
                pred = res.forecast(h)
                # clamp negatives
                pred = np.clip(pred, 0, None)
                mae = mean_absolute_error(val, pred)
                name = f"SARIMAX{order}x{seas}"
                if mae < best_mae:
                    best_mae = mae
                    best = (res, name, 'sarimax', best_mae)
            except Exception:
                continue

    # ETS grid with damping
    for trend, seasonal, damp in itertools.product(['add','mul'], ['add','mul'], [True]):
        try:
            m = ExponentialSmoothing(
                train,
                trend=trend,
                seasonal=seasonal,
                seasonal_periods=12,
                damped_trend=damp
            ).fit(optimized=True)
            pred = m.forecast(h)
            pred = np.clip(pred, 0, None)
            mae = mean_absolute_error(val, pred)
            name = f"ETS(trend={trend},seasonal={seasonal},damped={damp})"
            if mae < best_mae:
                best_mae = mae
                best = (m, name, 'ets', best_mae)
        except Exception:
            continue

    # Prophet grid
    try:
        pdf = train.reset_index().rename(columns={'date':'ds', 'carbon_footprint_kgCO2':'y'})
        m = Prophet(yearly_seasonality=True, interval_width=0.95)
        m.fit(pdf)
        future = m.make_future_dataframe(periods=h, freq='MS')
        fcst = m.predict(future)['yhat'].iloc[-h:].values
        fcst = np.clip(fcst, 0, None)
        mae = mean_absolute_error(val, fcst)
        name = 'Prophet'
        if mae < best_mae:
            best_mae = mae
            best = (m, name, 'prophet', best_mae)
    except Exception:
        pass

    return best
app = Flask(__name__)
@app.route('/forecast', methods=['POST'])
def ForecastCarbonFootprint():
    try:
        data = request.get_json(force=True)
        validate_input(data)

        df = pd.DataFrame(data)
        df = preprocess_data(df)
        series = df['carbon_footprint_kgCO2']

        # split 80/20 train/validation
        n = len(series)
        train_size = int(np.floor(0.8 * n))
        train = series.iloc[:train_size]
        val = series.iloc[train_size:]
        val_horizon = len(val)

        model_obj, model_name, model_type, best_mae = tune_and_select(train, val)
        if model_obj is None:
            raise RuntimeError("All model fits failed")

        # Print selected model and accuracy metrics
        print(f"Model used: {model_name}")
        if model_type in ['sarimax', 'ets']:
            val_pred = model_obj.forecast(val_horizon)
        else:
            future_val = model_obj.make_future_dataframe(periods=val_horizon, freq='MS')
            val_pred = model_obj.predict(future_val)['yhat'].iloc[-val_horizon:].values
        val_pred = np.clip(val_pred, 0, None)
        r2 = r2_score(val, val_pred)
        print(f"Hold-out MAE:  {best_mae:.2f}")
        print(f"Hold-out RMSE: {np.sqrt(mean_squared_error(val, val_pred)):.2f}")
        print(f"Hold-out R²:   {r2:.3f}")
        print(f"Hold-out MAPE: {(np.mean(np.abs((val - val_pred) / val)) * 100):.1f}%")

        # Refit on full series and forecast next 6 months
        forecast_horizon = 6
        if model_type == 'sarimax':
            order = model_obj.model.order
            seas = model_obj.model.seasonal_order
            full = SARIMAX(
                series,
                order=order,
                seasonal_order=seas,
                enforce_stationarity=False,
                enforce_invertibility=False
            ).fit(disp=False)
            fcst = full.forecast(forecast_horizon)
        elif model_type == 'ets':
            fcst = model_obj.forecast(forecast_horizon)
        else:
            pdf_full = series.reset_index().rename(columns={'date':'ds','carbon_footprint_kgCO2':'y'})
            m = Prophet(yearly_seasonality=True, interval_width=0.95)
            m.fit(pdf_full)
            fut = m.make_future_dataframe(periods=forecast_horizon, freq='MS')
            fcst = m.predict(fut)['yhat'].tail(forecast_horizon).values
        # clamp forecast
        fcst = np.clip(fcst, 0, None)

        # build output
        last = df.index[-1]
        future_idx = pd.date_range(start=last, periods=forecast_horizon+1, freq='MS')[1:]
        out = [
            {
                'year': int(d.year),
                'month': int(d.month),
                'carbon_footprint_kgCO2': round(float(max(v, 0)), 2)
            } for d, v in zip(future_idx, fcst)
        ]

        return jsonify({
            'model_used': model_name,
            'predicted_carbon_footprint_kgCO2': out
        })
    except Exception as e:
        print(f"Forecast endpoint error: {e}")
        return jsonify({'error': str(e)}), 400


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