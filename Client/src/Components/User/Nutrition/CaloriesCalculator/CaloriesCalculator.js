import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./CaloriesCalculator.css";
import CaloriesResult from "./CaloriesResult";

const CaloriesCalculator = () => {
  const [result, setResult] = useState(null);
  const validationSchema = yup.object().shape({
    weight: yup
      .number()
      .typeError("Weight must be a number")
      .required("Weight is required")
      .positive("Weight must be a positive number")
      .min(20, "Weight must be at least 20 kg")
      .max(400, "Weight must be at most 400 kg"),
    height: yup
      .number()
      .typeError("Height must be a number")
      .required("Height is required")
      .positive("Height must be a positive number")
      .min(30, "Height must be at least 30 cm")
      .max(400, "Height must be at most 400 cm"),
    age: yup
      .number()
      .typeError("Age must be a number")
      .required("Age is required")
      .positive("Age must be a positive number")
      .min(4, "Age must be at least 4 year")
      .max(200, "Age must be at most 200 year"),
    gender: yup
      .string()
      .oneOf(["male", "female"], "Select a valid gender")
      .required("Gender is required"),
    activityLevel: yup
      .string()
      .oneOf(
        ["sedentary", "light", "moderate", "active", "veryActive"],
        "Select a valid activity level"
      )
      .required("Activity level is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

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

  const calculateCalories = (data) => {
    const { weight, height, age, gender, activityLevel } = data;
    let calculatedCalories = 0;
    if (gender === "male") {
      calculatedCalories =
        (66.5 + 13.75 * weight + 5.003 * height - 6.755 * age) *
        getActivityMultiplier(activityLevel);
    } else if (gender === "female") {
      calculatedCalories =
        (655 + 9.563 * weight + 1.85 * height - 4.676 * age) *
        getActivityMultiplier(activityLevel);
    }
    setResult(Math.round(calculatedCalories));
  };

  const activityLevelMessages = {
    sedentary: "Little to no exercise.",
    light: "Light exercise/sports 1-3 days per week.",
    moderate: "Moderate exercise/sports 3-5 days per week.",
    active: "Hard exercise/sports 6-7 days per week.",
    veryActive: "Very hard exercise/sports & physical job or 2x training.",
  };

  const Reload = () => {
    reset();
    setResult(null);
  };

  const watchedActivityLevel = watch("activityLevel");

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

  return (
    <div className="Calories-container">
      <div className="C-container">
        <form
          onSubmit={handleSubmit(calculateCalories)}
          className="Calories-Form"
        >
          <h1>Enter your information</h1>
          <div className="input-group">
            <label>
              Weight (kg):
              <input
                className="input-data"
                type="number"
                {...register("weight")}
              />
              {errors.weight && (
                <div
                  className="error"
                  style={{
                    color: "red",
                  }}
                >
                  {errors.weight.message}
                </div>
              )}
            </label>
          </div>
          <div className="input-group">
            <label>
              Height (cm):
              <input
                className="input-data"
                type="number"
                {...register("height")}
              />
              {errors.height && (
                <div
                  className="error"
                  style={{
                    color: "red",
                  }}
                >
                  {errors.height.message}
                </div>
              )}
            </label>
          </div>
          <div className="input-group">
            <label>
              Age (years):
              <input
                className="input-data"
                type="number"
                {...register("age")}
              />
              {errors.age && (
                <div
                  className="error"
                  style={{
                    color: "red",
                  }}
                >
                  {errors.age.message}
                </div>
              )}
            </label>
          </div>
          <div className="input-group">
            <label htmlFor="gender">Gender: </label>
            <select
              id="gender"
              name="gender"
              className="Calories-gender"
              {...register("gender")}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && (
              <div
                className="error"
                style={{
                  color: "red",
                }}
              >
                {errors.gender.message}
              </div>
            )}
          </div>
          <div className="input-radio">
            <label>Activity Level:</label>
            <div>
              <label>
                <input
                  type="radio"
                  value="sedentary"
                  {...register("activityLevel")}
                />
                Sedentary
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="light"
                  {...register("activityLevel")}
                />
                Light
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="moderate"
                  {...register("activityLevel")}
                />
                Moderate
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="active"
                  {...register("activityLevel")}
                />
                Active
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="veryActive"
                  {...register("activityLevel")}
                />
                Very Active
              </label>
            </div>
            {errors.activityLevel && (
              <div
                className="error"
                style={{
                  color: "red",
                }}
              >
                {errors.activityLevel.message}
              </div>
            )}
            {watchedActivityLevel && (
              <p>{activityLevelMessages[watchedActivityLevel]}</p>
            )}
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
      {result !== null && (
        <CaloriesResult
          result={result} // Pass result as prop to CaloriesResult component
          calculateProtein={calculateProtein}
          calculateCarbs={calculateCarbs}
          calculateFats={calculateFats}
        />
      )}
    </div>
  );
};

export default CaloriesCalculator;
