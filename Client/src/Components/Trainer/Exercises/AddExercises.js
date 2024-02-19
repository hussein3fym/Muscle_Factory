import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ExercisesForm.css";

const AddExercises = () => {
  const [exerciseData, setExerciseData] = useState({
    exerciseName: "",
    equipment: "",
    targetMuscle: "",
    secondaryMuscle: "",
    instructions: "",
    video: null,
    image: null,
    level: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExerciseData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", exerciseData);
  };
  return (
    <div className="app">
      <div className="BMcontainer">
        <h1 className="BMtitle">Welcome Trainer Add Exercises</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Exercise Name
            <input
              type="text "
              className="BMinput"
              name="exerciseName"
              value={exerciseData.exerciseName}
              onChange={handleChange}
            />
          </label>
          <label>
            The Equipment
            <input
              type="text"
              className="BMinput"
              name="equipment"
              value={exerciseData.equipment}
              onChange={handleChange}
            />
          </label>
          <label>
            Target Muscle
            <input
              type="text"
              className="BMinput"
              name="targetMuscle"
              value={exerciseData.targetMuscle}
              onChange={handleChange}
            />
          </label>
          <label>
            Secondary Muscle
            <input
              type="text"
              name="secondaryMuscle"
              className="BMinput"
              value={exerciseData.secondaryMuscle}
              onChange={handleChange}
            />
          </label>
          <label>
            Instructions
            <textarea
              name="instructions"
              className="BMinput"
              value={exerciseData.instructions}
              onChange={handleChange}
            />
          </label>
          <label>
            Upload Video:
            <input
              type="file"
              className="BMinput"
              name="video"
              accept="video/*"
              value={exerciseData.video}
              onChange={handleChange}
            />
          </label>
          <label>
            Upload Image or GIF:
            <input
              type="file"
              className="BMinput"
              name="image"
              accept="image/*,image/gif"
              value={exerciseData.image}
              onChange={handleChange}
            />
          </label>

          <label>
            Level Suggestion:
            <select
              name="level"
              className="BMinput"
              value={exerciseData.level}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Level
              </option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </label>
          <br />

          <button type="submit">Submit</button>
          <Link to="/ExercisesForm" className="btn btn bg-success">
            See all exercises
          </Link>
        </form>
      </div>
    </div>
  );
};

export default AddExercises;
