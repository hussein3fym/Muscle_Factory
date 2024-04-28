import React, { useState } from "react";
import "./T-profile.css";
import Trainer from "./../../Assets/icons/dashboardicon.jpeg";
import { BiImageAdd } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { BiShow, BiHide } from "react-icons/bi";

const TrainerProfile = () => {
  /*const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
*/
  /*const isPdfFile = (file) => {
    return file && file.type === "application/pdf";
  };*/
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      <div className="T-profileContent">
        <div className="Static-info">
          <div>
            <img src={Trainer} alt="Trainer" />{" "}
            <button class="edit-info">
              <FaEdit className="icon" />
              Edit
            </button>
          </div>
          <div className="t-info">
            <h2>Hussein Hassan</h2>
            <h2>hussein@gmail.com</h2>
          </div>
        </div>
        <div className="edit-trainerInfo">
          <label>
            Name
            <input type="text" />
          </label>
          <label className="password-input">
            Password
            <input type={showPassword ? "text" : "password"} />
            {showPassword ? (
              <BiHide
                onClick={togglePasswordVisibility}
                className="password-icon"
              />
            ) : (
              <BiShow
                onClick={togglePasswordVisibility}
                className="password-icon"
              />
            )}
          </label>

          <label>
            Age
            <input type="text" />
          </label>
          <label>
            Years of exp
            <input type="text" />
          </label>
          <label>
            Specialization
            <input type="text" />
          </label>
          <label htmlFor="profileImageInput" className="t-fileInputLabel">
            Profile Image <BiImageAdd className="t-fileInputIcon" />
          </label>
          <input
            id="profileImageInput"
            className="t-fileInput"
            type="file"
            accept="image/*"
          />
          <div>
            <button>Save</button>
          </div>
        </div>

        <div className="upload">
          <div className="U-info">
            <label>
              <h2>Upload Certificates</h2>
              <input type="file" />
              <button>Upload</button>
            </label>
            {/* <label>
              <h2>Upload CV</h2>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
              />
              <button>Upload</button>
              {selectedFile && !isPdfFile(selectedFile) && (
                <p className="pdf-error">Only PDF files are allowed.</p>
              )}
            </label> */}
            <div className="Transformations">
              <h2>Upload Transformations</h2>
              <label className="U-info">
                <input type="file" />
                <input
                  type="text"
                  className=" trans-title"
                  placeholder="Title"
                />
              </label>
              <label>
                <textarea
                  className="Type more details if there is..."
                  placeholder="Topic"
                />
              </label>
              <button>Upload</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerProfile;
