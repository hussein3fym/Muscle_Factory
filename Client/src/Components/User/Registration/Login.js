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
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <h1>Don't have an account? Register </h1>
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
        <Link to="/ResetPassword">
          <button>Forget Password</button>
        </Link>
        <br />

        <button type="submit">Log in</button>
        <hr />
        <h4>Or</h4>
        <button onClick={handleGoogleLogin}>Google</button>
        <button onClick={handleFacebookLogin}>Facebook</button>
      </form>
    </div>
  );
};

export default Login;
