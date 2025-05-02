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

# Define features
target = "Total Emissions (kg CO2)"
categorical_features = ["Transport Mode", "Meal Type"]
numerical_features = [
    "Duration (hours)", "Participants", "Number of Devices", "Avg Power per Device (kW)",
    "Energy Usage Hours", "Transport Distance (km)", "Attendees Using Transport",
    "Number of Meals", "Printed Material (kg)", "Decoration Material (kg)"
]

# Normalize categorical values to lowercase (case-insensitive)
for col in categorical_features:
    data[col] = data[col].str.lower()

# Prepare data
X = data[numerical_features + categorical_features]
y = data[target]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Preprocessing pipeline
categorical_transformer = OneHotEncoder(handle_unknown='ignore')
numerical_transformer = StandardScaler()

preprocessor = ColumnTransformer(
    transformers=[
        ('num', numerical_transformer, numerical_features),
        ('cat', categorical_transformer, categorical_features)
    ]
)

# Custom loss function to penalize negative predictions (optional — XGBoost supports custom objectives but not in sklearn wrapper directly)
# Using standard squared error here instead
xgb_model = XGBRegressor(objective='reg:squarederror', random_state=42)
xgb_pipeline = Pipeline([
    ('preprocessor', preprocessor),
    ('regressor', xgb_model)
])
xgb_pipeline.fit(X_train, y_train)
xgb_pred = xgb_pipeline.predict(X_test)

# Train Gamma Regression on log1p-transformed target
gamma_model = GammaRegressor(alpha=0.1, max_iter=1000)
gamma_pipeline = Pipeline([
    ('preprocessor', preprocessor),
    ('regressor', gamma_model)
])
gamma_pipeline.fit(X_train, np.log1p(y_train))
gamma_pred = np.expm1(gamma_pipeline.predict(X_test))

# Custom ensemble: use xgb if positive, otherwise average with gamma
ensemble_pred = []
for xgb_p, gamma_p in zip(xgb_pred, gamma_pred):
    if xgb_p >= 0:
        ensemble_pred.append(xgb_p)
    else:
        ensemble_pred.append((xgb_p + gamma_p) / 2)

ensemble_pred = np.array(ensemble_pred)

# Evaluation
print("Test MSE:", mean_squared_error(y_test, ensemble_pred))
print("Test MAE:", mean_absolute_error(y_test, ensemble_pred))
print("Test R²:", r2_score(y_test, ensemble_pred))

# Save model and config
joblib.dump({
    "xgb_model": xgb_pipeline,
    "gamma_model": gamma_pipeline
}, "ensemble_event_emission_model.pkl")
print("Model saved as 'ensemble_event_emission_model.pkl'")
