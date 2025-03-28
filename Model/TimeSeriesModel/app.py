import statsmodels.api as sm
from io import StringIO
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from statsmodels.tsa.statespace.sarimax import SARIMAX
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from flask import Flask, request, jsonify
import io
import base64
from datetime import datetime
import os
import json
from werkzeug.utils import secure_filename

app = Flask(__name__)


# SARIMA model functions
def prepare_data(df):
    """Prepare data for SARIMA model"""
    # Convert date to datetime if it's not already
    df['date'] = pd.to_datetime(df['date'])

    # Set date as index for time series models
    ts_df = df.copy()
    ts_df = ts_df.set_index('date')

    # For SARIMA, we just need the carbon_footprint column
    return ts_df[['carbon_footprint']]


def train_sarima(data, order=(1, 1, 1), seasonal_order=(1, 1, 1, 12)):
    """Train SARIMA model for carbon footprint prediction"""
    model = SARIMAX(data['carbon_footprint'],
                    order=order,
                    seasonal_order=seasonal_order)
    results = model.fit(disp=False)
    return results


def forecast_sarima(model, steps=12):
    """Generate forecasts with the SARIMA model"""
    forecast = model.forecast(steps=steps)
    return forecast


def evaluate_sarima(actual, forecast):
    """Evaluate SARIMA model performance"""
    mae = mean_absolute_error(actual, forecast)
    rmse = np.sqrt(mean_squared_error(actual, forecast))
    r2 = r2_score(actual, forecast)
    corr = np.corrcoef(actual, forecast)[0, 1]

    return {
        'MAE': float(mae),
        'RMSE': float(rmse),
        'R2': float(r2),
        'Correlation': float(corr)
    }


def plot_forecast(data, forecast):
    """Plot the forecast results and return the figure as base64 image"""
    plt.figure(figsize=(12, 6))

    # Plot historical data
    plt.plot(data.index, data['carbon_footprint'], label='Historical Data', color='black')

    # Generate forecast dates (monthly frequency)
    last_date = data.index[-1]
    forecast_dates = pd.date_range(start=last_date + pd.Timedelta(days=1),
                                   periods=len(forecast),
                                   freq='MS')

    # Plot forecast
    plt.plot(forecast_dates, forecast, label='SARIMA Forecast', color='red')

    plt.title('Carbon Footprint Forecast')
    plt.xlabel('Date')
    plt.ylabel('Carbon Footprint (tons CO2e)')
    plt.legend()
    plt.grid(True)
    plt.tight_layout()

    # Save the plot to a temporary buffer
    img_buf = io.BytesIO()
    plt.savefig(img_buf, format='png')
    img_buf.seek(0)

    # Convert to base64
    img_base64 = base64.b64encode(img_buf.read()).decode('utf-8')
    plt.close()

    return img_base64


@app.route("/predict/", methods=["POST"])
def predict():
    try:
        # Get the uploaded file from the request
        file = request.files['file']

        # Read the CSV file
        content = file.stream.read().decode("utf-8")
        df = pd.read_csv(StringIO(content))  # Use StringIO to read CSV content

        # Ensure correct column names
        if "date" not in df.columns or "carbon_footprint_kgCO2" not in df.columns:
            return jsonify({"error": "CSV must contain 'date' and 'carbon_footprint_kgCO2' columns"}), 400

        # Convert 'date' column to datetime
        df["date"] = pd.to_datetime(df["date"])

        # Train/Test Split (80% training data)
        train_size = int(len(df) * 0.8)
        train = df["carbon_footprint_kgCO2"][:train_size]

        # Fit the Exponential Smoothing Model
        model = sm.tsa.ExponentialSmoothing(train, trend='mul', seasonal='add', seasonal_periods=12)
        fitted_model = model.fit()

        # Predict the next 12 months
        forecast = fitted_model.forecast(12).tolist()

        # Return only the predicted values as response
        return jsonify({"predicted_carbon_footprint_kgCO2": forecast})

    except Exception as e:
        return jsonify({"error": str(e)}), 500



@app.route("/predict2/", methods=["POST"])
def predict2():
    try:
        # Get the uploaded file from the request
        file = request.files['file']

        # Read CSV file
        content = file.stream.read().decode("utf-8")
        df = pd.read_csv(StringIO(content))

        # Ensure correct column names
        if "date" not in df.columns or "carbon_footprint_kgCO2" not in df.columns:
            return jsonify({"error": "CSV must have 'date' and 'carbon_footprint_kgCO2' columns"})

        # Convert 'date' column to datetime
        df["date"] = pd.to_datetime(df["date"])

        # Train/Test Split (80% training data)
        train_size = int(len(df) * 0.8)
        train = df["carbon_footprint_kgCO2"][:train_size]

        # Fit the Exponential Smoothing Model
        model = sm.tsa.ExponentialSmoothing(train, trend='mul', seasonal='add', seasonal_periods=12)
        fitted_model = model.fit()

        # Predict the next 12 months
        forecast = fitted_model.forecast(12).tolist()
        return jsonify({"predicted_carbon_footprint_kgCO2": forecast})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    # Set host to 0.0.0.0 to make the server publicly available
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
