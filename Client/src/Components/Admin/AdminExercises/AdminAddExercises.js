import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./../AdminBlogs/AdminCreation.css";

const AdminAddExercises = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const AdminId = storedUser.userId;
  console.log(AdminId);
  const [adminExerciseData, setAdminExerciseData] = useState({
    exerciseName: "",
    equipment: "",
    targetMuscle: "",
    secondaryMuscle: "",
    instructions: "",
    YouTubeVideo: "",
    //video: null,
    image: null,
    level: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "video" || name === "image") {
      setAdminExerciseData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setAdminExerciseData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("UserId", AdminId);
      formData.append("exerciseName", adminExerciseData.exerciseName);
      formData.append("equipment", adminExerciseData.equipment);
      formData.append("targetMuscle", adminExerciseData.targetMuscle);
      formData.append("secondaryMuscle", adminExerciseData.secondaryMuscle);
      formData.append("instructions", adminExerciseData.instructions);
      formData.append("level", adminExerciseData.level);
      formData.append("video", adminExerciseData.video);
      formData.append("image", adminExerciseData.image);
      formData.append("YouTubeVideo", adminExerciseData.YouTubeVideo);

      const response = await axios.post(
        "https://localhost:7095/api/Exercises/CreateByAdminOrTrainer ",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Form submitted:", response.data);
      toast.success("Exercise created successfully");
    } catch (error) {
      console.log("Error in submitting form:", error);
      toast.error("Failed to create exercise");
    }
  };

  return (
    <div>
      <div>
        <h1 className="Users">Welcome Admin Add your Exercises</h1>
        <form onSubmit={handleSubmit} className="Creation-form">
          <label className="Creation">
            Exercise Name
            <input
              type="text "
              required
              className="Input"
              name="exerciseName"
              onChange={handleChange}
            />
          </label>

          <label className="Creation">
            The Equipment
            <input
              type="text"
              className="Input"
              name="equipment"
              onChange={handleChange}
            />
          </label>
          <label className="Creation">
            Target Muscle
            <input
              type="text"
              className="Input"
              name="targetMuscle"
              onChange={handleChange}
            />
          </label>
          <label className="Creation">
            Secondary Muscle
            <input
              type="text"
              className="Input"
              name="secondaryMuscle"
              onChange={handleChange}
            />
          </label>
          <label className="Creation">
            Instructions
            <textarea
              name="instructions"
              className="Textarea"
              onChange={handleChange}
            />
          </label>
          <label className="Creation">
            YouTube Video Link (Optional):
            <input
              type="text"
              className="Input"
              name="YouTubeVideo"
              placeholder="https://www.youtube.com/watch?v=..."
              onChange={handleChange}
            />
          </label>
          {/* <label className="Creation">
            Upload Video:
            <input
              type="file"
              className="InputFile"
              name="video"
              accept="video/*"
              onChange={handleChange}
            />
          </label> */}
          <label className="Creation">
            Upload Image or GIF:
            <input
              type="file"
              className="InputFile"
              name="image"
              accept="image/*,image/gif"
              onChange={handleChange}
            />
          </label>
          <label className="Creation">
            Level Suggestion:
            <select
              name="level"
              className="Input"
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
          <button type="submit" className="AdminButton" onClick={handleSubmit}>
            Add Exercise
          </button>
          <Link to="/AdminExercisesForm" className="AdminLink">
            See all exercises
          </Link>
        </form>
      </div>
    </div>
  );
};

export default AdminAddExercises;
