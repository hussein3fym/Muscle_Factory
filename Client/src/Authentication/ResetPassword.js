import React from "react";
import { useState } from "react";
import "./Design/Login.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you can implement the logic to send a password reset email
    // For simplicity, let's just log the email to the console in this example
    console.log("Email submitted for password reset:", email);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="loginForm">
        <h2 className="login-title">Reset Password</h2>
        <h4>
          Enter your email in the form below and we'll send you instructions for
          creating a new one.
        </h4>
        <label className="login-label">
          Email:
          <input
            type="email"
            name="email"
            className="login-input"
            value={email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit" className="login-button">
          Send Password Reset Email
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
