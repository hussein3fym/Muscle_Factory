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

      {/* <div className="workout-menu">
        <h1 className="button">Exercise API</h1>
        <h1 className="button">Exercise From DataBase</h1>
        <h1 className="button">Additional API , Actors Exercise </h1>
        <h1 className="button">Exercise Plan</h1>
        <h1 className="button">Exercise 3D Human Body</h1>
      </div> */}
      <TrainerWorkout />
    </div>
  );
};
export default Workout;
