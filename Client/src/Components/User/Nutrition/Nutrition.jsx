import React from "react";
import "./Nutrition.css";
import { Link } from "react-router-dom";
import Predictor from "./Predictor/Predictor";

const Nutrition = () => {
  return (
    <div className="Nutrition-container">
      <h1>Eat well live better </h1>
      <div className="C-Calculators">
        <div class="Calculators">
          <h2>
            <Link to="/CaloriesCalculator">Do you know your Calories?</Link>
          </h2>
          <h2>
            <Link to="/BMI">Do you know your BMI?</Link>
          </h2>
          {/* <h2>
            <Link to="/BMR">Do you know your BMR?</Link>
          </h2> */}
        </div>
      </div>
      <div>
        <Predictor />
        <h2>Recommendation</h2>
        <h2>API</h2>
        <h2>Recipes, health care API</h2>
      </div>
    </div>
  );
};

export default Nutrition;
