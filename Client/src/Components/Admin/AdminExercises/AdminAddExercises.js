import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminAddExercises = () => {
  const [adminExerciseData, setAdminExerciseData] = useState({
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
    setAdminExerciseData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", adminExerciseData);
  };
  return (
    <div className="app">
      <div className="BMcontainer">
        <h1 lassName="BMtitle">Welcome Admin Add your Exercises</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Exercise Name
            <input
              type="text "
              className="BMinput"
              name="exerciseName"
              value={adminExerciseData.exerciseName}
              onChange={handleChange}
            />
          </label>
          <label>
            The Equipment
            <input
              type="text"
              className="BMinput"
              name="equipment"
              value={adminExerciseData.equipment}
              onChange={handleChange}
            />
          </label>
          <label>
            Target Muscle
            <input
              type="text"
              className="BMinput"
              name="targetMuscle"
              value={adminExerciseData.targetMuscle}
              onChange={handleChange}
            />
          </label>
          <label>
            Secondary Muscle
            <input
              type="text"
              name="secondaryMuscle"
              className="BMinput"
              value={adminExerciseData.secondaryMuscle}
              onChange={handleChange}
            />
          </label>
          <label>
            Instructions
            <textarea
              name="instructions"
              className="BMinput"
              value={adminExerciseData.instructions}
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
              value={adminExerciseData.video}
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
              value={adminExerciseData.image}
              onChange={handleChange}
            />
          </label>

          <label>
            Level Suggestion:
            <select
              name="level"
              className="BMinput"
              value={adminExerciseData.level}
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
          <Link to="/AdminExercisesForm" className="btn btn bg-primary">
            See all exercises
          </Link>
        </form>
      </div>
    </div>
  );
};

export default AdminAddExercises;
