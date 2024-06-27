import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import "./../Styles/Creation.css";
const UpdateExercises = () => {
  const { id } = useParams();
  const [exerciseData, setExerciseData] = useState({
    exerciseName: "",
    equipment: "",
    targetMuscle: "",
    secondaryMuscle: "",
    instructions: "",
    YouTubeVideo: "",
    image: null,
    level: "",
  });

  useEffect(() => {
    axios
      .get(`https://localhost:7095/api/Exercises/${id}`)
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
      formData.append("YouTubeVideo", exerciseData.YouTubeVideo);
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
      toast.success("Exercise updated successfully");
    } catch (error) {
      console.error("Error updating exercise:", error);
      toast.error("Exercise update failed");
    }
  };
  const formatExercisesText = (text) => {
    return text.replace(/<br\s*\/?>/gi, "\n");
  };

  return (
    <div>
      <div>
        <h1>Update</h1>
        <form onSubmit={handleUpdate} className="Creation-form">
          <label className="Creation">
            Exercise Name
            <input
              type="text"
              className="Input"
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
          <label className="Creation">
            The Equipment
            <input
              type="text"
              className="Input"
              name="equipment"
              value={exerciseData.equipment}
              onChange={(e) =>
                setExerciseData({ ...exerciseData, equipment: e.target.value })
              }
            />
          </label>
          <label className="Creation">
            Target Muscle
            <input
              type="text"
              className="Input"
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
          <label className="Creation">
            Secondary Muscle
            <input
              type="text"
              className="Input"
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
          <label className="Creation">
            Instructions
            <textarea
              name="instructions"
              className="Textarea"
              value={formatExercisesText(exerciseData.instructions)}
              onChange={(e) =>
                setExerciseData({
                  ...exerciseData,
                  instructions: e.target.value,
                })
              }
            />
          </label>
          <label className="Creation">
            {" "}
            YouTube Video Link (Optional):
            <input
              type="text"
              className="Input"
              name="videoLink"
              value={exerciseData.YouTubeVideo}
              onChange={(e) =>
                setExerciseData({
                  ...exerciseData,
                  YouTubeVideo: e.target.value,
                })
              }
            />
          </label>
          <label className="Creation">
            Upload Image or GIF:
            <input
              type="file"
              className="InputFile"
              name="image"
              accept="image/*,image/gif"
              onChange={(e) => handleFileChange(e, "image")}
            />
          </label>

          <label className="Creation">
            Level Suggestion:
            <select
              name="level"
              className="Input"
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
          <button type="submit" className="AdminButton">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};
export default UpdateExercises;
