import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminAddExercises = () => {
  const [adminExercise, setAdminExercise] = useState({
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
    setAdminExercise((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", adminExercise);
  };
  return (
    <div className="app">
      <div className="BMcontainer">
        <h1 className="BMtitle">Welcome Admin Add your Exercises</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Exercise Name
            <input
              type="text "
              className="BMinput"
              name="exerciseName"
              value={adminExercise.exerciseName}
              onChange={handleChange}
            />
          </label>
          <label>
            The Equipment
            <input
              type="text"
              className="BMinput"
              name="equipment"
              value={adminExercise.equipment}
              onChange={handleChange}
            />
          </label>
          <label>
            Target Muscle
            <input
              type="text"
              className="BMinput"
              name="targetMuscle"
              value={adminExercise.targetMuscle}
              onChange={handleChange}
            />
          </label>
          <label>
            Secondary Muscle
            <input
              type="text"
              name="secondaryMuscle"
              className="BMinput"
              value={adminExercise.secondaryMuscle}
              onChange={handleChange}
            />
          </label>
          <label>
            Instructions
            <textarea
              name="instructions"
              className="BMinput"
              value={adminExercise.instructions}
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
              value={adminExercise.video}
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
              value={adminExercise.image}
              onChange={handleChange}
            />
          </label>

          <label>
            Level Suggestion:
            <select
              name="level"
              className="BMinput"
              value={adminExercise.level}
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
