import React, { useState } from "react";
import "./Design/TrainerLogin.css";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import congratulations from "./../Assets/icons/congratulations.png";

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
  Age: yup
    .number()
    .required("Age is required")
    .positive("Age must be a positive number")
    .integer("Age must be an integer")
    .min(18, "Age must be at least 18 years")
    .max(200, "Age must be at most 200 years"),
  experience: yup
    .number()
    .required("Experience is required")
    .positive("Experience must be a positive number")
    .integer("Experience must be an integer")
    .min(0, "Experience must be at least 0 years")
    .max(70, "Experience must be at most 70 years"),
  specialization: yup
    .string()
    .required("Specialization is required")
    .min(2, "Specialization must be at least 2 letters")
    .max(200, "Specialization must be at most 200 letters"),
  gender: yup.string().required("Gender is required"),
  cvFile: yup.mixed().required("CV File is required"),
});

const TrainerLogin = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [success, setSuccess] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown((passwordShown) => !passwordShown);
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
      formDataToSend.append("UserName", formData.UserName);
      formDataToSend.append("Password", formData.password);
      formDataToSend.append("Email", formData.email);
      formDataToSend.append("Age", formData.Age);
      formDataToSend.append("Experience", formData.experience);
      formDataToSend.append("Specialization", formData.specialization);
      formDataToSend.append("Gender", formData.gender);
      formDataToSend.append("cvFile", formData.cvFile[0]);

      console.log("Form Data to Send:", formDataToSend);
      const response = await axios.post(
        "https://localhost:7095/api/Authentication/TrainerRegistration?role=Trainer",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Trainer Registered successfully:", response.data);
      setSuccess(true);
    } catch (error) {
      console.error("Error Registering trainer:", error);
      toast.error("Trainer registration failed");
    }
  };

  return (
    <>
      {success ? (
        <section className="after-signUp">
          <img className="verifyImg" src={congratulations} alt="Auth" />
          <h1>
            Congratulations Trainer wait till your acceptance
            <br /> Check your email to get acceptance email.
          </h1>
          <p className="verify-button">
            <Link to="/Login">Sign In now</Link>
          </p>
        </section>
      ) : (
        <div className="login-container">
          <form onSubmit={handleSubmit(onSubmit)} className="loginForm">
            <h2 className="login-title">I am a Trainer </h2>
            <label className="login-label">
              Name :
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
              <div className="input-with-TrainerIcon">
                Password:
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
                {errors.password && (
                  <h3 style={{ color: "red" }}>{errors.password.message}</h3>
                )}
              </div>
            </label>
            <br />
            <label className="login-label">
              Age :
              <input type="text" className="login-input" {...register("Age")} />
              {errors.Age && (
                <h3 style={{ color: "red" }}>{errors.Age.message}</h3>
              )}
            </label>
            <br />
            <label className="login-label">
              Years of experience:
              <input
                type="text"
                className="login-input"
                {...register("experience")}
              />
              {errors.experience && (
                <h3 style={{ color: "red" }}>{errors.experience.message}</h3>
              )}
            </label>
            <label className="login-label">
              Your Specialization:
              <input
                type="text"
                className="login-input"
                {...register("specialization")}
              />
              {errors.specialization && (
                <h3 style={{ color: "red" }}>
                  {errors.specialization.message}
                </h3>
              )}
            </label>
            <br />
            <label className="login-label-cv">
              CV File:
              <input
                type="file"
                className="login-input-cv"
                {...register("cvFile")}
              />
              {errors.cvFile && (
                <h3 style={{ color: "red" }}>{errors.cvFile.message}</h3>
              )}
            </label>
            <label className="login-label">
              Gender :
              <select
                name="gender"
                {...register("gender")}
                className="login-input"
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && (
                <h3 style={{ color: "red" }}>{errors.gender.message}</h3>
              )}
            </label>
            <br />
            <button type="submit" className="login-button">
              Submit
            </button>
            <div className="linklogin">
              <Link to="/Login">I Already have an account</Link>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default TrainerLogin;
