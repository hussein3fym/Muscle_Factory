import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { GiMuscularTorso } from "react-icons/gi";
import { MdDashboardCustomize } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { CiDumbbell } from "react-icons/ci";
import { FaBlogger } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
import { GiGymBag } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import { FiUser, FiUserCheck, FiUserX } from "react-icons/fi";
import { IoAddCircle } from "react-icons/io5";
import { LiaDumbbellSolid } from "react-icons/lia";
import { LiaBloggerB } from "react-icons/lia";
import { FaStopwatch } from "react-icons/fa";
import adminicon from "./../../Assets/icons/TrainerIcon1.jpeg";
import "./SideBar.css";

const SideBar = () => {
  const [showMembersMenu, setShowMembersMenu] = useState(false);
  const toggleMembersMenu = () => {
    setShowMembersMenu(!showMembersMenu);
  };
  const [showExercises, setShowExercises] = useState(false);
  const toggleExercises = () => {
    setShowExercises(!showExercises);
  };
  const [showBlogs, setShowBlogs] = useState(false);
  const toggleBlogs = () => {
    setShowBlogs(!showBlogs);
  };

  return (
    <div className="sidebar">
      <img src={adminicon} alt="" />

      <nav>
        <ul className="Dash-links">
          <p className="p-forSidebar">Main</p>
          <li>
            <NavLink to="/Dashboard" className="StyledNavLink">
              <MdDashboardCustomize />
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <div
              className={`StyledNavLink ${showMembersMenu ? "active" : ""}`}
              onClick={toggleMembersMenu}
            >
              <FaUsers />
              <span>CRM</span>
            </div>
            {showMembersMenu && (
              <ul className="DropdownMenu">
                <li>
                  <NavLink to="/UserForm" className="StyledNavLink">
                    <FiUser />
                    Users
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/TrainerForm" className="StyledNavLink">
                    <FiUserCheck />
                    Trainers
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/WaitingTrainers" className="StyledNavLink">
                    <FaStopwatch />
                    Trainers
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          <p className="p-forSidebar">Services</p>
          <li>
            <div
              className={`StyledNavLink ${showExercises ? "active" : ""}`}
              onClick={toggleExercises}
            >
              <CiDumbbell />
              <span>Exercises</span>
            </div>
            {showExercises && (
              <ul className="DropdownMenu">
                <li>
                  <NavLink to="/AdminExercisesForm" className="StyledNavLink">
                    <LiaDumbbellSolid />
                    Admin Exercises
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/AllExercises" className="StyledNavLink">
                    <LiaDumbbellSolid />
                    Trainer Exercises
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/AdminAddExercises" className="StyledNavLink">
                    <IoAddCircle />
                    Exercise
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          <li>
            <div
              className={`StyledNavLink ${showBlogs ? "active" : ""}`}
              onClick={toggleBlogs}
            >
              <FaBlogger />
              <span>Blogs</span>
            </div>
            {showBlogs && (
              <ul className="DropdownMenu">
                <li>
                  <NavLink to="/AdminBlogs" className="StyledNavLink">
                    <LiaBloggerB />
                    Admin Blogs
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/AllBlogs" className="StyledNavLink">
                    <LiaBloggerB />
                    Trainer Blogs
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/AddAdminBlogs" className="StyledNavLink">
                    <IoAddCircle />
                    Blog
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          <p className="p-forSidebar">Features</p>
          <li>
            <NavLink to="/AllProducts" className="StyledNavLink">
              <FaQuestionCircle />
              Questions
            </NavLink>
          </li>
          <li>
            <NavLink to="/AllServices" className="StyledNavLink">
              <GiGymBag />
              GYM
            </NavLink>
          </li>
          <p className="p-forSidebar">Others</p>
          <li>
            <NavLink to="/AllServices" className="StyledNavLink">
              <IoMdSettings />
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
