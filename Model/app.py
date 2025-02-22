import pandas as pd
import numpy as np
from flask import Flask, request, jsonify
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import xgboost as xgb

# Charger le dataset et entraîner le modèle (comme dans votre code précédent)
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

# Entraîner le modèle
model.fit(X, y)

# Créer l'application Flask
app = Flask(__name__)


@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Récupérer les données JSON envoyées dans la requête
        data = request.get_json()

        # Extraire les paramètres nécessaires pour la prédiction
        params = data.get('parameters')

        if not params:
            return jsonify({"error": "Paramètres manquants"}), 400

        # Convertir les paramètres en DataFrame pour la prédiction
        input_data = pd.DataFrame([params])

        # Faire la prédiction
        prediction = model.predict(input_data)
        prediction_value = float(prediction[0])
        # Retourner la prédiction sous forme de JSON
        return jsonify({"carbon_footprint_prediction": prediction_value})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
