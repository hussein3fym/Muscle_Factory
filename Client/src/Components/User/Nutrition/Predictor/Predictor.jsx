import React, { useState, useEffect } from "react";
import axios from "axios";

function Predictor() {
  const [formData, setFormData] = useState({
    Age: "",
    "Weight(kg)": "",
    "Height(cm)": "",
    Gender: "Male",
    "Activity Level": "Base",
    preference: "all",
    num_meals: "3",
  });
  const [prediction, setPrediction] = useState(null);
  const [recommendedMeals, setRecommendedMeals] = useState([]);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [mealIndex, setMealIndex] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/predict",
        formData
      );
      if (response.data && response.data.prediction) {
        setPrediction(response.data.prediction);
        setRecommendedMeals(response.data.recommended_meals || []);
        setError(null);
        setSubmitted(true);
        setMealIndex(0);
      } else {
        setPrediction(null);
        setRecommendedMeals([]);
        setError("Error: Empty response data");
        setSubmitted(false);
      }
    } catch (error) {
      setError(error.response?.data?.error || "An unexpected error occurred");
      setSubmitted(false);
    }
  };

  useEffect(() => {
    setMealIndex(0);
  }, [recommendedMeals]);

  const handleNextMeal = () => {
    setMealIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div>
      <h1>Predict BMR and Recommend Meals</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Age:
          <input
            type="number"
            name="Age"
            value={formData.Age}
            onChange={handleChange}
          />
        </label>
        <label>
          Weight (kg):
          <input
            type="number"
            name="Weight(kg)"
            value={formData["Weight(kg)"]}
            onChange={handleChange}
          />
        </label>
        <label>
          Height (cm):
          <input
            type="number"
            name="Height(cm)"
            value={formData["Height(cm)"]}
            onChange={handleChange}
          />
        </label>
        <label>
          Gender:
          <select name="Gender" value={formData.Gender} onChange={handleChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>
        <label>
          Activity Level:
          <select
            name="Activity Level"
            value={formData["Activity Level"]}
            onChange={handleChange}
          >
            <option value="Base">Base</option>
            <option value="Sedentary">Sedentary</option>
            <option value="Light">Light</option>
            <option value="Moderate">Moderate</option>
            <option value="Very Active">Very Active</option>
            <option value="Extra Active">Extra Active</option>
          </select>
        </label>
        <label>
          Preference:
          <select
            name="preference"
            value={formData.preference}
            onChange={handleChange}
          >
            <option value="all">All</option>
            <option value="vegan">Vegan</option>
            <option value="non-vegan">Non-Vegan</option>
          </select>
        </label>
        <label>
          Number of Meals:
          <select
            name="num_meals"
            value={formData.num_meals}
            onChange={handleChange}
          >
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
      {submitted && prediction && <div>Predicted BMR: {prediction}</div>}
      {submitted && recommendedMeals.length > 0 && (
        <div>
          <h2>Recommended Meals:</h2>
          <div key={mealIndex}>
            <p>Calories: {recommendedMeals[mealIndex].Calories}</p>
            <p>Type: {recommendedMeals[mealIndex].Type}</p>
            <p>Breakfast: {recommendedMeals[mealIndex].Breakfast}</p>
            <p>Lunch: {recommendedMeals[mealIndex].Lunch}</p>
            <p>Dinner: {recommendedMeals[mealIndex].Dinner}</p>
            {recommendedMeals[mealIndex].Snack &&
              recommendedMeals[mealIndex].Snack !== "no-snack" && (
                <p>Snack: {recommendedMeals[mealIndex].Snack}</p>
              )}
            {recommendedMeals[mealIndex]["Snack.1"] &&
              recommendedMeals[mealIndex]["Snack.1"] !== "no-snack" && (
                <p>Snack2: {recommendedMeals[mealIndex]["Snack.1"]}</p>
              )}
          </div>
          {mealIndex < recommendedMeals.length - 1 && (
            <button onClick={handleNextMeal}>Regenerate</button>
          )}
        </div>
      )}
      {submitted && error && <div>Error: {error}</div>}
    </div>
  );
}

export default Predictor;
