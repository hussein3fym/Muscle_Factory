import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { useQuery } from "@tanstack/react-query";
import "./View.css";

const fetchEachWorkout = async (id) => {
  const { data } = await axios.get(
    `https://localhost:7095/api/Exercises/${id}`
  );
  return data;
};

const ViewWorkout = () => {
  const { id } = useParams();

  const { data: trainerWorkout, error } = useQuery(["trainerWorkout", id], () =>
    fetchEachWorkout(id)
  );

  if (error) return <div>Error fetching Exercise: {error.message}</div>;

  return (
    <div className="View-container">
      <div className="ExerciseDetails">
        <h1>{trainerWorkout?.exerciseName || "Loading..."}</h1>
        <div className="ExerciseContainer">
          {trainerWorkout?.youTubeVideo && (
            <ReactPlayer
              url={trainerWorkout.youTubeVideo}
              controls
              playing={false}
              volume={0.5}
              className="custom-react-player"
            />
          )}
          <div className="Description">
            <h2>Exercise Description</h2>
            <table>
              <tbody>
                <tr>
                  <td>Target Muscle:</td>
                  <td>{trainerWorkout?.targetMuscle || "N/A"}</td>
                </tr>
                <tr>
                  <td>Level:</td>
                  <td>{trainerWorkout?.level || "N/A"}</td>
                </tr>
                <tr>
                  <td>Equipment:</td>
                  <td>{trainerWorkout?.equipment || "N/A"}</td>
                </tr>
                <tr>
                  <td>Secondary Muscle:</td>
                  <td>{trainerWorkout?.secondaryMuscle || "N/A"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="MediaContainer">
          {trainerWorkout?.video && (
            <div>
              <video
                controls
                style={{
                  width: "266px",
                  height: "266px",
                  border: "1px solid black",
                }}
              >
                <source
                  src={`data:video/mp4;base64,${trainerWorkout.video}`}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
        <div className="Overview">
          <div>
            {" "}
            <h2>Overview</h2>
            {trainerWorkout?.image && (
              <div>
                <img
                  src={`data:image/jpg;base64,${trainerWorkout.image}`}
                  alt={trainerWorkout.exerciseName || "Workout Image"}
                />
              </div>
            )}
            <p
              dangerouslySetInnerHTML={{
                __html:
                  trainerWorkout?.instructions || "No instructions available.",
              }}
            ></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewWorkout;
