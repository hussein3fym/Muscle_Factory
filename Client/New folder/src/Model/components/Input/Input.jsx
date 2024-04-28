import { useState, useContext } from "react";
import { Context } from "./../../context/context";

function Input() {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("male");
  const [activityLevel, setActivityLevel] = useState("sedentary");
  const [goal, setGoal] = useState("maintain weight");
  const [numMeals, setNumMeals] = useState("3");

  const { updateInputAndSendData } = useContext(Context);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      Age: age,
      Weight: weight,
      Height: height,
      Gender: gender,
      ActivityLevel: activityLevel,
      Goal: goal,
      NumMeals: numMeals,
    };

    const promptWithArray = `This is my data and my goal, make me a diet plan\n${Object.entries(
      formData
    )
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n")}`;

    console.log(promptWithArray); // Make sure this logs correctly
    updateInputAndSendData(promptWithArray);
  };
  return (
    <div>
      <h2>Enter Your Information</h2>
      <form id="input" className="form-container" onSubmit={handleSubmit}>
        {/* Form inputs */}
        {/* Age */}
        <label>
          Age:
          <input
            required
            value={age}
            onChange={(e) => setAge(e.target.value)}
            type="number"
            name="age"
            id="age"
          />
        </label>
        <br />

        {/* Weight */}
        <label>
          Weight (kg):
          <input
            required
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            type="number"
            name="weight"
            id="weight"
          />
        </label>
        <br />

        {/* Height */}
        <label>
          Height (cm):
          <input
            required
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            type="number"
            name="height"
            id="height"
          />
        </label>
        <br />

        {/* Gender */}
        <label>
          Gender:
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            name="gender"
            id="gender"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <br />

        {/* Activity Level */}
        <label>
          Activity Level:
          <select
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
            name="activityLevel"
            id="activityLevel"
          >
            <option value="sedentary">Sedentary</option>
            <option value="light">Light</option>
            <option value="moderate">Moderate</option>
            <option value="very active">Very Active</option>
            <option value="extra active">Extra Active</option>
          </select>
        </label>
        <br />

        {/* Goal */}
        <label>
          Goal:
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            name="goal"
            id="goal"
          >
            <option value="lose weight">Lose Weight</option>
            <option value="maintain weight">Maintain Weight</option>
            <option value="build muscles">Build Muscles</option>
          </select>
        </label>
        <br />

        {/* Number of Meals */}
        <label>
          Number of Meals
          <select
            value={numMeals}
            onChange={(e) => setNumMeals(e.target.value)}
            name="numMeals"
            id="numMeals"
          >
            <option value="3">3 Meals</option>
            <option value="4">4 Meals</option>
            <option value="5">5 Meals</option>
          </select>
        </label>
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Input;
