from flask_restful import Resource, reqparse
from flask import jsonify
import numpy as np
import joblib
import os

# Load the trained model
model_path = r'H:\United Autosports  AI\trained_models\tyre_wear_model.pkl'


if not os.path.exists(model_path):
    raise FileNotFoundError(f"The model file was not found at {model_path}")

model = joblib.load(model_path)

def validate_input(input_data):
    """
    Validates the input data to ensure it is suitable for prediction.

    Parameters:
    input_data (list or numpy array): The input data for the prediction.

    Returns:
    bool: True if input data is valid, False otherwise.
    """
    if not isinstance(input_data, (list, np.ndarray)):
        return False, "Input data should be a list or numpy array."
    if len(input_data) != model.n_features_in_:
        return False, f"Input data should have {model.n_features_in_} features."
    return True, ""

def predict_tire_wear(input_data):
    """
    Predicts tire wear using the trained model.

    Parameters:
    input_data (list or numpy array): The input data for the prediction.

    Returns:
    float: The predicted tire wear level.
    """
    valid, message = validate_input(input_data)
    if not valid:
        raise ValueError(message)

    # Convert input_data to numpy array and reshape for prediction
    input_array = np.array(input_data).reshape(1, -1)
    prediction = model.predict(input_array)
    return prediction[0]

class TireWearPredictionRoutes(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('pressure', type=float, required=True, help='Pressure is required and should be a float.')
        parser.add_argument('temperature', type=float, required=True, help='Temperature is required and should be a float.')
        parser.add_argument('tread_depth', type=float, required=True, help='Tread depth is required and should be a float.')
        parser.add_argument('sidewall_integrity', type=float, required=True, help='Sidewall integrity is required and should be a float.')
        parser.add_argument('overall_condition', type=float, required=True, help='Overall condition is required and should be a float.')

        args = parser.parse_args()

        input_data = [
            args['pressure'], args['temperature'], args['tread_depth'],
            args['sidewall_integrity'], args['overall_condition']
        ]

        try:
            prediction = predict_tire_wear(input_data)
            return {'prediction': prediction}, 200
        except ValueError as e:
            return {'error': str(e)}, 400
        except Exception as e:
            return {'error': 'An unexpected error occurred: ' + str(e)}, 500
