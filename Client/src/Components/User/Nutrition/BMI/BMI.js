import React, { useState } from "react";
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
    <div className="app">
      <div className="BMcontainer">
        <h1 className="BMtitle">BMI Calculator</h1>
        <form className="BMform">
          <br />
          <label>
            Weight (kg):
            <input
              type="number"
              className="BMinput"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </label>
          <br />
          <label>
            Height (cm):
            <input
              type="number"
              className="BMinput"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </label>
          <br />
          <button type="button" onClick={calculateBMI}>
            Calculate BMI
          </button>
          <button type="button" onClick={Reload}>
            Reload
          </button>
          <div className="center">
            <h2>Your BMI: {bmi}</h2>
            <p>{message}</p>
          </div>
          <div>
            <img src={imgSrc} alt=""></img>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BMI;
