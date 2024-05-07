import React, { useState } from "react";
import "./TrainerLogin.css"; // Import the CSS file
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";


const TrainerLogin = () => {
  const [formData, setFormData] = useState({
    UserName: "",
    email: "",
    password: "",
    Age: "",
    experience: "",
    specialization: "",
    gender: "",
    //cvFile: null,
  });

  const handleChange = (e) => {
    /*if (e.target.type === 'file') {
      // Handle file input separately
      const selectedFile = e.target.files[0];
      setFormData((prevData) => ({ ...prevData, cvFile: selectedFile }));
    } else {*/
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value })); //}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form submitted:", formData);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("UserName", formData.UserName);
      formDataToSend.append("Password", formData.password);
      formDataToSend.append("Email", formData.email);
      formDataToSend.append("Age", formData.Age);
      formDataToSend.append("Experience", formData.experience);
      formDataToSend.append("Specialization", formData.specialization);
      formDataToSend.append("Gender", formData.gender);
      //formDataToSend.append("cvFile", formData.cvFile);

      console.log("Form Data to Send:", formDataToSend);
      const response = await axios.post(
        "https://localhost:7095/api/Authentication/TrainerRegistration?role=Trainer",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
         // timeout: 10000,
        }
      );

      console.log("trainer Registered successfully:", response.data);
      //toast.success(`Please confirm your email before login. Confirmation email sent to ${formData.email}`);
    } catch (error) {
      console.error("Error Registering trainer:", error);
      toast.error("trainer registeration failed");
    }

  };


  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="loginForm">
        <h2 className="login-title">I am a Trainer </h2>
        <label className="login-label">
          Name :
          <input
            type="text"
            name="UserName"
            required
            className="login-input"
            value={formData.UserName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label className="login-label">
          Email:
          <input
            type="email"
            name="email"
            required
            className="login-input"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label className="login-label">
          Password:
          <input
            type="password"
            name="password"
            required
            className="login-input"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <label className="login-label">
          Age :
          <input
            type="text"
            name="Age"
            required
            className="login-input"
            value={formData.Age}
            onChange={handleChange}
          />
        </label>
        <br />
        <label className="login-label">
          Years of experience:
          <input
            type="text"
            name="experience"
            required
            className="login-input"
            value={formData.experience}
            onChange={handleChange}
          />
        </label>
        <label className="login-label">
          Your Specialization:
          <input
            type="text"
            name="specialization"
            required
            className="login-input"
            value={formData.specialization}
            onChange={handleChange}
          />
        </label>
        <br />
        <label className="login-label">
          Gender :
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="login-input"
          >
            <option value="" disabled>
              Select gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>

        <button type="submit" className="login-button">
          Submit
        </button>
        <div className="linklogin">
          <Link to="/TrainerLogin">I Already have an account</Link>
        </div>
      </form>
    </div>
  );
};

export default TrainerLogin;
