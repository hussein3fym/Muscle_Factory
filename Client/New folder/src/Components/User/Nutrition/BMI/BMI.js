import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./BMI.css";

const BMI = () => {
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState("");

  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const weightValue = parseFloat(weight);
    const heightValue = parseFloat(height);
    if (
      isNaN(weightValue) ||
      isNaN(heightValue) ||
      weightValue <= 0 ||
      heightValue <= 0
    ) {
      setMessage("Please enter valid weight and height values.");
      return;
    }

    const bmiValue = weight / (heightInMeters * heightInMeters);
    setBmi(bmiValue.toFixed(2));
    if (weight === 0 || height === 0) {
      setMessage("Please enter a valid weight and height");
    } else if (bmiValue < 18.5) {
      setMessage("Underweight");
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setMessage("Normal");
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setMessage("Overweight");
    } else {
      setMessage("Obese");
    }
  };

  let imgSrc;

  if (bmi < 1) {
    imgSrc = null;
  } else {
    if (bmi < 25) {
      imgSrc = require("./../../../../Assets/underweight.png");
    } else if (bmi >= 25 && bmi < 30) {
      imgSrc = require("./../../../../Assets/healthy.png");
    } else {
      imgSrc = require("./../../../../Assets/overweight.png");
    }
  }
  const Reload = () => {
    window.location.reload();
  };

  return (
    <div className="BMI-container">
      <div className="B-container">
        <form className="BMI-Form">
          <h1>Enter your information</h1>
          <div className="input-group">
            <label>
              Weight (kg):
              <input
                type="number"
                className="input-data"
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
                className="input-data"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </label>
          </div>
          <div>
            <button type="button" onClick={calculateBMI} className="Calculate">
              Calculate BMI
            </button>
            <button type="button" onClick={Reload} className="Reload">
              Reload
            </button>
          </div>
          <div>
            <div className="result-display">
              <h2>Your BMI: {bmi}</h2>
              <p>{message}</p>
            </div>
            {bmi && (
              <div className="img-container">
                <img src={imgSrc} alt="" />
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BMI;
