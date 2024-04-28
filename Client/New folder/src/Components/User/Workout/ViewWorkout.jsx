import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import "./View.css";

const ViewWorkout = () => {
  const [trainerWorkout, setTrainerWorkout] = useState({});
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get("https://localhost:7095/api/Exercises/" + id)
      .then((res) => {
        setTrainerWorkout(res.data);
        setLoading(false);
        console.log("Fetched Exercises Data:", res.data);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
        console.error("Error fetching blogs:", error);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="View-container">
      <div className="ExerciseDetails">
        <h1>{trainerWorkout.exerciseName}</h1>
        <div className="ExerciseContainer">
          {trainerWorkout.youTubeVideo && (
            <ReactPlayer
              url={trainerWorkout.youTubeVideo}
              controls={true}
              playing={false}
              volume={0.5}
              className="custom-react-player"
            />
          )}
          <div className="Description">
            <h2>Exercise Description </h2>
            <table>
              <tbody>
                <tr>
                  <td>Target Muscle:</td>
                  <td>{trainerWorkout.targetMuscle}</td>
                </tr>
                <tr>
                  <td>Level:</td>
                  <td>{trainerWorkout.level}</td>
                </tr>
                <tr>
                  <td>Equipment:</td>
                  <td>{trainerWorkout.equipment}</td>
                </tr>
                <tr>
                  <td>Secondary Muscle:</td>
                  <td>{trainerWorkout.secondaryMuscle}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="MediaContainer">
          {trainerWorkout.video && (
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
          {trainerWorkout.image && (
            <div>
              <img
                src={`data:image/jpg;base64,${trainerWorkout.image}`}
                alt="Exercise Image"
              />
            </div>
          )}
        </div>
        <div className="Overview">
          <h2>Overview </h2>
          <p
            dangerouslySetInnerHTML={{ __html: trainerWorkout.instructions }}
          ></p>
        </div>
      </div>
    </div>
  );
};

export default ViewWorkout;
