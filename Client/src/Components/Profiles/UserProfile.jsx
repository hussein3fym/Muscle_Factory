import React, { useState, useEffect } from "react";
import { FaEdit, FaRegSave } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";
import axios from "axios";
import { BiShow, BiHide } from "react-icons/bi";
import UserImg from "./../../Assets/icons/dashboardicon.jpeg";
import { useParams } from "react-router-dom";
import "./U-profile.css";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const { id } = useParams();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  useEffect(() => {
    axios
      .get("https://localhost:7095/api/Users/GetUser/" + id)
      .then((res) => {
        setProfileData(res.data);
        setValues({
          ...values,
          username: res.data.username,
          email: res.data.email,
          password: res.data.password,
          confirmPassword: res.data.confirmPassword,
          profileImage: res.data.profileImage,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    axios
      .put("https://localhost:7095/api/Users/GetUser/" + id, values)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="p-body">
      <div className="userProfile">
        <div className="profile">
          <h1>Account Setting</h1>
          <p>Here you can view and edit your profile.</p>
          {profileData && (
            <div className="profileInfo">
              <img src={UserImg} alt="Profile" />
              <div className="username">
                <h3>{profileData.username}</h3>
                <h3> {profileData.email}</h3>
              </div>
            </div>
          )}

          {isEditing ? (
            <div className="editing">
              <form onSubmit={handleSave}>
                <label>Username</label>
                <input
                  type="text"
                  value={values.username}
                  onChange={(e) =>
                    setValues({ ...values, username: e.target.value })
                  }
                />
                <label>Password</label>
                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={(e) =>
                      setValues({ ...values, password: e.target.value })
                    }
                  />
                  <label htmlFor="togglePassword" className="password-toggle">
                    {showPassword ? (
                      <BiHide onClick={togglePasswordVisibility} />
                    ) : (
                      <BiShow onClick={togglePasswordVisibility} />
                    )}
                  </label>
                </div>

                <label htmlFor="profileImageInput" className="fileInputLabel">
                  Profile Image <BiImageAdd className="fileInputIcon" />
                </label>
                <input
                  id="profileImageInput"
                  className="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setValues({
                      ...values,
                      profileImage: e.target.files[0] || null,
                    })
                  }
                />
                {/* <label>Age:</label>
                <input type="number" id="age" name="age" min="1" />

                <label htmlFor="gender">Gender: </label>
                <select id="gender" name="gender">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select> */}

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
