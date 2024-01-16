import React from "react";
import { useState } from "react";

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
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        <h4>
          Enter your email in the form below and we'll send you instructions for
          creating a new one.
        </h4>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Send Password Reset Email</button>
      </form>
    </div>
  );
};

export default ResetPassword;
