import React, { useEffect, useState } from "react";
import { exerciseOptions, fetchData } from "./../../../Utils/fetchData";

const Workout = ({ exercise, setExercise, bodyPart }) => {
  console.log(exercise);
  return (
    <div>
      <h1>Lets Start</h1>;
      {/* {exercise.map((exercise, index) => (
        <div key={index}>
          <img src={exercise.image} alt={exercise.name} />
          <h2>{exercise.name}</h2>
          <p>{exercise.target}</p>
          <p>{exercise.equipment}</p>
          <p>{exercise.bodyPart}</p>
        </div>
      ))} */}
    </div>
  );
};
export default Workout;
