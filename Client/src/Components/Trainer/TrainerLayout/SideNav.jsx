import React from "react";
import "./SideNav.css";
import { NavLink } from "react-router-dom";
import TrainerIcon from "./../../../Assets/icons/TrainerIcon1.jpeg";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { CiDumbbell } from "react-icons/ci";
import { TbBrandBlogger } from "react-icons/tb";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { PiCertificateDuotone } from "react-icons/pi";
const SideNav = () => {
  return (
    <div className="sideNav">
      <img className="TrainerIcon" src={TrainerIcon} alt="TrainerIcon" />
      <nav>
        <ul className="Dash-links">
          <li>
            <NavLink to="/TrainerPanel" className="StyledNavLink">
              <HiOutlineHomeModern />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/ExercisesForm" className="StyledNavLink">
              <CiDumbbell />
              Workout
            </NavLink>
          </li>
          <li>
            <NavLink to="/BlogForm" className="StyledNavLink">
              <TbBrandBlogger />
              Blogs
            </NavLink>
          </li>
          <li>
            <NavLink to="/Certificates" className="StyledNavLink">
              <PiCertificateDuotone />
              Certificate
            </NavLink>
          </li>
          <li>
            <NavLink to="/Transform" className="StyledNavLink">
              <MdOutlinePublishedWithChanges />
              Transform
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideNav;
