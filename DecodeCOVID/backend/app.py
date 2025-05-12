from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import pickle
# pyright: reportMissingImports=false
from tensorflow.keras.models import load_model
import numpy as np

app = Flask(__name__)
CORS(app)

# === Load components ===
model = load_model("best_model.h5")
scaler = joblib.load("scaler.pkl")
with open("features.pkl", "rb") as f:
    expected_features = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file uploaded.'}), 400

        file = request.files['file']

        if file.filename == '':
            return jsonify({'error': 'No file selected.'}), 400

        # Read the uploaded file
        if file.filename.endswith('.csv'):
            input_data = pd.read_csv(file)
        elif file.filename.endswith('.xlsx'):
            input_data = pd.read_excel(file)
        else:
            return jsonify({'error': 'Unsupported file format'}), 400

        # Check for missing features
        missing = [f for f in expected_features if f not in input_data.columns]
        if missing:
            return jsonify({'error': f'Missing features: {missing}'}), 400

        # Filter and scale input
        X_input = input_data.reindex(columns=expected_features, fill_value=0)
        X_scaled = scaler.transform(X_input)

        # Predict using Keras model
        predictions = model.predict(X_scaled)
        print(predictions)

        # Convert to binary classification
        binary_predictions = [1 if p >= 0.5 else 0 for p in predictions.flatten()]
        results = ["Positive" if p == 1 else "Negative" for p in binary_predictions]

        return jsonify({'predictions': results})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
