import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ExercisesForm.css";
import axios from "axios";

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
  /*const handleChange = (e) => {
    const { name, value } = e.target;
    setExerciseData((prevData) => ({ ...prevData, [name]: value }));
  };*/
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "video" || name === "image") {
      setExerciseData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setExerciseData((prevData) => ({ ...prevData, [name]: value }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("trainerid", exerciseData.trainerid);
    formData.append("exerciseName", exerciseData.exerciseName);
    formData.append("equipment", exerciseData.equipment);
    formData.append("targetMuscle", exerciseData.targetMuscle);
    formData.append("secondaryMuscle", exerciseData.secondaryMuscle);
    formData.append("instructions", exerciseData.instructions);
    formData.append("level", exerciseData.level);
    formData.append("video", exerciseData.video);
    formData.append("image", exerciseData.image);
    axios.post(
      "https://localhost:7095/api/Exercises/CreateByTrainer",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Form submitted:", exerciseData);
  };
  return (
    <div className="app">
      <div className="BMcontainer">
        <h1 className="BMtitle">Welcome Trainer Add Exercises</h1>
        <form onSubmit={handleSubmit}>
          <label>
            ID
            <input
              //type="text "
              className="BMinput"
              name="trainerid"
              // value={adminExerciseData.UserId}
              onChange={handleChange}
            />
          </label>
          <label>
            Exercise Name
            <input
              type="text "
              className="BMinput"
              name="exerciseName"
              //value={exerciseData.exerciseName}
              onChange={handleChange}
            />
          </label>
          <label>
            The Equipment
            <input
              type="text"
              className="BMinput"
              name="equipment"
              //value={exerciseData.equipment}
              onChange={handleChange}
            />
          </label>
          <label>
            Target Muscle
            <input
              type="text"
              className="BMinput"
              name="targetMuscle"
              //value={exerciseData.targetMuscle}
              onChange={handleChange}
            />
          </label>
          <label>
            Secondary Muscle
            <input
              type="text"
              name="secondaryMuscle"
              className="BMinput"
              //value={exerciseData.secondaryMuscle}
              onChange={handleChange}
            />
          </label>
          <label>
            Instructions
            <textarea
              name="instructions"
              className="BMinput"
              //value={exerciseData.instructions}
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
              //value={exerciseData.video}
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
              // value={exerciseData.image}
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
