import React, { useState } from "react";
import "./Design/Login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import congratulations from "./../Assets/icons/congratulations.png";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  UserName: yup
    .string()
    .required("Name is required")
    .min(1, "Name must be at least 1 letter")
    .max(30, "Name must be at most 30 letters"),
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
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const Register = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown((passwordShown) => !passwordShown);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordShown((confirmPasswordShown) => !confirmPasswordShown);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [success, setSuccess] = useState(false);

  const onSubmit = async (formData) => {
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

  return (
    <>
      {success ? (
        <section className="after-signUp">
          <img className="verifyImg" src={congratulations} alt="Auth" />
          <h1>
            Congratulations you are with us now!
            <br /> Check your email to verify your account.
          </h1>
          <p className="verify-button">
            <Link to="/Login">Sign In now</Link>
          </p>
        </section>
      ) : (
        <div className="login-container">
          <form onSubmit={handleSubmit(onSubmit)} className="loginForm">
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
                className="login-input"
                {...register("UserName")}
              />
              {errors.UserName && (
                <h3 style={{ color: "red" }}>{errors.UserName.message}</h3>
              )}
            </label>
            <br />

            <label className="login-label">
              Email:
              <input
                type="email"
                className="login-input"
                {...register("email")}
              />
              {errors.email && (
                <h3 style={{ color: "red" }}>{errors.email.message}</h3>
              )}
            </label>
            <br />

            <label className="login-label">
              Password:
              <div className="input-with-icon">
                <input
                  type={passwordShown ? "text" : "password"}
                  className="login-input"
                  {...register("password")}
                />
                <i onClick={togglePasswordVisiblity}>
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
            <br />

            <label className="login-label">
              Confirm Password:
              <div className="input-with-icon">
                <input
                  type={confirmPasswordShown ? "text" : "password"}
                  className="login-input"
                  {...register("confirmPassword")}
                />
                <i onClick={toggleConfirmPasswordVisibility}>
                  {confirmPasswordShown ? (
                    <FiEye className="loginIcon" />
                  ) : (
                    <FiEyeOff className="loginIcon" />
                  )}
                </i>
              </div>
              {errors.confirmPassword && (
                <h3 style={{ color: "red" }}>
                  {errors.confirmPassword.message}
                </h3>
              )}
            </label>
            <br />

            <button type="submit" className="login-button">
              Create Account
            </button>
            {success && (
              <p>
                Registration successful! Please check your email to confirm.
              </p>
            )}

            <h4>or</h4>

            <div className="login-alter">
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
