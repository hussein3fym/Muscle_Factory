import React from "react";
import "./Nav.css";
import Footer from "./../Footer/Footer";
import NavIcon from "./../../../Assets/icons/NavIcon.jpg";
import { Outlet } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";
const UserLayout = () => {
  const location = useLocation();
  return (
    <>
      <div>
        <Navbar expand="lg" className="navbar">
          <Container>
            <Navbar.Brand>
              <img src={NavIcon} alt="NavIcon" className="NavIcon" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
              <ul className="navbar-nav mx-auto">
                <li
                  className={`nav-item ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                >
                  <NavLink to="/" className="nav-link">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/blog" className="nav-link">
                    Blog
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/Workout" className="nav-link">
                    Workout
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/Nutrition" className="nav-link">
                    Nutrition
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/find-gym" className="nav-link">
                    Find Gym
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/AboutUs" className="nav-link">
                    About Us
                  </NavLink>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/Register" className="nav-button">
                    Start Now
                  </Link>
                  <Link to="/Login" className="nav-link signin">
                    Already Started?
                  </Link>
                </li>
              </ul>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <div className="userLayout">
        <Outlet />
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default UserLayout;
