import statsmodels.api as sm
from io import StringIO
import pandas as pd
from flask import Flask, request, jsonify
import os
app = Flask(__name__)
@app.route("/predict/", methods=["POST"])
def predict():
    try:
        file = request.files['file']

        content = file.stream.read().decode("utf-8")
        df = pd.read_csv(StringIO(content)) 

        if "date" not in df.columns or "carbon_footprint_kgCO2" not in df.columns:
            return jsonify({"error": "CSV must contain 'date' and 'carbon_footprint_kgCO2' columns"}), 400

        df["date"] = pd.to_datetime(df["date"])

        train_size = int(len(df) * 0.8)
        train = df["carbon_footprint_kgCO2"][:train_size]

        model = sm.tsa.ExponentialSmoothing(train, trend='mul', seasonal='add', seasonal_periods=12)
        fitted_model = model.fit()

        forecast = fitted_model.forecast(12).tolist()

        return jsonify({"predicted_carbon_footprint_kgCO2": forecast})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
