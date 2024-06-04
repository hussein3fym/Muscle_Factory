import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./BMI.css";

const schema = yup.object().shape({
  weight: yup
    .number()
    .required("Weight is required")
    .min(20, "Weight must be at least 20 kg")
    .max(500, "Weight must be at most 500 kg"),
  height: yup
    .number()
    .required("Height is required")
    .min(60, "Height must be at least 60 cm")
    .max(500, "Height must be at most 500 cm"),
});

const BMI = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState("");

  const calculateBMI = ({ weight, height }) => {
    const heightInMeters = height / 100;
    const bmiValue = weight / (heightInMeters * heightInMeters);
    setBmi(bmiValue.toFixed(2));

    if (bmiValue < 18.5) {
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
        <form className="BMI-Form" onSubmit={handleSubmit(calculateBMI)}>
          <h1>Enter your information</h1>
          <div className="input-group">
            <label>
              Weight (kg):
              <input
                type="number"
                className="input-data"
                {...register("weight")}
              />
              {errors.weight && (
                <p
                  style={{
                    color: "red",
                  }}
                  className="error-message"
                >
                  {errors.weight.message}
                </p>
              )}
            </label>
          </div>
          <div className="input-group">
            <label>
              Height (cm):
              <input
                type="number"
                className="input-data"
                {...register("height")}
              />
              {errors.height && (
                <p
                  style={{
                    color: "red",
                  }}
                  className="error-message"
                >
                  {errors.height.message}
                </p>
              )}
            </label>
          </div>
          <div>
            <button type="submit" className="Calculate">
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
