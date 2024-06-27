import React, { useState } from "react";
import "./Design/Login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import useAuth from "./../Hooks/useAuth";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,30}$/,
      "Password must include one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .max(30, "Password must be at most 30 characters"),
});

const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [passwordShown, setPasswordShown] = useState(false); // State to toggle password visibility

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData) => {
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
      } else if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        if (errors.Email) {
          toast.error(`Email error: ${errors.Email}`);
        }
        if (errors.Password) {
          toast.error(`Password error: ${errors.Password}`);
        }
        if (errors.Verification) {
          toast.error(`Verification error: ${errors.Verification}`);
        }
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
      <form onSubmit={handleSubmit(onSubmit)} className="loginForm">
        <h2 className="login-title">Login</h2>
        <h4>
          Don't have an account?{" "}
          <Link to="/Register" className="Link-register">
            Register
          </Link>
        </h4>
        <label className="login-label">
          Email:
          <input
            type="email"
            className="login-input input"
            {...register("email")}
          />
          {errors.email && (
            <h3 style={{ color: "red" }}>{errors.email.message}</h3>
          )}
        </label>
        <br />

        <label className="login-label">
          Password:{" "}
          <div className="input-with-icon">
            <input
              type={passwordShown ? "text" : "password"}
              className="login-input input"
              {...register("password")}
            />

            <i onClick={togglePasswordVisibility}>
              {passwordShown ? (
                <FiEye className="loginIcon" />
              ) : (
                <FiEyeOff className="loginIcon" />
              )}
            </i>
          </div>
          {errors.password && (
            <h3 style={{ color: "red" }}>{errors.password.message}</h3>
          )}
        </label>
        <button type="submit" className="login-button">
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;
