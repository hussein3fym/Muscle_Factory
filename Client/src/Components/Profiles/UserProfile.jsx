import React, { useState, useEffect } from "react";
import { FaEdit, FaRegSave } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import "./U-profile.css";

const UserProfile = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const UserId = storedUser.userId;

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const { id } = useParams();
  const [values, setValues] = useState({
    userName: "",
    email: "",
    age: "",
    gender: "",
    photo: null,
  });

  useEffect(() => {
    axios
      .get(`https://localhost:7095/api/Users/GetUser/${UserId}`)
      .then((res) => {
        setProfileData(res.data);
        setValues({
          ...values,
          userName: res.data.userName,
          email: res.data.email,
          age: res.data.age,
          gender: res.data.gender,
          photo: res.data.photo,
        });
      })
      .catch((err) => console.log(err));
  }, [UserId]);

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userName", values.userName);
    formData.append("age", values.age);
    formData.append("gender", values.gender);
    if (values.photo) {
      formData.append("photo", values.photo);
    }

    axios
      .put(`https://localhost:7095/api/Users/${UserId}`, formData)
      .then((res) => {
        console.log(res.data);
        setIsEditing(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleFileChange = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("photo", e.target.files[0]);
      const response = await axios.put(
        `https://localhost:7095/api/Users/UpdateProfilePic/${UserId}`,
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
  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="p-body">
      <div className="userProfile">
        <div className="profile">
          <h1>Account Setting</h1>
          <p>Here you can view and edit your profile.</p>
          {values && (
            <div className="profileInfo">
              <img
                src={`data:image/jpg;base64,${values.photo}`}
                alt="Profile"
              />
              <div className="username">
                <h3>{values.userName}</h3>
                <h3> {values.email}</h3>
                {!isEditing && (
                  <>
                    <p>Age: {values.age}</p>
                    <p>Gender: {values.gender}</p>
                  </>
                )}
              </div>
            </div>
          )}

          {isEditing ? (
            <div className="editing">
              <form onSubmit={handleSave}>
                <label>Username</label>
                <input
                  type="text"
                  value={values.userName}
                  onChange={(e) =>
                    setValues({ ...values, userName: e.target.value })
                  }
                />

                <label htmlFor="profileImageInput" className="fileInputLabel">
                  Profile Image <BiImageAdd className="fileInputIcon" />
                </label>
                <input
                  id="profileImageInput"
                  className="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "photo")}
                />

                <label>Age:</label>
                <input
                  type="number"
                  value={values.age}
                  onChange={(e) =>
                    setValues({ ...values, age: e.target.value })
                  }
                  min="1"
                />

                <label htmlFor="gender">Gender: </label>
                <select
                  className="userGender"
                  id="gender"
                  name="gender"
                  value={values.gender}
                  onChange={(e) =>
                    setValues({ ...values, gender: e.target.value })
                  }
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>

                <div>
                  <button type="submit" className="edit">
                    <FaRegSave className="editIcon" />
                    Save
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div>
              <button onClick={handleEdit} className="edit">
                <FaEdit className="editIcon" />
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
