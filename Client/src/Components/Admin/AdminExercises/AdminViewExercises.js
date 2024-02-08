import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AdminViewExercises = () => {
  const [adminExerciseData, setAdminExerciseData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get("  http://localhost:4201/AdminExercises/" + id)
      .then((res) => setAdminExerciseData(res.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, [id]);
  return (
    <div className="app">
      <div className="BMcontainer">
        <h1 lassName="BMtitle">Welcome Trainer</h1>
        <div>
          <h4> Exercise Name: {adminExerciseData.exerciseName}</h4>
          <p> The Equipment: {adminExerciseData.equipment} </p>
          <p> Target Muscle: {adminExerciseData.targetMuscle} </p>
          <p> Secondary Muscle:{adminExerciseData.secondaryMuscle} </p>
          <p> Instructions:{adminExerciseData.instructions} </p>
          <p> Video:{adminExerciseData.video} </p>
          <p> Image:{adminExerciseData.image} </p>
          <p> Level Suggestion:{adminExerciseData.level} </p>
        </div>
      </div>
    </div>
  );
};

export default AdminViewExercises;
