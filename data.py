import pandas as pd

data = {
    "description": [
        "Netflix subscription", "Spotify", "Bus ticket", "Gasoline",
        "Electricity bill", "Water bill", "Restaurant", "Groceries",
        "Cinema", "Taxi", "Mobile data", "Concert ticket"
    ],
    "category": [
        "Entertainment", "Entertainment", "Transport", "Transport",
        "Bills", "Bills", "Food", "Food",
        "Entertainment", "Transport", "Bills", "Entertainment"
    ]
}

df = pd.DataFrame(data)
