import React from "react";
import { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

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
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title">Create an Account</h2>
        <h4>
          Already have an account ?
          <Link to="/Login" className="Link-register">
            Log In
          </Link>
        </h4>
        <label className="login-label">
          Name:
          <input
            type="text"
            name="username"
            required
            className="login-input"
            value={formData.username}
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
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            required
            className="login-input"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </label>
        <br />

        <button type="submit" className="login-button">
          Create Account
        </button>
        <h4>or</h4>

        <div className="login-alter">
          <button onClick={handleGoogleLogin} className="google-login">
            Google
          </button>
          <button onClick={handleFacebookLogin} className="facebook-login">
            Facebook
          </button>
          <Link to="/TrainerLogin">
            <button className="trainer-login">I am Trainer</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
