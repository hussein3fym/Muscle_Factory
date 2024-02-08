import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

/* User View */

import Home from "./Components/User/Home/Home";
import Nav from "./Components/User/Nav/Nav";
import Register from "./Components/User/Registration/Register";
import Login from "./Components/User/Registration/Login";
import ResetPassword from "./Components/User/Registration/ResetPassword";
import Workout from "./Components/User/Workout/Workout";
import CaloriesCalculator from "./Components/User/Nutrition/CaloriesCalculator/CaloriesCalculator";
import BMI from "./Components/User/Nutrition/BMI/BMI";
import BMR from "./Components/User/Nutrition/BMR/BMR";
import Search from "./pages/Search/Search";
import Ask from "./pages/Questions/Ask";
import Blog from "./Components/User/Blog/Blog";
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
/* Trainer View */

import TrainerRegistration from "./Components/Trainer/TrainerLogin/TrainerRegistration";
import TrainerLogin from "./Components/Trainer/TrainerLogin/TrainerLogin";
import ResetTrainerPass from "./Components/Trainer/TrainerLogin/ResetTrainerPass";
import AddBlog from "./Components/Trainer/Blogs/AddBlog";
import BlogForm from "./Components/Trainer/Blogs/BlogForm";
import ViewBlog from "./Components/Trainer/Blogs/ViewBlog";
import UpdateBlog from "./Components/Trainer/Blogs/UpdateBlog";
import AddExercises from "./Components/Trainer/Exercises/AddExercises";
import ExercisesForm from "./Components/Trainer/Exercises/ExercisesForm";
import ViewExercises from "./Components/Trainer/Exercises/ViewExercises";
import UpdateExercises from "./Components/Trainer/Exercises/UpdateExercises";

function App() {
  return (
    <BrowserRouter>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/Workout" element={<Workout />} />
        <Route path="/TrainerRegistration" element={<TrainerRegistration />} />
        <Route path="/TrainerLogin" element={<TrainerLogin />} />
        <Route path="/ResetTrainerPass" element={<ResetTrainerPass />} />
        <Route path="/UserForm" element={<UserForm />} />
        <Route path="/TrainerForm" element={<TrainerForm />} />
        <Route path="/ViewUser/:id" element={<ViewUser />} />
        <Route path="/ViewTrainer/:id" element={<ViewTrainer />} />
        <Route path="/AddExercises" element={<AddExercises />} />
        <Route path="/ExercisesForm" element={<ExercisesForm />} />
        <Route path="/ViewExercises/:id" element={<ViewExercises />} />
        <Route path="/UpdateExercises/:id" element={<UpdateExercises />} />
        <Route path="/CaloriesCalculator" element={<CaloriesCalculator />} />
        <Route path="/BMI" element={<BMI />} />
        <Route path="/BMR" element={<BMR />} />
        <Route path="/AddBlog" element={<AddBlog />} />
        <Route path="/BlogForm" element={<BlogForm />} />
        <Route path="/ViewBlog/:id" element={<ViewBlog />} />
        <Route path="/UpdateBlog/:id" element={<UpdateBlog />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/Ask" element={<Ask />} />
        <Route path="/AdminBlogs" element={<AdminBlogs />} />
        <Route path="/UpdateAdminBlogs/:id" element={<UpdateAdminBlogs />} />
        <Route path="/ViewAdminBlogs/:id" element={<ViewAdminBlogs />} />
        <Route path="/AddAdminBlogs" element={<AddAdminBlogs />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/AdminAddExercises" element={<AdminAddExercises />} />
        <Route path="/AdminExercisesForm" element={<AdminExercisesForm />} />
        <Route
          path="/AdminViewExercises/:id"
          element={<AdminViewExercises />}
        />
        <Route
          path="/AdminUpdateExercises/:id"
          element={<AdminUpdateExercises />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
