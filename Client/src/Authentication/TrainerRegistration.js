import React, { useState } from "react";
import "./Design/TrainerLogin.css";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import congratulations from "./../Assets/icons/congratulations.png";

const TrainerLogin = () => {
  const [passwordShown, setPasswordShown] = useState(false); // State to toggle password visibility
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false); // State for confirm password visibility
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    UserName: "",
    email: "",
    password: "",
    Age: "",
    experience: "",
    specialization: "",
    gender: "",
  });
  const togglePasswordVisiblity = () => {
    setPasswordShown((passwordShown) => !passwordShown);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordShown((confirmPasswordShown) => !confirmPasswordShown);
  };
  const handleCVFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, cvFile: file }));
  };
  const handleChange = (e) => {
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
      formDataToSend.append("cvFile", formData.cvFile);

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
      /*toast.success(
        `Please confirm your email before login. Confirmation email sent to ${formData.email}`
      );*/
      setSuccess(true);
    } catch (error) {
      console.error("Error Registering trainer:", error);
      toast.error("trainer registeration failed");
    }
  };

  return (
    <>
      {success ? (
        <section className="after-signUp">
          <img className="verifyImg" src={congratulations} alt="Auth" />
          <h1>
            Congratulations wait till your acceptance
            <br /> Check your email to get acceptance email.
          </h1>
          <p className="verify-button">
            <Link to="/Login">Sign In now</Link>
          </p>
        </section>
      ) : (
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

            <label className="login-label">
              CV File:
              <input
                type="file"
                name="cvFile"
                className="login-input"
                onChange={handleCVFileChange}
              />
            </label>

            <button type="submit" className="login-button">
              Submit
            </button>
            <div className="linklogin">
              <Link to="/Login">I Already have an account</Link>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default TrainerLogin;