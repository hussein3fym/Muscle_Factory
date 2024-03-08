import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ViewExercises = () => {
  const [exercises, setExercise] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("  https://localhost:7095/api/Exercises/" + id)
      .then((res) => {
        setExercise(res.data);
        console.log("Fetched Exercises Data:", res.data);
      })
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
          {exercises.video && (
            <div>
              Video:
              <video
                controls
                style={{
                  width: "266px",
                  height: "266px",
                  border: "1px solid black",
                }}
              >
                <source
                  src={`data:video/mp4;base64,${exercises.video}`}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
          {exercises.image && (
            <div>
              Image :
              <img
                src={`data:image/jpg;base64,${exercises.image}`}
                alt="Exercise Image"
                style={{
                  width: "100px",
                  height: "100px",
                  border: "1px solid black",
                }}
              />
            </div>
          )}
          <p> Level Suggestion:{exercises.level} </p>
        </div>
      </div>
    </div>
  );
};
export default ViewExercises;
