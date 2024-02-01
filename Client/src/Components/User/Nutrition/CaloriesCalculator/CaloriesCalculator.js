import React, { useState } from "react";
import "./CaloriesCalculator.css";

const CaloriesCalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [result, setResult] = useState(null);

  const calculateCalories = (event) => {
    event.preventDefault();
    const calculatedCalories =
      weight * 10 + height * 5 - age * 2 + getActivityMultiplier(activityLevel);
    setResult(calculatedCalories);
  };

  const getActivityMultiplier = (level) => {
    const multipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9,
    };
    return multipliers[level] || 1;
  };

  // Define messages for each activity level
  const activityLevelMessages = {
    sedentary: "Little to no exercise.",
    light: "Light exercise/sports 1-3 days per week.",
    moderate: "Moderate exercise/sports 3-5 days per week.",
    active: "Hard exercise/sports 6-7 days per week.",
    veryActive: "Very hard exercise/sports & physical job or 2x training.",
  };
  const Reload = () => {
    window.location.reload();
  };

  return (
    <div className="app">
      <div className="BMcontainer">
        <h1 className="BMtitle">Calories Calculator</h1>
        <form onSubmit={calculateCalories}>
          <div>
            <label>
              Weight (kg):
              <input
                type="number"
                className="BMinput"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Height (cm):
              <input
                type="number"
                className="BMinput"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Age:
              <input
                type="number"
                className="BMinput"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </label>
          </div>

          <div>
            <label>Activity Level:</label>
            <div>
              <label>
                <input
                  type="radio"
                  value="sedentary"
                  checked={activityLevel === "sedentary"}
                  onChange={(e) => setActivityLevel(e.target.value)}
                />
                Sedentary
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="light"
                  checked={activityLevel === "light"}
                  onChange={(e) => setActivityLevel(e.target.value)}
                />
                Light
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="moderate"
                  checked={activityLevel === "moderate"}
                  onChange={(e) => setActivityLevel(e.target.value)}
                />
                Moderate
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="active"
                  checked={activityLevel === "active"}
                  onChange={(e) => setActivityLevel(e.target.value)}
                />
                Active
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="veryActive"
                  checked={activityLevel === "veryActive"}
                  onChange={(e) => setActivityLevel(e.target.value)}
                />
                Very Active
              </label>
            </div>
            {activityLevel && <p>{activityLevelMessages[activityLevel]}</p>}
          </div>

          <div>
            <button type="submit">Calculate Calories</button>
            <button type="button" onClick={Reload}>
              Reload
            </button>
          </div>
          {result !== null && (
            <div>
              <h2>Result: {result} Calories</h2>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CaloriesCalculator;
