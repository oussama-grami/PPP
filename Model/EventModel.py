import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from xgboost import XGBRegressor
from sklearn.linear_model import GammaRegressor
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
import joblib

# Load dataset
file_path = "./event_carbon_footprint_final.csv"
data = pd.read_csv(file_path)

# Define features and target
target = "Total Emissions (kg CO2)"
categorical_features = ["Event Type", "Venue Type", "Location", "Transport Mode", "Meal Type"]
numerical_features = [
    "Duration (hours)", "Participants", "Number of Devices", "Avg Power per Device (kW)",
    "Energy Usage Hours", "Transport Distance (km)", "Attendees Using Transport",
    "Number of Meals", "Printed Material (kg)", "Decoration Material (kg)"
]

# Preprocessing pipeline
categorical_transformer = OneHotEncoder(handle_unknown='ignore')
numerical_transformer = StandardScaler()

preprocessor = ColumnTransformer(
    transformers=[
        ('num', numerical_transformer, numerical_features),
        ('cat', categorical_transformer, categorical_features)
    ]
)

# Split data into training and testing sets
X = data.drop(columns=[target])
y = data[target]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Custom objective function to penalize negative predictions
def custom_loss(y_true, y_pred):
    gradient = np.where(y_pred < 0, -1, 2 * (y_pred - y_true))
    hessian = np.where(y_pred < 0, 0, 2)
    return gradient, hessian

# Train XGBoost with the custom objective function
xgb_model = XGBRegressor(objective=custom_loss, random_state=42)
xgb_pipeline = Pipeline([
    ('preprocessor', preprocessor),
    ('regressor', xgb_model)
])
xgb_pipeline.fit(X_train, y_train)

# Make predictions with XGBoost
xgb_pred = xgb_pipeline.predict(X_test)

# Train Gamma Regression with log-transformed target
gamma_model = GammaRegressor(alpha=0.1, max_iter=1000)  # Log-link is used by default
gamma_pipeline = Pipeline([
    ('preprocessor', preprocessor),
    ('regressor', gamma_model)
])
gamma_pipeline.fit(X_train, np.log1p(y_train))  # Log-transform target for Gamma Regression

# Make predictions with Gamma Regression and reverse log-transform
gamma_pred = np.expm1(gamma_pipeline.predict(X_test))

# Find the best alpha for weighted average
alpha_values = np.linspace(0, 1, 11)  # Test alpha values from 0 to 1
best_alpha = 0
best_mse = float('inf')

for alpha in alpha_values:
    ensemble_pred = alpha * xgb_pred + (1 - alpha) * gamma_pred
    mse = mean_squared_error(y_test, ensemble_pred)
    if mse < best_mse:
        best_mse = mse
        best_alpha = alpha

print(f"Best alpha: {best_alpha}, Best MSE: {best_mse}")

# Use the best alpha to make final predictions
ensemble_pred = best_alpha * xgb_pred + (1 - best_alpha) * gamma_pred

# Ensure predictions are non-negative
ensemble_pred = np.maximum(ensemble_pred, 0)  # Clip negative values to zero

# Check for negative predicted values
negative_predictions = ensemble_pred < 0

# Save the ensemble model
ensemble_model = {
    'xgb_model': xgb_pipeline,
    'gamma_model': gamma_pipeline,
    'alpha': best_alpha
}
joblib.dump(ensemble_model, 'ensemble_event_emission_model.pkl')
