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
      const response = await axios.put(
        `http://localhost:4200/exercises/${id}`,
        exerciseData
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error updating exercise:", error);
    }
  };

  return (
    <div className="app">
      <div className="BMcontainer">
        <h1 className="BMtitle">Update</h1>
        <form onSubmit={handleUpdate}>
          <label>
            Exercise Name
            <input
              type="text"
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
              className="BMinput"
              name="secondaryMuscle"
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
          <button type="submit" className="btn btn-primary BMsubBtn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default UpdateExercises;
