import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateExercises = () => {
  const { id } = useParams();
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

  useEffect(() => {
    axios
      .get(`http://localhost:4200/exercises/${id}`)
      .then((res) => setExerciseData(res.data))
      .catch((error) => console.error("Error fetching exercise:", error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExerciseData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("exerciseName", exerciseData.exerciseName);
      formData.append("equipment", exerciseData.equipment);
      formData.append("targetMuscle", exerciseData.targetMuscle);
      formData.append("secondaryMuscle", exerciseData.secondaryMuscle);
      formData.append("instructions", exerciseData.instructions);
      formData.append("level", exerciseData.level);

      // Append the video file if it exists
      if (exerciseData.video instanceof File) {
        formData.append("video", exerciseData.video);
      }

      // Append the image file if it exists
      if (exerciseData.image instanceof File) {
        formData.append("image", exerciseData.image);
      }

      // Send the updated exercise data to the server
      const response = await axios.put(
        `http://localhost:4200/exercises/${id}`,
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error updating exercise:", error);
    }
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1 style={{ color: "red" }}>Update Exercises</h1>
        <form onSubmit={handleUpdate}>
          <label style={{ color: "black" }}>
            Exercise Name
            <input
              type="text"
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
              value={exerciseData.targetMuscle}
              onChange={handleChange}
            />
          </label>
          <label style={{ color: "black" }}>
            Secondary Muscle
            <input
              type="text"
              name="secondaryMuscle"
              value={exerciseData.secondaryMuscle}
              onChange={handleChange}
            />
          </label>
          <label style={{ color: "black" }}>
            Instructions
            <textarea
              name="instructions"
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
              onChange={handleChange}
            />
          </label>

          <label style={{ color: "black" }}>
            Upload Image or GIF:
            <input
              type="file"
              name="image"
              accept="image/*,image/gif"
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
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};
export default UpdateExercises;
