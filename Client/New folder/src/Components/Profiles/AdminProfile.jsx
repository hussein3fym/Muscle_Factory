import React, { useState, useEffect } from "react";
import { FaEdit, FaRegSave } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";
import axios from "axios";
import { BiShow, BiHide } from "react-icons/bi";
import UserImg from "./../../Assets/icons/dashboardicon.jpeg";
import "./A-profile.css";

const AdminProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
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
      .get(`http://localhost:3031/user`)
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
      .put(`http://localhost:3031/user`, values)
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
    <div className="A-Profile">
      <div className="a-profile">
        <h1>Account Setting</h1>
        <p>Here you can view and edit your profile.</p>
        {profileData && (
          <div className="a-profileInfo">
            <img src={UserImg} alt="Profile" />
            <div className="a-name">
              <h3>{profileData.username}</h3>
              <h3> {profileData.email}</h3>
            </div>
          </div>
        )}

        {isEditing ? (
          <div className="a-editing">
            <form onSubmit={handleSave}>
              <label>Username</label>
              <input
                type="text"
                value={values.username}
                onChange={(e) =>
                  setValues({ ...values, username: e.target.value })
                }
              />
              <label className="a-password-input">
                Password
                <input type={showPassword ? "text" : "password"} />
                {showPassword ? (
                  <BiHide
                    onClick={togglePasswordVisibility}
                    className="a-password-icon"
                  />
                ) : (
                  <BiShow
                    onClick={togglePasswordVisibility}
                    className="a-password-icon"
                  />
                )}
              </label>
              <label>Email</label>
              <input
                type="email"
                value={values.email}
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />

              <label htmlFor="profileImageInput" className="fileInputLabel">
                Profile Image <BiImageAdd className="a-fileInputIcon" />
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

              <div>
                <button type="submit" className="a-edit">
                  <FaRegSave className="a-editIcon" />
                  Save
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <button onClick={handleEdit} className="a-edit">
              <FaEdit className="a-editIcon" />
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
