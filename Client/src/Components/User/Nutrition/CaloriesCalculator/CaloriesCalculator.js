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
    <div className="Calories-container">
      <div className="C-container">
        <form onSubmit={calculateCalories} className="Calories-Form">
          <h1>Enter your information</h1>
          <div className="input-group">
            <label>
              Weight (kg):
              <input
                className="input-data"
                required
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </label>
          </div>
          <div className="input-group">
            <label>
              Height (cm):
              <input
                type="number"
                required
                className="input-data"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </label>
          </div>
          <div className="input-group">
            <label>
              Age (years):
              <input
                type="number"
                required
                className="input-data"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </label>
          </div>

          <div className="input-radio">
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
            <button type="submit" className="Calculate">
              Calculate Calories
            </button>
            <button type="button" className="Reload" onClick={Reload}>
              Reload
            </button>
          </div>
          {result !== null && (
            <div>
              <h2>
                Result <span>{result}</span> Calories
              </h2>
            </div>
          )}
        </form>
      </div>
      <div>
        <div className="calories-info">
          <h2>What are calories?</h2>
          <p>
            Calories represent energy derived from food and drinks, crucial for
            bodily functions. Daily intake averages 2,000 calories to maintain
            weight, influenced by age, gender, and health.
          </p>

          <h2>What is your Goal?</h2>

          <h2>1- Weight Loss</h2>
          <p>
            To lose weight effectively, maintain a calorie deficit by consuming
            fewer calories than expended. A deficit of 500 to 1,000 calories
            daily yields sustainable weight loss of 1 to 2 pounds weekly.
            However, excessively reducing calories may slow metabolism and lead
            to muscle loss. Individual calorie needs vary based on factors like
            age, gender, weight, height, and activity level, necessitating
            personalized guidance from a healthcare professional for a healthy
            eating plan.
          </p>

          <h2>2- Gain Weight</h2>
          <p>
            To gain weight healthily, consume more calories than expended, known
            as a calorie surplus. Add 500 to 1,000 calories daily with
            nutrient-rich foods like lean proteins and whole grains. Incorporate
            strength training to build muscle mass gradually. Avoid excessive
            consumption of unhealthy foods high in added sugars and saturated
            fats, seeking guidance from healthcare professionals or dietitians
            for personalized advice.
          </p>
          <div className="weight-goal">
            <button className="lose-weight"> Lose Weight</button>
            <button className="gain-weight">Maintain Weight</button>
            <button className="gain-weight">Gain Weight</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaloriesCalculator;
