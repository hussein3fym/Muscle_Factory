import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import "./../AdminBlogs/AdminCreation.css";

const AdminUpdateExercises = () => {
  const { id } = useParams();
  const [adminExerciseData, setAdminExerciseData] = useState({
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
      .then((res) => setAdminExerciseData(res.data))
      .catch((error) => console.error("Error fetching exercise:", error));
  }, [id]);
  const handleFileChange = (e) => {
    const { name, value, files } = e.target;
    setAdminExerciseData((prevData) => ({
      ...prevData,
      [name]: files && files.length > 0 ? files[0] : value,
    }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("exerciseName", adminExerciseData.exerciseName);
      formData.append("equipment", adminExerciseData.equipment);
      formData.append("targetMuscle", adminExerciseData.targetMuscle);
      formData.append("secondaryMuscle", adminExerciseData.secondaryMuscle);
      formData.append("instructions", adminExerciseData.instructions);
      formData.append("level", adminExerciseData.level);
      formData.append("image", adminExerciseData.image);
      formData.append("YouTubeVideo", adminExerciseData.YouTubeVideo);
      const response = await axios.put(
        `https://localhost:7095/api/Exercises/${id}`,
        formData /*adminExerciseData,*/,
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
        <h1 className="Users">Update</h1>
        <form onSubmit={handleUpdate} className="Creation-form">
          <label className="Creation">
            Exercise Name
            <input
              type="text"
              className="Input"
              name="exerciseName"
              value={adminExerciseData.exerciseName}
              onChange={(e) =>
                setAdminExerciseData({
                  ...adminExerciseData,
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
              value={adminExerciseData.equipment}
              onChange={(e) =>
                setAdminExerciseData({
                  ...adminExerciseData,
                  equipment: e.target.value,
                })
              }
            />
          </label>
          <label className="Creation">
            Target Muscle
            <input
              type="text"
              className="Input"
              name="targetMuscle"
              value={adminExerciseData.targetMuscle}
              onChange={(e) =>
                setAdminExerciseData({
                  ...adminExerciseData,
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
              value={adminExerciseData.secondaryMuscle}
              onChange={(e) =>
                setAdminExerciseData({
                  ...adminExerciseData,
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
              value={adminExerciseData.instructions}
              onChange={(e) =>
                setAdminExerciseData(
                  formatExercisesText({
                    ...adminExerciseData,
                    instructions: e.target.value,
                  })
                )
              }
            />
          </label>
          <label className="Creation">
            YouTube Video Link (Optional):
            <input
              type="text"
              className="Input"
              name="YouTubeVideo"
              value={adminExerciseData.YouTubeVideo}
              onChange={(e) =>
                setAdminExerciseData({
                  ...adminExerciseData,
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
              onChange={handleFileChange}
            />
          </label>

          <label className="Creation">
            Level Suggestion:
            <select
              name="level"
              className="Input"
              value={adminExerciseData.level}
              onChange={(e) =>
                setAdminExerciseData({
                  ...adminExerciseData,
                  level: e.target.value,
                })
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

export default AdminUpdateExercises;
