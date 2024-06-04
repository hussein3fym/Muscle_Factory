import React from "react";
import "./Workout.css";
import TrainerWorkout from "./TrainerWorkout";
const Workout = () => {
  return (
    <div className="Workout-container">
      <div className="exe-title">
        <h1>Work hard dream big</h1>
        <h2> It's not about passion, it's about discipline </h2>
      </div>
      <TrainerWorkout />
    </div>
  );
};
export default Workout;
