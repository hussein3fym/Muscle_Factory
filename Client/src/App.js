import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/User/Home/Home";
import Nav from "./Components/User/Nav/Nav";
import Register from "./Components/User/Registration/Register";
import Login from "./Components/User/Registration/Login";
import ResetPassword from "./Components/User/Registration/ResetPassword";
import TrainerLogin from "./Components/Trainer/TrainerLogin/TrainerLogin";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/TrainerLogin" element={<TrainerLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
