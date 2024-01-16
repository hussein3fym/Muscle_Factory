import React from "react";
import { useState } from "react";
import "./Login.css";
// import RegisterImage from "./../../Assets/image-bg-FAU.png";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form Data Submitted:", formData);

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Here you can perform actions like sending the registration data to your backend
    alert("Registration successful!");
  };

  const handleGoogleLogin = () => {
    // For educational purposes, you can alert that Google login would be implemented with a backend.
    alert("Google login would be implemented with a backend.");
  };

  const handleFacebookLogin = () => {
    // For educational purposes, you can alert that Facebook login would be implemented with a backend.
    alert("Facebook login would be implemented with a backend.");
  };

  return (
    <div>
      {/* <img
        src={RegisterImage}
        alt="Fitness & Health"
        className="Register-img"
      /> */}
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <h1>Already have an account? Log In </h1>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </label>
        <br />

        <button type="submit">Create Account</button>
        <hr />
        <h4>Or</h4>
        <button onClick={handleGoogleLogin}>Google</button>
        <button onClick={handleFacebookLogin}>Facebook</button>
      </form>
    </div>
  );
};

export default Register;
