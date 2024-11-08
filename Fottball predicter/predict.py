import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Load the data with the correct delimiter
data = pd.read_csv(r'fotboll_grej\data.csv', delimiter=';')  # Adjust the path and delimiter as necessary

# Verify column names
print(data.columns)

# Strip any leading/trailing whitespace from column names
data.columns = data.columns.str.strip()

# Convert numeric columns from strings with commas to floats
numeric_columns = ['Tot games', 'goals', 'goals Against', 'won', 'lost', 'drawn', 
                   'avg Goals match', 'Avg. Goals Against / Match']
for col in numeric_columns:
    data[col] = data[col].astype(str).str.replace(',', '.').astype(float)

# Feature engineering
data['win_rate'] = data['won'] / data['Tot games']
data['draw_rate'] = data['drawn'] / data['Tot games']
data['loss_rate'] = data['lost'] / data['Tot games']
data['goal_difference'] = data['goals'] - data['goals Against']

# Define features and target variable
features = ['avg Goals match', 'Avg. Goals Against / Match', 'win_rate', 'draw_rate', 'loss_rate', 'goal_difference']
# Create a new column 'outcome' for example purposes (this should be your actual target variable)
# You might need to define it based on your data
data['outcome'] = data.apply(lambda row: 'win' if row['win_rate'] > 0.5 else 'loss' if row['loss_rate'] > 0.5 else 'draw', axis=1)

X = data[features]
y = data['outcome']

# Split data into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Evaluate the model
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f'Model accuracy: {accuracy:.2f}')

# Function to get team features
def get_team_features(team_name, data):
    team_data = data[data['Team'] == team_name]
    if team_data.empty:
        raise ValueError(f"Team {team_name} not found in the dataset.")
    return team_data[features].values.flatten()

# Predict the outcome of a specific match
def predict_match_outcome(team1, team2, model, data):
    team1_features = get_team_features(team1, data)
    team2_features = get_team_features(team2, data)
    match_features = team1_features - team2_features
    prediction = model.predict([match_features])
    return prediction[0]

# Main script to take user input and predict match outcome
def main():
    print("Enter the names of the teams:")
    team1 = input("Team 1: ")
    team2 = input("Team 2: ")
    
    try:
        match_prediction = predict_match_outcome(team1, team2, model, data)
        print(f'Predicted outcome for {team1} vs {team2}: {match_prediction}')
    except ValueError as e:
        print(e)

if __name__ == "__main__":
    main()
