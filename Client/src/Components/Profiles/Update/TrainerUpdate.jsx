import React, { useEffect, useState } from "react";
import axios from "axios";
import { BiImageAdd } from "react-icons/bi";
import { toast } from "react-hot-toast";

const TrainerUpdate = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const TrainerId = storedUser.userId;
  const [values, setValues] = useState({
    userName: "",
    age: "",
    experience: "",
    specialization: "",
  });
  useEffect(() => {
    axios
      .get(`https://localhost:7095/api/Users/GetUser/${TrainerId}`)
      .then((res) => {
        setValues(res.data);
        console.log("Fetched Trainer Data:", res.data);
      })
      .catch((error) => console.error("Error fetching trainer:", error));
  }, [TrainerId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("UserName", values.userName);
      formData.append("Age", values.age);
      formData.append("Experience", values.experience);
      formData.append("Specialization", values.specialization);
      //formData.append("ProfileImage", values.photo);
      console.log("Form Data:", formData);
      const response = await axios.put(
        `https://localhost:7095/api/Users/UpdateTrainerProfile/${TrainerId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      //toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating exercise:", error);
      //toast.error("Profile update failed");
    }
  };
  const handleFileChange = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("photo", e.target.files[0]);
      const response = await axios.put(
        `https://localhost:7095/api/Users/UpdateProfilePic/${TrainerId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      toast.success("Image updated successfully");
    } catch (error) {
      console.error("Error updating exercise:", error);
      toast.error("Image update failed");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="edit-trainerInfo">
        <label>
          Name
          <input
            type="text"
            name="UserName"
            className="Input"
            value={values.userName}
            onChange={(e) => {
              setValues({ ...values, userName: e.target.value });
              console.log("Updated UserName:", e.target.value);
            }}
          />
        </label>

        <label>
          Age
          <input
            type="text"
            name="Age"
            className="Input"
            value={values.age}
            onChange={(e) => {
              setValues({ ...values, age: e.target.value });
              console.log("Updated Age:", e.target.value);
            }}
          />
        </label>
        <label>
          Years of exp
          <input
            type="text"
            name="Experience"
            className="Input"
            value={values.experience}
            onChange={(e) => {
              setValues({ ...values, experience: e.target.value });
              console.log("Updated Experience:", e.target.value);
            }}
          />
        </label>
        <label>
          Specialization
          <input
            type="text"
            name="Specialization"
            className="Input"
            value={values.specialization}
            onChange={(e) => {
              setValues({ ...values, specialization: e.target.value });
              console.log("Updated Specialization:", e.target.value);
            }}
          />
        </label>
        <label htmlFor="profileImageInput" className="t-fileInputLabel">
          Profile Image <BiImageAdd className="t-fileInputIcon" />
          <input
            id="profileImageInput"
            className="t-fileInput"
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "photo")}
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default TrainerUpdate;
