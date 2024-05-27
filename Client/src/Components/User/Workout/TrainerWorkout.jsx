import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { GrFormView } from "react-icons/gr";
import "./Workout.css";
const TrainerWorkout = () => {
  const [trainerWorkout, setTrainerWorkout] = useState([]);
  useEffect(() => {
    axios
      .get("https://localhost:7095/api/Exercises")
      .then((res) => setTrainerWorkout(res.data))
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, []);
  const handleView = (exerciseId) => {
    console.log(`View Exercise Details with ID:${exerciseId}`);
  };
  return (
    <div>
      <div className="workout-list">
        {trainerWorkout.map((exercise, i) => (
          <div key={i} className="workout-item">
            <img
              src={`data:image/jpeg;base64,${exercise.image}`}
              alt="Blog Thumbnail"
              className="workout-card-image"
            />
            <h1>{exercise.exerciseName}</h1>
            <p>{exercise.targetMuscle}</p>
            <div>
              <hr></hr>
              <Link
                className="view-btn"
                to={`/ViewWorkout/${exercise.id}`}
                onClick={() => handleView(exercise.id)}
              >
                <GrFormView />
              </Link>
              {/* <div onClick={() => toggleMoreOption(i)}>
                
                <IoMdMore />
              </div>
              {showOptions === i && ( // Conditionally render additional options
                <div>
                  <Link
                    to={`/UserWorkout/${exercise.id}`}
                    onClick={() => handleView(exercise.id)}
                  >
                    View
                  </Link>
                  <p>
                    {" "}
                    <IoStarSharp />
                    Add to favorite
                  </p>
                </div>
              )} */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainerWorkout;
