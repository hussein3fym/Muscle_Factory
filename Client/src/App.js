import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ScrollTop from "./Components/ScrollTop";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
/* User View */

import Home from "./Components/User/Home/Home";
import Register from "./Authentication/Register";
import Login from "./Authentication/Login";
import ResetPassword from "./Authentication/ResetPassword";
import Workout from "./Components/User/Workout/Workout";
import CaloriesCalculator from "./Components/User/Nutrition/CaloriesCalculator/CaloriesCalculator";
import BMI from "./Components/User/Nutrition/BMI/BMI";
import Blog from "./Components/User/Blog/Blog";
import AboutUs from "./pages/AboutUs/AboutUs";
import UserBlog from "./Components/User/Blog/UserBlog";
import ViewWorkout from "./Components/User/Workout/ViewWorkout";
import UserProfile from "./Components/Profiles/UserProfile";
import Exercises from "./pages/ExercisesAPI/Exercises";
import ExerciseDetail from "./pages/ExerciseDetail/ExerciseDetail";
import Model from "./Model/Model";
import Predictor from "./Components/User/Nutrition/Predictor/Predictor";
import Food from "./Components/User/Nutrition/FoodDetails/Food";
import Nutrition from "./Components/User/Nutrition/Nutrition";
import Coaches from "./Components/User/Trainers/Coaches";
import ViewCoaches from "./Components/User/Trainers/ViewCoach";
/* Admin View */

import UserForm from "./Components/Admin/AdminRegistration/UserForm";
import TrainerForm from "./Components/Admin/AdminRegistration/TrainerForm";
import ViewUser from "./Components/Admin/AdminRegistration/ViewUser";
import ViewTrainer from "./Components/Admin/AdminRegistration/ViewTrainer";
import AdminBlogs from "./Components/Admin/AdminBlogs/AdminBlogs";
import UpdateAdminBlogs from "./Components/Admin/AdminBlogs/UpdateAdminBlogs";
import ViewAdminBlogs from "./Components/Admin/AdminBlogs/ViewAdminBlogs";
import AddAdminBlogs from "./Components/Admin/AdminBlogs/AddAdminBlogs";
import AdminAddExercises from "./Components/Admin/AdminExercises/AdminAddExercises";
import AdminExercisesForm from "./Components/Admin/AdminExercises/AdminExercisesForm";
import AdminViewExercises from "./Components/Admin/AdminExercises/AdminViewExercises";
import AdminUpdateExercises from "./Components/Admin/AdminExercises/AdminUpdateExercises";
import AllExercises from "./Components/Admin/Dashboard/Exercises/AllExercises";
import AllBlogs from "./Components/Admin/Dashboard/Blogs/AllBlogs";
import Dashboard from "./Scenes/Dashboard/Dashboard";
import WaitingTrainers from "./Components/Admin/AdminRegistration/WaitingTrainers";

/* Trainer View */
import TrainerPanel from "./Components/Trainer/TrainerLayout/TrainerPanel";
import TrainerRegistration from "./Authentication/TrainerRegistration";
import AddBlog from "./Components/Trainer/Blogs/AddBlog";
import BlogForm from "./Components/Trainer/Blogs/BlogForm";
import ViewBlog from "./Components/Trainer/Blogs/ViewBlog";
import UpdateBlog from "./Components/Trainer/Blogs/UpdateBlog";
import AddExercises from "./Components/Trainer/Exercises/AddExercises";
import ExercisesForm from "./Components/Trainer/Exercises/ExercisesForm";
import ViewExercises from "./Components/Trainer/Exercises/ViewExercises";
import UpdateExercises from "./Components/Trainer/Exercises/UpdateExercises";
import TrainerProfile from "./Components/Profiles/TrainerProfile";
import Certificates from "./Components/Trainer/Uploads/Certificates";
import Transform from "./Components/Trainer/Uploads/Transform";

/* Main App */
import PageNotFound from "./pages/PageNotFound";
import UserLayout from "./Components/User/UserLayout/UserLayout";
import TrainerLayout from "./Components/Trainer/TrainerLayout/TrainerLayout";
import AdminLayout from "./Components/Admin/AdminLayout/AdminLayout";
import GlobalStyles from "./Styles/GlobalStyles";
import RequireAuth from "./Authentication/RequireAuth";

const roles = {
  User: "User",
  Trainer: 3,
  Admin: 1,
};

function App() {
  /*
  const [userRole, setUserRole] = useState(null); 
  const handleLogout = () => {
    setUserRole(null); 
  };
  const handleLogin = (role) => {
    setUserRole(role); 
  };*/
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userRole, setUserRole] = useState(null);
  const [userID, setUserID] = useState(null);

  /*  const updateUserRole = (role) => {
    setUserRole(role);
  };
  const updateUserId = (id) => {
    setUserID(id);
  };*/

  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <ScrollTop />
        <Routes>
          {/* User View */}
          {/* <Route element={<RequireAuth allowedRoles={[roles.User]} />}> */}
          <Route element={<UserLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/UserProfile" element={<UserProfile />} />
            <Route path="/Workout" element={<Workout />} />
            <Route
              path="/CaloriesCalculator"
              element={<CaloriesCalculator />}
            />
            <Route path="/BMI" element={<BMI />} />
            <Route path="/Blog" element={<Blog />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/UserBlog/:id" element={<UserBlog />} />
            <Route path="/Nutrition" element={<Nutrition />} />
            <Route path="/ViewWorkout/:id" element={<ViewWorkout />} />
            <Route path="/Exercises" element={<Exercises />} />
            <Route path="/exercise/:id" element={<ExerciseDetail />} />
            <Route path="/Model" element={<Model />} />
            <Route path="/Predictor" element={<Predictor />} />
            <Route path="/Food" element={<Food />} />
            <Route path="/Coaches" element={<Coaches />} />
            <Route path="/ViewCoaches/:id" element={<ViewCoaches />} />
          </Route>
          {/* </Route> */}
          {/* Trainer view */}
          {/* <Route element={<RequireAuth allowedRoles={[ROLES.Trainer]} />}> */}
          <Route element={<TrainerLayout />}>
            <Route path="/TrainerPanel" element={<TrainerPanel />} />
            <Route path="/TrainerProfile" element={<TrainerProfile />} />
            {/* Trainer Blogs */}
            <Route path="/AddBlog" element={<AddBlog />} />
            <Route path="/BlogForm" element={<BlogForm />} />
            <Route path="/ViewBlog/:id" element={<ViewBlog />} />
            <Route path="/UpdateBlog/:id" element={<UpdateBlog />} />
            {/* Trainer Exercises */}
            <Route path="/AddExercises" element={<AddExercises />} />
            <Route path="/ExercisesForm" element={<ExercisesForm />} />
            <Route path="/ViewExercises/:id" element={<ViewExercises />} />
            <Route path="/UpdateExercises/:id" element={<UpdateExercises />} />
            <Route path="/Certificates" element={<Certificates />} />
            <Route path="/Transform" element={<Transform />} />
          </Route>
          {/* </Route> */}
          {/* Admin View */}
          {/* <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}> */}
          <Route element={<AdminLayout />}>
            {/* Auth */}
            <Route path="/UserForm" element={<UserForm />} />
            <Route path="/TrainerForm" element={<TrainerForm />} />
            <Route path="/WaitingTrainers" element={<WaitingTrainers />} />
            <Route path="/ViewUser/:id" element={<ViewUser />} />
            <Route path="/ViewTrainer/:id" element={<ViewTrainer />} />
            {/* Admin Blogs */}
            <Route path="/AdminBlogs" element={<AdminBlogs />} />
            <Route
              path="/UpdateAdminBlogs/:id"
              element={<UpdateAdminBlogs />}
            />
            <Route path="/ViewAdminBlogs/:id" element={<ViewAdminBlogs />} />
            <Route path="/AddAdminBlogs" element={<AddAdminBlogs />} />
            <Route path="/AllBlogs" element={<AllBlogs />} />
            {/* Admin Exercises */}
            <Route path="/AdminAddExercises" element={<AdminAddExercises />} />
            <Route
              path="/AdminExercisesForm"
              element={<AdminExercisesForm />}
            />
            <Route
              path="/AdminViewExercises/:id"
              element={<AdminViewExercises />}
            />{" "}
            <Route path="/UpdateExercises/:id" element={<UpdateExercises />} />
            <Route
              path="/AdminUpdateExercises/:id"
              element={<AdminUpdateExercises />}
            />
            <Route path="/AllExercises" element={<AllExercises />} />
            {/* Dashboard */}
            <Route path="/Dashboard" element={<Dashboard />} />
            {/* Trainer View inside Admin Dashboard */}
            {/* Trainer Blogs */}
            <Route path="/AddBlog" element={<AddBlog />} />
            <Route path="/BlogForm" element={<BlogForm />} />
            <Route path="/ViewBlog/:id" element={<ViewBlog />} />
            <Route path="/UpdateBlog/:id" element={<UpdateBlog />} />
            {/* Trainer Exercises */}
            <Route path="/ExercisesForm" element={<ExercisesForm />} />
          </Route>
          {/* </Route> */}

          {/* Auth */}
          <Route path="/Register" element={<Register />} />
          <Route
            path="/Login"
            element={
              <Login
              //updateUserRole={updateUserRole}
              //updateUserId={updateUserId}
              />
            }
          />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route
            path="/TrainerRegistration"
            element={<TrainerRegistration />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </>
  );
}

export default App;
