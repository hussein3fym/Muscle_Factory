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
      .get(`https://localhost:7124/api/Exercises/${id}`)
      .then((res) => setExerciseData(res.data))
      .catch((error) => console.error("Error fetching exercise:", error));
  }, [id]);

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    setExerciseData((prevData) => ({
      ...prevData,
      [fileType]: file,
    }));
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
      formData.append("video", exerciseData.video);
      formData.append("image", exerciseData.image);
      const response = await axios.put(
        `https://localhost:7095/api/Exercises/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
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
              onChange={(e) =>
                setExerciseData({
                  ...exerciseData,
                  exerciseName: e.target.value,
                })
              }
            />
          </label>
          <label>
            The Equipment
            <input
              type="text"
              className="BMinput"
              name="equipment"
              value={exerciseData.equipment}
              onChange={(e) =>
                setExerciseData({ ...exerciseData, equipment: e.target.value })
              }
            />
          </label>
          <label>
            Target Muscle
            <input
              type="text"
              className="BMinput"
              name="targetMuscle"
              value={exerciseData.targetMuscle}
              onChange={(e) =>
                setExerciseData({
                  ...exerciseData,
                  targetMuscle: e.target.value,
                })
              }
            />
          </label>
          <label>
            Secondary Muscle
            <input
              type="text"
              className="BMinput"
              name="secondaryMuscle"
              value={exerciseData.secondaryMuscle}
              onChange={(e) =>
                setExerciseData({
                  ...exerciseData,
                  secondaryMuscle: e.target.value,
                })
              }
            />
          </label>
          <label>
            Instructions
            <textarea
              name="instructions"
              className="BMinput"
              value={exerciseData.instructions}
              onChange={(e) =>
                setExerciseData({
                  ...exerciseData,
                  instructions: e.target.value,
                })
              }
            />
          </label>
          <label>
            Upload Video:
            <input
              type="file"
              className="BMinput"
              name="video"
              accept="video/*"
              onChange={(e) => handleFileChange(e, "video")}
            />
          </label>

          <label>
            Upload Image or GIF:
            <input
              type="file"
              className="BMinput"
              name="image"
              accept="image/*,image/gif"
              onChange={(e) => handleFileChange(e, "image")}
            />
          </label>

          <label>
            Level Suggestion:
            <select
              name="level"
              className="BMinput"
              value={exerciseData.level}
              onChange={(e) =>
                setExerciseData({ ...exerciseData, level: e.target.value })
              }
            >
              <option value="" disabled>
                Select Level
              </option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </label>
          <button type="submit" className="btn btn-primary ">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default UpdateExercises;
