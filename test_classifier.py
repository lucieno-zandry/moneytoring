import joblib

# Load model
model = joblib.load("expense_classifier.pkl")

# Test predictions
tests = [
    "Bought groceries",
    "Paid electricity",
    "Cinema ticket",
    "Uber ride",
    "Monthly water payment",
    "Burger King"
]

for t in tests:
    prediction = model.predict([t])[0]
    print(f"{t} -> {prediction}")
