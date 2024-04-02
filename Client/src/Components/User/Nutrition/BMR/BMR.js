import React, { useState } from "react";

const BMR = () => {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmr, setBMR] = useState(0);

  const calculateBMR = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    if (gender === "male") {
      const bmrValue = 10 * weight + 6.25 * height - 5 * age + 5;
      setBMR(bmrValue);
    } else if (gender === "female") {
      const bmrValue = 10 * weight + 6.25 * height - 5 * age - 161;
      setBMR(bmrValue);
    }
  };

  const Reload = () => {
    window.location.reload();
  };

  return (
    <div>
      <div>
        <h2>BMR Calculator</h2>
        <form onSubmit={calculateBMR}>
          <label>
            Gender:
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>

          <label>
            Age (years):
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </label>

          <label>
            Weight (kg):
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </label>

          <label>
            Height (cm):
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </label>
          <div>
            <button type="submit">Calculate BMR</button>
            <button type="button" onClick={Reload}>
              Reload
            </button>
          </div>

          {bmr !== 0 && ( // Check if bmr is not 0
            <div>
              <h3>Your Basal Metabolic Rate (BMR) is: {bmr} calories/day</h3>
              <p>
                Your Basal Metabolic Rate (BMR) represents the number of
                calories your body needs to maintain basic bodily functions
                while at rest. This includes functions such as breathing,
                circulating blood, and cell production. Your actual daily
                caloric needs may vary based on your activity level and other
                factors.
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default BMR;
