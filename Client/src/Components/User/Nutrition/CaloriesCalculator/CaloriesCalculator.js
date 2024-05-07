import React, { useState, useEffect } from "react";
import "./CaloriesCalculator.css";
import { BiExport } from "react-icons/bi";

const CaloriesCalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [result, setResult] = useState(null);
  const [gender, setGender] = useState("male");
  const [loseWeightMode, setLoseWeightMode] = useState(false);
  const [gainWeightMode, setGainWeightMode] = useState(false);
  const [maintainWeightMode, setMaintainWeightMode] = useState(false);
  const [adjustedCalories, setAdjustedCalories] = useState(0);
  const [loseCalories, setLoseCalories] = useState(0);
  const [gainCalories, setGainCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fats, setFats] = useState(0);

  const calculateCalories = (event) => {
    event.preventDefault();
    let calculatedCalories = 0;

    if (gender === "male") {
      calculatedCalories =
        (66.5 +
          13.75 * parseFloat(weight) +
          5.003 * parseFloat(height) -
          6.755 * parseFloat(age)) *
        getActivityMultiplier(activityLevel);
    } else if (gender === "female") {
      calculatedCalories =
        (655 +
          9.563 * parseFloat(weight) +
          1.85 * parseFloat(height) -
          4.676 * parseFloat(age)) *
        getActivityMultiplier(activityLevel);
    }

    const proteinGrams = calculateProtein(calculatedCalories);
    const carbsGrams = calculateCarbs(calculatedCalories);
    const fatsGrams = calculateFats(calculatedCalories);

    setProtein(proteinGrams.toFixed(2));
    setCarbs(carbsGrams.toFixed(2));
    setFats(fatsGrams.toFixed(2));
    setAdjustedCalories(calculatedCalories.toFixed(2));
    setLoseCalories(calculatedCalories.toFixed(2));
    setGainCalories(calculatedCalories.toFixed(2));
    setResult(calculatedCalories.toFixed(2));
  };
  const calculateProtein = (calories) => {
    const proteinPercentage = 0.2;
    const proteinCalories = calories * proteinPercentage;
    return proteinCalories / 4;
  };

  const calculateCarbs = (calories) => {
    const carbsPercentage = 0.5;
    const carbsCalories = calories * carbsPercentage;
    return carbsCalories / 4;
  };

  const calculateFats = (calories) => {
    const fatsPercentage = 0.3;
    const fatsCalories = calories * fatsPercentage;
    return fatsCalories / 9;
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

  const handleLoseWeightClick = () => {
    setLoseWeightMode(true);
    setGainWeightMode(false);
    setMaintainWeightMode(false);
    if (result !== null) {
      const adjusted = result - 500;
      setLoseCalories(adjusted);
    }
  };

  const handleGainWeightClick = () => {
    setGainWeightMode(true);
    setLoseWeightMode(false);
    setMaintainWeightMode(false);

    if (result !== null) {
      const currentResult = parseFloat(result);

      // Add 500 to the parsed float value of result
      const gain = currentResult + 500;

      // Update state with the new calorie count, ensuring it's formatted correctly
      setGainCalories(gain.toFixed(2));
    }
  };
  const handleMaintainWeightClick = () => {
    setMaintainWeightMode(true);
    setLoseWeightMode(false);
    setGainWeightMode(false);

    if (result !== null) {
      setAdjustedCalories(result);
    }
  };
  const handleGenderChange = (event) => {
    setGender(event.target.value);
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
          <div className="input-group">
            <label htmlFor="gender">Gender: </label>
            <select
              id="gender"
              name="gender"
              className="Calories-gender"
              value={gender}
              onChange={handleGenderChange} // Handle gender selection change
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
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
      {result > 0 && (
        <div className="result">
          <p>
            Total Calories: <span>{result} Kcal</span>
          </p>
          <p>
            Protein:<span> {protein} g</span>
          </p>
          <p>
            Carbohydrates:<span> {carbs} g</span>
          </p>
          <p>
            Fats:<span> {fats} g</span>
          </p>
        </div>
      )}
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
            <button onClick={handleLoseWeightClick} className="lose-weight">
              Lose Weight
            </button>
            <button onClick={handleGainWeightClick} className="gain-weight">
              Gain Weight
            </button>
            <button onClick={handleMaintainWeightClick} className="gain-weight">
              Maintain Weight
            </button>
          </div>
        </div>
      </div>

      {loseWeightMode && (
        <div className="month-plan">
          <div className="plan-content">
            <h3>Here's a suggestion plan for your proposed :</h3>
            <h4>Weeks 1 & 2:</h4>
            <p>
              <strong>Calorie Intake:</strong> <span> {loseCalories} </span>
              calories daily
            </p>
            <p>
              {" "}
              <strong>Goal:</strong> Create a calorie deficit to facilitate
              weight loss of approximately 0.5 kg (1 pound) per week.
            </p>
            <p>
              <strong>Rationale:</strong> This approach promotes gradual and
              sustainable weight loss, generally considered safe and effective
              for most individuals.
            </p>
            <h4>Weeks 3:</h4>
            <p>
              <strong>Calorie Intake (Day 1):</strong> <span>{result}</span>{" "}
              (break from reduced intake).
            </p>
            <p>
              <strong>Calorie Intake (Days 2-7):</strong> Eat
              <span>{loseCalories}</span> calories again.
            </p>
            <p>
              <strong>Goal:</strong> Prevent metabolic slowdown and boost
              motivation.
            </p>
            <h4>Week 4 & Onward:</h4>
            <p>
              <strong>Calorie Intake:</strong> Maintain or adjust calorie intake
              based on individual progress and goals.
            </p>
            <p>
              <strong>Goal:</strong> Sustain weight loss and reach your goals.
            </p>
            <p>
              <strong>Rationale:</strong> Consistency and personalized
              adjustments are crucial for long-term weight management success.
              By maintaining or modifying calorie intake and physical activity
              levels, you can achieve and sustain your desired weight loss
              goals.
            </p>
          </div>
          <h5>
            <strong>Disclaimer:</strong> This information is intended for
            general educational purposes only and should not be construed as
            medical advice. Always consult with a healthcare professional before
            starting any new diet or exercise program, especially if you have
            any underlying health conditions.
          </h5>
          <button className="print-weight">
            <BiExport />
            Export in pdf
          </button>
        </div>
      )}

      {gainWeightMode && (
        <div className="month-plan">
          <div className="plan-content">
            <h3>Here's a suggestion plan for your goal to gain weight:</h3>
            <h4>Weeks 1 & 2:</h4>
            <p>
              <strong>Calorie Intake:</strong> <span>{gainCalories}</span>{" "}
              calories daily
            </p>
            <p>
              <strong>Goal:</strong> Establish a calorie surplus to facilitate
              weight gain at a rate of about 0.5 kg (1 pound) per week.
            </p>
            <p>
              <strong>Rationale:</strong> Increasing caloric intake above energy
              needs can help you gain weight, while focusing on nutrient-dense
              foods ensures that the weight gained is beneficial and healthy.
            </p>
            <h4>Weeks 3 & 4:</h4>
            <p>
              <strong>Calorie Intake:</strong> Gradually increase intake by{" "}
              <span>200</span> calories if weight gain is less than expected.
            </p>
            <p>
              <strong>Goal:</strong> Adjust caloric intake based on weight gain
              progress and body response.
            </p>
            <p>
              <strong>Rationale:</strong> Continuous monitoring and adjustment
              of calorie intake help in achieving the desired weight gain at a
              healthy pace, avoiding excessive fat accumulation.
            </p>
            <h4>Month 2 Onward:</h4>
            <p>
              <strong>Calorie Intake:</strong> Continue adjusting calorie intake
              as necessary while focusing on balanced macronutrient intake.
            </p>
            <p>
              <strong>Goal:</strong> Sustain weight gain and approach your goal
              healthily.
            </p>
            <p>
              <strong>Rationale:</strong> Long-term consistency and nutrient
              balance are crucial for gaining weight healthily and sustainably.
            </p>
          </div>
          <h5>
            <strong>Disclaimer:</strong> This information is intended for
            general educational purposes only and should not be construed as
            medical advice. Always consult with a healthcare professional before
            starting any new diet or exercise program.
          </h5>
          <button className="print-weight">
            <BiExport />
            Export in pdf
          </button>
        </div>
      )}
      {maintainWeightMode && (
        <div className="month-plan">
          <div className="plan-content">
            <h3>
              Here's a suggestion plan for maintaining your current weight:
            </h3>
            <h4>Ongoing Daily Plan:</h4>
            <p>
              <strong>Calorie Intake:</strong> <span>{adjustedCalories}</span>{" "}
              calories daily
            </p>
            <p>
              <strong>Goal:</strong> Balance calorie intake with calorie
              expenditure to maintain current body weight.
            </p>
            <p>
              <strong>Rationale:</strong> Achieving energy balance is crucial
              for maintaining weight and preventing unwanted weight gain or
              loss.
            </p>
            <p>
              <strong>Additional Tips:</strong> Continue monitoring your weight,
              adjust your diet as needed, and maintain regular physical
              activity.
            </p>
          </div>
          <h5>
            <strong>Disclaimer:</strong> This information is intended for
            general educational purposes only and should not be construed as
            medical advice. Always consult with a healthcare professional before
            making any significant changes to your diet or exercise regimen.
          </h5>
          <button className="print-weight">
            <BiExport />
            Export in pdf
          </button>
        </div>
      )}
    </div>
  );
};

export default CaloriesCalculator;
