import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    <div className="V-container">
      <div className="V-content">
        <div className="V-details">
          <h1>{trainerWorkout.exerciseName}</h1>
          <p>Target Muscle: {trainerWorkout.targetMuscle}</p>
          <p>Level: {trainerWorkout.level}</p>
          <p>Equipment: {trainerWorkout.equipment}</p>
          <p>Secondary Muscle: {trainerWorkout.secondaryMuscle}</p>
          <p>Instructions: {trainerWorkout.instructions}</p>
        </div>
      </div>
      <div>
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
              className="exerciseImage"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewWorkout;
