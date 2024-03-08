import React from "react";
import "./Login.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you can perform actions like sending the login data to your backend
    console.log("Login successful!", formData);
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
      <form onSubmit={handleSubmit} className="loginForm">
        <h2 className="login-title">Login</h2>
        <h4>
          Don't have an account ?
          <Link to="/Register" className="Link-register">
            Register
          </Link>
        </h4>
        <label className="login-label">
          Email:
          <input
            type="email"
            name="email"
            required
            className="login-input input"
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
            className="login-input input"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <div className="forget-password">
          <Link to="/ResetPassword" className="Link-Login">
            Forget Password?
          </Link>
        </div>
        <button type="submit" className="login-button">
          Log in
        </button>
        <h4>or</h4>
        <div className="login-alter">
          <button onClick={handleGoogleLogin} className="google-login">
            Google
          </button>
          <button onClick={handleFacebookLogin} className="facebook-login">
            Facebook
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
