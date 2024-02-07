import React, { useState } from "react";
import "./TrainerLogin.css"; // Import the CSS file
import { Link } from "react-router-dom";

const TrainerLogin = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    Age: "",
    experience: "",
    specialization: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here, for example, logging the form data
    console.log("Form submitted:", formData);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title">I am a Trainer </h2>
        <label className="login-label">
          Name :
          <input
            type="text"
            name="name"
            required
            className="login-input"
            value={formData.name}
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
          Gender:
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
        <br />

        <button type="submit" className="login-button">
          Submit
        </button>
        <Link to="/TrainerLogin" className="btn btn-light">
          Login
        </Link>
      </form>
    </div>
  );
};

export default TrainerLogin;
