import React, { useState } from "react";
import axios from "axios";

function Predictor() {
  const [inputData, setInputData] = useState({
    Age: "",
    Weight: "",
    Height: "",
    Gender: "",
    "Activity Level": "",
    Goal: "",
  });
  const [prediction, setPrediction] = useState("");

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/predict",
        inputData
      );
      setPrediction(response.data.prediction);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="Age"
          value={inputData.Age}
          onChange={handleChange}
          placeholder="Age"
        />
        <input
          type="number"
          name="Weight"
          value={inputData.Weight}
          onChange={handleChange}
          placeholder="Weight (kg)"
        />
        <input
          type="number"
          name="Height"
          value={inputData.Height}
          onChange={handleChange}
          placeholder="Height (cm)"
        />
        <select name="Gender" value={inputData.Gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select
          name="ActivityLevel"
          value={inputData.ActivityLevel}
          onChange={handleChange}
        >
          <option value="">Select Activity Level</option>
          <option value="Sedentary">Sedentary</option>
          <option value="Light">Light</option>
          <option value="Moderate">Moderate</option>
          <option value="Very Active">Very Active</option>
          <option value="Extra Active">Extra Active</option>
        </select>
        <select name="Goal" value={inputData.Goal} onChange={handleChange}>
          <option value="">Select Goal</option>
          <option value="loseWeight">Lose Weight</option>
          <option value="maintain">Maintain</option>
          <option value="gainWeight">Gain Weight</option>
        </select>
        <button type="submit">Predict</button>
      </form>
      {prediction && <p>Prediction: {prediction}</p>}
    </div>
  );
}

export default Predictor;
