import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
import joblib

# Load your dataset
data = pd.read_csv('H:/United Autosports AI/training_data_csv_files/tyre_wear_data.csv')

# Preprocess the data
X = data.drop(columns=['target'])
y = data['target']

# Encode categorical variables
label_encoder = LabelEncoder()
X['sidewall_integrity'] = label_encoder.fit_transform(X['sidewall_integrity'])
X['overall_condition'] = label_encoder.fit_transform(X['overall_condition'])

# Save the label encoder for later use
joblib.dump(label_encoder, 'H:/United Autosports AI/trained_models/label_encoder.pkl')

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save the trained model
joblib.dump(model, 'H:/United Autosports AI/trained_models/tyre_wear_model.pkl')

print("Model training completed and saved.")
