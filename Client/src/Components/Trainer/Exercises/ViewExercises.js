import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ViewExercises = () => {
  const [exercises, setExercise] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("  http://localhost:4200/exercises/" + id)
      .then((res) => setExercise(res.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, [id]);
  return (
    <div className="app">
      <div className="BMcontainer">
        <h1 className="BMtitle">Welcome Trainer</h1>
        <div>
          <h4> Exercise Name: {exercises.exerciseName}</h4>
          <p> The Equipment: {exercises.equipment} </p>
          <p> Target Muscle: {exercises.targetMuscle} </p>
          <p> Secondary Muscle:{exercises.secondaryMuscle} </p>
          <p> Instructions:{exercises.instructions} </p>
          <p> Video:{exercises.video} </p>
          <p> Image:{exercises.image} </p>
          <p> Level Suggestion:{exercises.level} </p>
        </div>
      </div>
    </div>
  );
};
export default ViewExercises;
