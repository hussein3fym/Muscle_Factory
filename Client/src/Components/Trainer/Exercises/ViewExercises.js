import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import "./../Styles/View.css";

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
    <div>
      <h1 className="ViewTitle">Welcome Trainer</h1>
      <div className="View-form">
        <div className="exercise-info">
          <h2 className="HeadLines">Exercise Name: </h2>
          <p>{exercises.exerciseName}</p>
        </div>
        <div className="exercise-info">
          <h2 className="HeadLines"> The Equipment: </h2>
          <p>{exercises.equipment}</p>
        </div>
        <div className="exercise-info">
          <h2 className="HeadLines"> Target Muscle: </h2>
          <p>{exercises.targetMuscle}</p>
        </div>
        <div className="exercise-info">
          <h2 className="HeadLines"> Secondary Muscle: </h2>
          <p>{exercises.secondaryMuscle}</p>
        </div>
        <div className="exercise-info">
          <h2 className="HeadLines"> Instructions: </h2>
          <p dangerouslySetInnerHTML={{ __html: exercises.instructions }}></p>
        </div>
        <div className="exercise-info">
          <h2 className="HeadLines"> Level Suggestion: </h2>
          <p>{exercises.level}</p>
        </div>
        <div className="blogContent">
          {exercises.youTubeVideo && (
            <div>
              <h2 className="HeadLines">YouTube Video:</h2>
              <ReactPlayer
                url={exercises.youTubeVideo}
                controls={true}
                playing={false}
                volume={0.5}
                className="custom-react-player"
              />
            </div>
          )}
          {exercises.image && (
            <div>
              <h2 className="HeadLines">Image :</h2>
              <img
                src={`data:image/jpg;base64,${exercises.image}`}
                alt="Exercise Image"
                className="exerciseImage"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ViewExercises;
