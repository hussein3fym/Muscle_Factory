import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
//import "antd/dist/antd.css";

/* User View */

import Home from "./Components/User/Home/Home";
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
import AboutUs from "./pages/AboutUs/AboutUs";
import UserBlog from "./Components/User/Blog/UserBlog";
import ViewWorkout from "./Components/User/Workout/ViewWorkout";
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
/* Trainer View */
import TrainerPanel from "./Components/Trainer/TrainerLayout/TrainerPanel";
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

/* Main App */
import PageNotFound from "./pages/PageNotFound";
import UserLayout from "./Components/User/UserLayout/UserLayout";
import TrainerLayout from "./Components/Trainer/TrainerLayout/TrainerLayout";
import AdminLayout from "./Components/Admin/AdminLayout/AdminLayout";
import GlobalStyles from "./Styles/GlobalStyles";
import Nutrition from "./Components/User/Nutrition/Nutrition";

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          {/* User View */}
          <Route element={<UserLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/Workout" element={<Workout />} />
            <Route
              path="/CaloriesCalculator"
              element={<CaloriesCalculator />}
            />
            <Route path="/BMI" element={<BMI />} />
            <Route path="/BMR" element={<BMR />} />
            <Route path="/Search" element={<Search />} />
            <Route path="/Ask" element={<Ask />} />
            <Route path="/Blog" element={<Blog />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/UserBlog/:id" element={<UserBlog />} />
            <Route path="/Nutrition" element={<Nutrition />} />
            <Route path="/ViewWorkout/:id" element={<ViewWorkout />} />
          </Route>

          {/* Trainer view */}
          <Route element={<TrainerLayout />}>
            <Route path="/TrainerPanel" element={<TrainerPanel />} />
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
          </Route>

          {/* Admin View */}
          <Route element={<AdminLayout />}>
            {/* Auth */}
            <Route path="/UserForm" element={<UserForm />} />
            <Route path="/TrainerForm" element={<TrainerForm />} />
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
            />
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

          {/* Auth */}
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route
            path="/TrainerRegistration"
            element={<TrainerRegistration />}
          />
          <Route path="/TrainerLogin" element={<TrainerLogin />} />
          <Route path="/ResetTrainerPass" element={<ResetTrainerPass />} />

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
