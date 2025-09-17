from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib, json, os

# Load the trained model
model = joblib.load("expense_classifier.pkl")
corrections_file = "corrections.json"

# Load corrections from JSON
if os.path.exists(corrections_file):
    with open(corrections_file, "r") as f:
        user_corrections = json.load(f)
else:
    user_corrections = {}

app = Flask(__name__)
CORS(app)

def save_corrections():
    with open(corrections_file, "w") as f:
        json.dump(user_corrections, f, indent=2)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    description = data.get("description", "").lower().strip()
    user_id = str(data.get("user_id", "default"))

    if not description:
        return jsonify({"error": "Missing 'description'"}), 400

    # Check if user correction exists
    if user_id in user_corrections and description in user_corrections[user_id]:
        prediction = user_corrections[user_id][description]
        source = "user_correction"
    else:
        prediction = model.predict([description])[0]
        source = "ai_model"

    return jsonify({
        "description": description,
        "predicted_category": prediction,
        "source": source
    })

@app.route("/correct", methods=["POST"])
def correct():
    data = request.get_json()
    description = data.get("description", "").lower().strip()
    category = data.get("category", "")
    user_id = str(data.get("user_id", "default"))

    if not description or not category:
        return jsonify({"error": "Missing fields"}), 400

    # Add correction
    if user_id not in user_corrections:
        user_corrections[user_id] = {}

    user_corrections[user_id][description] = category
    save_corrections()

    return jsonify({"message": "Correction saved", "user_id": user_id})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
