import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
import joblib

# Step 1: Create dataset (synthetic for now)
data = {
    "description": [
        "Netflix subscription", "Spotify Premium", "Bus ticket", "Gasoline",
        "Electricity bill", "Water bill", "Restaurant dinner", "Groceries shopping",
        "Cinema movie", "Taxi ride", "Mobile data plan", "Concert ticket",
        "Airline ticket", "New shoes", "Coffee at Starbucks"
    ],
    "category": [
        "Entertainment", "Entertainment", "Transport", "Transport",
        "Bills", "Bills", "Food", "Food",
        "Entertainment", "Transport", "Bills", "Entertainment",
        "Transport", "Entertainment", "Food"
    ]
}

df = pd.DataFrame(data)
print("Loading dataset...")
# your data


# Step 2: Build model pipeline
model = make_pipeline(CountVectorizer(), MultinomialNB())

print("Training model...")
model.fit(df["description"], df["category"])
# Step 3: Train
model.fit(df["description"], df["category"])

print("Saving model...")
joblib.dump(model, "expense_classifier.pkl")
# Step 4: Save model
joblib.dump(model, "expense_classifier.pkl")

print("✅ Model trained and saved as expense_classifier.pkl")
