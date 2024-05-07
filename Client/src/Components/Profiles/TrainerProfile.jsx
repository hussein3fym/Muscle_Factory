import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./T-profile.css";
import { BiImageAdd } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";

const TrainerProfile = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams(); // Assuming 'id' is used somehow or should be TrainerId
  const [trainer, setTrainer] = useState({});
  const [values, setValues] = useState({
    UserName: "",
    Age: "",
    Experience: "",
    Specialization: "",
    ProfileImage: null,
  });
  const [certificates, setCertificates] = useState([]);
  const [transformation, setTransformation] = useState({
    file: null,
    title: "",
    description: "",
  });

  useEffect(() => {
    axios
      .get(`https://localhost:7095/api/Users/GetUser/${storedUser.userId}`)
      .then((res) => {
        console.log("Fetched data:", res.data); // Check what's exactly being returned here
        setTrainer(res.data);
        setValues({
          UserName: res.data.userName, // Check property names: are they case-sensitive mismatches?
          Age: res.data.age,
          Experience: res.data.experience,
          Email: res.data.email,
          Specialization: res.data.specialization,
          ProfileImage: res.data.photo, // Make sure `photo` is the correct key
        });
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, [id, storedUser.userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleFileChange = (e) => {
    setValues({ ...values, ProfileImage: e.target.files[0] });
  };

  const handleCertificateChange = (e) => {
    setCertificates(Array.from(e.target.files));
  };

  const handleTransformationChange = (e) => {
    const { name, value } = e.target;
    if (name === "file") {
      setTransformation({ ...transformation, file: e.target.files[0] });
    } else {
      setTransformation({ ...transformation, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("UserName", values.UserName);
    formData.append("Email", values.Email);
    formData.append("Age", values.Age);
    formData.append("Experience", values.Experience);
    formData.append("Specialization", values.Specialization);
    formData.append("ProfileImage", values.ProfileImage);

    axios
      .put(
        `https://localhost:7095/api/Users/UpdateUser/${storedUser.userId}`,
        formData
      )
      .then((response) => {
        console.log("User updated successfully");
      })
      .catch((error) => console.error("Failed to update user:", error));
  };

  const uploadCertificates = () => {
    const formData = new FormData();
    certificates.forEach((file) => {
      formData.append("certificates", file);
    });
    axios
      .post(
        `https://localhost:7095/api/Users/UploadCertificates/${storedUser.userId}`,
        formData
      )
      .then((response) => console.log("Certificates uploaded successfully"))
      .catch((error) => console.error("Failed to upload certificates:", error));
  };

  const uploadTransformation = () => {
    const formData = new FormData();
    formData.append("file", transformation.file);
    formData.append("title", transformation.title);
    formData.append("description", transformation.description);

    axios
      .post(
        `https://localhost:7095/api/Users/UploadTransformation/${storedUser.userId}`,
        formData
      )
      .then((response) => console.log("Transformation uploaded successfully"))
      .catch((error) =>
        console.error("Failed to upload transformation:", error)
      );
  };

  return (
    <div>
      <div className="T-profileContent">
        <div className="Static-info">
          <div>
            <img
              src={`data:image/jpg;base64,${values.ProfileImage}`}
              alt="trainer"
              id="trainerImg"
            />
            <button className="edit-info">
              <FaEdit className="icon" />
              Edit
            </button>
          </div>
          <div className="t-info">
            <h2>{values.UserName}</h2>
            <h2>{values.Email}</h2>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="edit-trainerInfo">
          <label>
            Name
            <input
              type="text"
              name="UserName"
              value={values.UserName}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Age
            <input
              type="text"
              name="Age"
              value={values.Age}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Years of exp
            <input
              type="text"
              name="Experience"
              value={values.Experience}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Specialization
            <input
              type="text"
              name="Specialization"
              value={values.Specialization}
              onChange={handleInputChange}
            />
          </label>
          <label htmlFor="profileImageInput" className="t-fileInputLabel">
            Profile Image <BiImageAdd className="t-fileInputIcon" />
            <input
              id="profileImageInput"
              className="t-fileInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
          <button type="submit">Save</button>
        </form>

        <div className="upload">
          <div className="U-info">
            <label>
              <h2>Upload Certificates</h2>
              <input type="file" multiple onChange={handleCertificateChange} />
              <button onClick={uploadCertificates}>Upload</button>
            </label>
            <div className="Transformations">
              <h2>Upload Transformations</h2>
              <label className="U-info">
                <input
                  type="file"
                  name="file"
                  onChange={handleTransformationChange}
                />
                <input
                  type="text"
                  name="title"
                  className="trans-title"
                  placeholder="Title"
                  value={transformation.title}
                  onChange={handleTransformationChange}
                />
              </label>
              <label>
                <textarea
                  name="description"
                  className="Type more details if there is..."
                  placeholder="Description"
                  value={transformation.description}
                  onChange={handleTransformationChange}
                />
              </label>
              <button onClick={uploadTransformation}>Upload</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerProfile;
