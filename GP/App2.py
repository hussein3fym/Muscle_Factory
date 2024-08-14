import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Load BMR dataset
bmr_data = pd.read_csv('BMR.csv')
bmr_data.ffill(inplace=True)
bmr_data = pd.get_dummies(bmr_data, columns=['Gender', 'Activity Level'], drop_first=True)

X = bmr_data.drop(columns=['Basal_Metabolic_Rate(BMR)'])
y = bmr_data['Basal_Metabolic_Rate(BMR)']

X_train, _, y_train, _ = train_test_split(X, y, test_size=0.2, random_state=42)
bmr_model = RandomForestRegressor()
bmr_model.fit(X_train, y_train)

# Load meals dataset
meals_df = pd.read_csv('Meals.csv', encoding='ISO-8859-1')
meals_df.fillna('no-snack', inplace=True)

def predict_bmr(model, user_data):
    test_df = pd.DataFrame(user_data, index=[0])
    test_df = pd.get_dummies(test_df, columns=['Gender', 'Activity Level'])
    missing_cols = set(X_train.columns) - set(test_df.columns)
    for col in missing_cols:
        test_df[col] = 0
    test_df = test_df[X_train.columns]
    bmr_prediction = model.predict(test_df)

    # goal = user_data['Goal'][0]
    goal = user_data.get('Goal')
    if goal == 'loseWeight':
        bmr_prediction -= 300
    elif goal == 'gainWeight':
        bmr_prediction += 300

    return bmr_prediction[0]

def recommend_meals(predicted_bmr, preference='all', num_meals=3):
    range_percentage = 0.001
    lower_bound = predicted_bmr * (1 - range_percentage)
    upper_bound = predicted_bmr * (1 + range_percentage)
    filtered_meals = meals_df[(meals_df['Calories'] >= lower_bound) & (meals_df['Calories'] <= upper_bound)]

    if preference.lower() == 'vegan':
        filtered_meals = filtered_meals[filtered_meals['Type'] == 'Vegan']
    elif preference.lower() == 'non-vegan':
        filtered_meals = filtered_meals[filtered_meals['Type'] != 'Vegan']
    filtered_meals = filtered_meals[filtered_meals['NumberOfMeals'] == int(num_meals)]

    user_bmr_vector = [[predicted_bmr]]
    meal_calories_vector = filtered_meals[['Calories']].values
    cosine_similarities = cosine_similarity(user_bmr_vector, meal_calories_vector)

    filtered_meals['Cosine_Similarity'] = cosine_similarities[0]
    recommended_meals = filtered_meals.sort_values(by='Cosine_Similarity', ascending=False).head(6).tail(4)

    return recommended_meals.to_dict(orient='records')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        user_data = request.json

        bmr_prediction = predict_bmr(bmr_model, user_data)

        preference = user_data.get('preference', 'all')
        num_meals = user_data.get('num_meals', 3)

        recommended_meals = recommend_meals(bmr_prediction, preference, num_meals)

        return jsonify({'prediction': bmr_prediction.tolist(), 'recommended_meals': recommended_meals})
    except KeyError as e:
        # Handle missing or incorrect keys in the JSON data
        return jsonify({'error': f'Missing or incorrect key in JSON data: {str(e)}'}), 400

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
