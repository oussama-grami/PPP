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
import os


app = Flask(__name__)


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





if __name__ == '__main__':
    # Set host to 0.0.0.0 to make the server publicly available
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
