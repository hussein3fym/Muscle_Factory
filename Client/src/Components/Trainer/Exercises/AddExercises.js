import React, { useState } from "react";
import { Link } from "react-router-dom";

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
    <div>
      <h1>Add Exercises</h1>
      <form onSubmit={handleSubmit}>
        <label style={{ color: "black" }}>
          Exercise Name
          <input
            type="text "
            name="exerciseName"
            value={exerciseData.exerciseName}
            onChange={handleChange}
          />
        </label>
        <label style={{ color: "black" }}>
          The Equipment
          <input
            type="text"
            name="equipment"
            value={exerciseData.equipment}
            onChange={handleChange}
          />
        </label>
        <label style={{ color: "black" }}>
          Target Muscle
          <input
            type="text"
            name="targetMuscle"
            className=""
            value={exerciseData.targetMuscle}
            onChange={handleChange}
          />
        </label>
        <label style={{ color: "black" }}>
          Secondary Muscle
          <input
            type="text"
            name="secondaryMuscle"
            className=""
            value={exerciseData.secondaryMuscle}
            onChange={handleChange}
          />
        </label>
        <label style={{ color: "black" }}>
          Instructions
          <textarea
            name="instructions"
            className=""
            value={exerciseData.instructions}
            onChange={handleChange}
          />
        </label>
        <label style={{ color: "black" }}>
          Upload Video:
          <input
            type="file"
            name="video"
            accept="video/*"
            value={exerciseData.video}
            onChange={handleChange}
          />
        </label>
        <label style={{ color: "black" }}>
          Upload Image or GIF:
          <input
            type="file"
            name="image"
            accept="image/*,image/gif"
            value={exerciseData.image}
            onChange={handleChange}
          />
        </label>

        <label style={{ color: "black" }}>
          Level Suggestion:
          <select
            name="level"
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
  );
};

export default AddExercises;
