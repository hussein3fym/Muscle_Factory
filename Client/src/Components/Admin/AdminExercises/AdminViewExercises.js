import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./../AdminBlogs/AdminView.css";
const AdminViewExercises = () => {
  const [adminExerciseData, setAdminExerciseData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get("  https://localhost:7095/api/Exercises/" + id)
      .then((res) => {
        setAdminExerciseData(res.data);
        console.log("Fetched Exercises Data:", res.data);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, [id]);

  return (
    <div>
      <h1 className="ViewTitle">View Exercise</h1>
      <div className="View-form">
        <div className="exercise-info">
          <h2 className="HeadLines">Exercise Name: </h2>
          <p>{adminExerciseData.exerciseName}</p>
        </div>
        <div className="exercise-info">
          <h2 className="HeadLines">The Equipment:</h2>
          <p>{adminExerciseData.equipment}</p>
        </div>
        <div className="exercise-info">
          <h2 className="HeadLines">Target Muscle:</h2>
          <p>{adminExerciseData.targetMuscle}</p>
        </div>
        <div className="exercise-info">
          <h2 className="HeadLines">Secondary Muscle:</h2>
          <p>{adminExerciseData.secondaryMuscle}</p>
        </div>
        <div className="exercise-info">
          <h2 className="HeadLines">Instructions:</h2>
          <p>{adminExerciseData.instructions}</p>
        </div>
        <div className="exercise-info">
          <h2 className="HeadLines">Level Suggestion:</h2>
          <p>{adminExerciseData.level}</p>
        </div>
        <div className="blogContent">
          {adminExerciseData.video && (
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
                  src={`data:video/mp4;base64,${adminExerciseData.video}`}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
          <div>
            <div className="HeadLines">
              Image
              <img
                className="exerciseImage"
                src={`data:image/jpg;base64,${adminExerciseData.image}`}
                alt="Exercise Image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminViewExercises;
