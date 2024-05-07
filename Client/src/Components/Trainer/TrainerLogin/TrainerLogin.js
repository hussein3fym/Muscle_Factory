import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";


const TrainerLogin = ({ updateUserRole , updateUserId }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("Email", formData.email);
      formDataToSend.append("Password", formData.password);
      const response = await axios.post(
        "https://localhost:7095/api/Authentication/Login",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      localStorage.setItem("user", JSON.stringify(response.data));
    
      console.log("login successfully:", response.data);
      updateUserRole(response.data.role[0]);
      updateUserId(response.data.id);

      toast.success("logged in successfully");
      if (response.data.role[0] === "Trainer") {
        navigate("/TrainerPanel");
      } 
    } catch (error) {
      console.error("Error logging in:", error);
      if (error.response && error.response.status === 401) {
        console.log("Verify your email first.");
        toast.error("Please verify your email first before logging in.");
      } else {
        console.error("Error logging in:", error);
        toast.error("Logging in failed.");
      }
    }
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
      <form onSubmit={handleSubmit} className="loginForm ">
        <h2 className="login-title">Welcome Coach</h2>
        <h4>
          Don't have an account ?
          <Link to="/TrainerRegistration" className="Link-register">
            Register
          </Link>
        </h4>
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
        <div className="forget-password">
          <Link to="/ResetTrainerPass" className="Link-Login">
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

export default TrainerLogin;
