from flask import Flask, request, jsonify
import pandas as pd
import joblib
import numpy as np

# Define the custom_loss function (must match the one used during training)
def custom_loss(y_true, y_pred):
    gradient = np.where(y_pred < 0, -1, 2 * (y_pred - y_true))
    hessian = np.where(y_pred < 0, 0, 2)
    return gradient, hessian

# Load the ensemble model
ensemble_model = joblib.load('ensemble_event_emission_model.pkl')
xgb_pipeline = ensemble_model['xgb_model']
gamma_pipeline = ensemble_model['gamma_model']
best_alpha = ensemble_model['alpha']

# Define the Flask app
app = Flask(__name__)

# Define the API endpoint
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

# Run the Flask app
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)
