import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { GrFormView } from "react-icons/gr";
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
      {/* <div className="exe-filter">
        <select>
          <option value="All">Muscle</option>
          <option value="Chest">Chest</option>
          <option value="Back">Back</option>
          <option value="Legs">Legs</option>
          <option value="Shoulders">Shoulders</option>
          <option value="Biceps">Biceps</option>
          <option value="Triceps">Triceps</option>
          <option value="Abs">Abs</option>
        </select>
        <select>
          <option value="All">Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <select>
          <option value="All">Equipment</option>
          <option value="Barbell">Barbell</option>
          <option value="Dumbbell">Dumbbell</option>
          <option value="Machine">Machine</option>
          <option value="Cable">Cable</option>
          <option value="Body Only">Body Only</option>
        </select>
        <select>
          <option value="All">Other</option>
          <option value="Cardio">Cardio</option>
          <option value="Strength">Strength</option>
          <option value="Flexibility">Flexibility</option>
          <option value="Balance">Balance</option>
        </select>
      </div> */}
      <div className="workout-list">
        {trainerWorkout.map((exercise, i) => (
          <div key={i} className="workout-item">
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
