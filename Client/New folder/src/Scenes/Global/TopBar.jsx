import React, { useEffect, useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";
import { CiDark } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import dashboard from "./../../Assets/icons/dashboardicon.jpeg";
import "./TopBar.css";

const TopBar = () => {
  return (
    <div className="header">
      <div className="AdminHeader">
        <img src={dashboard} className="img" alt="dashboard" />
        <h1>Hussein Hassan</h1>
        <Link to="AdminProfile">
          <FaUser className="hoveredIcon" />
        </Link>{" "}
        <IoIosNotifications className="hovered2Icon" />
        <MdDarkMode className="hovered3Icon" />
      </div>
    </div>
  );
};

export default TopBar;
