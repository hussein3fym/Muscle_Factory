import React, { useState } from "react";
import axios from "axios";

function Predictor() {
  const [formData, setFormData] = useState({
    Age: "",
    "Weight(kg)": "",
    "Height(cm)": "",
    Gender: "",
    "Activity Level": "",
    preference: "all",
    num_meals: 3,
  });
  const [prediction, setPrediction] = useState(null);
  const [recommendedMeals, setRecommendedMeals] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    console.log("Form data being sent:", formData); // Log the form data to the console

    try {
      const response = await axios.post(
        "http://localhost:5000/predict",
        formData
      );
      console.log("API response:", response.data); // Log the full API response for debugging

      if (response.data) {
        setPrediction(response.data.prediction);
        setRecommendedMeals(response.data.recommended_meals);
        console.log("Recommended Meals:", response.data.recommended_meals); // Log recommended meals data
      } else {
        setError("Error: Empty response data");
      }
    } catch (error) {
      console.error("Error making API call:", error);
      setError(error.response?.data?.error || "An unexpected error occurred");
    } finally {
      setLoading(false); // End loading regardless of outcome
    }
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
          <input
            type="text"
            name="Gender"
            value={formData.Gender}
            onChange={handleChange}
          />
        </label>
        <label>
          Activity Level:
          <input
            type="text"
            name="Activity Level"
            value={formData["Activity Level"]}
            onChange={handleChange}
          />
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
        <button type="submit" disabled={loading}>
          Submit
        </button>
      </form>
      {prediction && <div>Predicted BMR: {prediction}</div>}
      {recommendedMeals && (
        <div>
          <h2>Recommended Meals:</h2>
          {recommendedMeals.map((meal, index) => (
            <div key={index}>
              <p>Calories: {meal.Calories}</p>
              <p>Type: {meal.Type}</p>
              <p>Breakfast: {meal.Breakfast}</p>
              <p>Lunch: {meal.Lunch}</p>
              <p>Dinner: {meal.Dinner}</p>
              {meal.Snack && <p>Snack: {meal.Snack}</p>}
              {meal["Snack.1"] && <p>Snack: {meal["Snack.1"]}</p>}
              <hr />
            </div>
          ))}
        </div>
      )}
      {error && <div>Error: {error}</div>}
    </div>
  );
}

export default Predictor;
