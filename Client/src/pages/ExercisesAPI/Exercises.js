import React, { useState } from "react";
import "./Exercises.css";
import exercise from "./../../Assets/images/exercises.jpg";
import Search from "../Search/Search";
import Exercise from "./Exercise";

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState("all");

  return (
    <div className="Exercises">
      <div className="exercises-welcome">
        <img src={exercise} alt="exercises" />
        <div className="overlay"></div>
        <div className="text-overlay">
          <h1>Exercise Video Database</h1>
          <h5>
            The largest and most comprehensive database of free video exercise
            guides! Learn how to perform exercises using correct technique.
          </h5>
        </div>
      </div>
      <div className="exercise-overview">
        <h2>
          Exercises <span>+1300</span>
        </h2>
        <h2>
          Videos <span>+500</span>
        </h2>
        <h2>
          Categories <span>+100</span>
        </h2>
      </div>
      <div>
        <Search
          setExercises={setExercises}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
        />
        <Exercise
          setExercises={setExercises}
          exercises={exercises}
          bodyPart={bodyPart}
        />
      </div>
    </div>
  );
};

export default Exercises;
