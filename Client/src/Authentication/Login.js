import React, { useState } from "react";
import "./Design/Login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import useAuth from "./../Hooks/useAuth";

const Login = () => {
  const { setAuth } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [passwordShown, setPasswordShown] = useState(false); // State to toggle password visibility

  const togglePasswordVisiblity = () => {
    setPasswordShown((passwordShown) => !passwordShown);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

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

      const token = response?.data?.token;
      const roles = response?.data?.role;
      setAuth({ user: formData.email, roles, token }); // Set authentication data

      localStorage.setItem("user", JSON.stringify(response.data));

      toast.success("Logged in successfully");

      // Redirect based on user role
      switch (response.data.role[0]) {
        case "User":
          navigate("/");
          break;
        case "Admin":
          navigate("/Dashboard");
          break;
        case "Trainer":
          navigate("/TrainerPanel");
          break;
        default:
          navigate("/"); // Default redirection
      }
    } catch (error) {
      console.error("Error logging in:", error);
      if (error.response?.status === 401) {
        toast.error("Please verify your email first before logging in.");
      } else {
        toast.error("Logging in failed.");
      }
    }
  };

  const handleGoogleLogin = () => {
    alert("Google login would be implemented with a backend.");
  };

  const handleFacebookLogin = () => {
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
          Password:{" "}
          <div className="input-with-icon">
            <input
              type={passwordShown ? "text" : "password"}
              name="password"
              required
              className="login-input input"
              value={formData.password}
              onChange={handleChange}
            />{" "}
            <i onClick={togglePasswordVisiblity}>
              {passwordShown ? (
                <FiEye className="loginIcon" />
              ) : (
                <FiEyeOff className="loginIcon" />
              )}
            </i>
          </div>
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
