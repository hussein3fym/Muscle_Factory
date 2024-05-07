import React from "react";
import { useState, useEffect, useRef } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
// import RegisterImage from "./../../Assets/image-bg-FAU.png";

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [formData, setFormData] = useState({
    UserName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordShown, setPasswordShown] = useState(false); // State to toggle password visibility
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false); // State for confirm password visibility
  const [success, setSuccess] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown((passwordShown) => !passwordShown);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordShown((confirmPasswordShown) => !confirmPasswordShown);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Data to Send:", formData);

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("UserName", formData.UserName);
      formDataToSend.append("Password", formData.password);
      formDataToSend.append("Email", formData.email);
      console.log("Form Data to Send:", formDataToSend);
      const response = await axios.post(
        "https://localhost:7095/api/Authentication?role=User",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("user Registered successfully:", response.data);
      toast.success(
        `Please confirm your email before login. Confirmation email sent to ${formData.email}`
      );
      setSuccess(true);
    } catch (error) {
      console.error("Error Registering user:", error);
      toast.error("user registeration failed");
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
  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  useEffect(() => {
    // Implement the logic for user validation
  }, [formData.UserName]);

  useEffect(() => {
    // Implement the logic for password validation
  }, [formData.password, formData.confirmPassword]);

  useEffect(() => {
    // Implement the logic for clearing error messages
  }, [formData.UserName, formData.password, formData.confirmPassword]);
  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <Link to="/Login">Sign In</Link>
          </p>
        </section>
      ) : (
        <div className="login-container">
          <form onSubmit={handleSubmit} className="loginForm">
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
                type={passwordShown ? "text" : "password"}
                name="password"
                required
                className="login-input"
                value={formData.password}
                onChange={handleChange}
              />
              <i onClick={togglePasswordVisiblity}>
                {passwordShown ? <FiEye /> : <FiEyeOff />}
              </i>
            </label>
            <br />

            <label className="login-label">
              Confirm Password:
              <input
                type={confirmPasswordShown ? "text" : "password"}
                name="confirmPassword"
                required
                className="login-input"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <i onClick={toggleConfirmPasswordVisibility}>
                {confirmPasswordShown ? <FiEye /> : <FiEyeOff />}
              </i>
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
              <Link to="/TrainerRegistration">
                <button className="trainer-login">I am Trainer</button>
              </Link>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Register;
