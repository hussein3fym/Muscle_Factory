import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdDashboardCustomize } from "react-icons/md";
import { FaUsers, FaBlogger, FaStopwatch } from "react-icons/fa";
import { CiDumbbell } from "react-icons/ci";
import { FiUser, FiUserCheck } from "react-icons/fi";
import { IoAddCircle } from "react-icons/io5";
import { LiaDumbbellSolid, LiaBloggerB } from "react-icons/lia";
import adminicon from "./../../Assets/icons/TrainerIcon1.jpeg";
import "./SideBar.css";

const SideBar = () => {
  const [menuState, setMenuState] = useState({
    showMembersMenu: false,
    showExercises: false,
    showBlogs: false,
  });

  const toggleMembersMenu = () => {
    setMenuState((prevState) => ({
      showMembersMenu: !prevState.showMembersMenu,
      showExercises: false,
      showBlogs: false,
    }));
  };

  const toggleExercises = () => {
    setMenuState((prevState) => ({
      showMembersMenu: false,
      showExercises: !prevState.showExercises,
      showBlogs: false,
    }));
  };

  const toggleBlogs = () => {
    setMenuState((prevState) => ({
      showMembersMenu: false,
      showExercises: false,
      showBlogs: !prevState.showBlogs,
    }));
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
              className={`StyledNavLink ${
                menuState.showMembersMenu ? "active" : ""
              }`}
              onClick={toggleMembersMenu}
            >
              <FaUsers />
              <span>CRM</span>
            </div>
            {menuState.showMembersMenu && (
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
              className={`StyledNavLink ${
                menuState.showExercises ? "active" : ""
              }`}
              onClick={toggleExercises}
            >
              <CiDumbbell />
              <span>Exercises</span>
            </div>
            {menuState.showExercises && (
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
              className={`StyledNavLink ${menuState.showBlogs ? "active" : ""}`}
              onClick={toggleBlogs}
            >
              <FaBlogger />
              <span>Blogs</span>
            </div>
            {menuState.showBlogs && (
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
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
