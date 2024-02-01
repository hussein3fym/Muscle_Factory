import React from "react";
import "./Nav.css";
import { Link, useLocation } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";

const Nav = () => {
  const location = useLocation();

  return (
    <Navbar expand="lg" className="navbar">
      <Container>
        <Navbar.Brand>Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <ul className="navbar-nav mx-auto">
            <li
              className={`nav-item ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/blog" className="nav-link">
                Blog
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Workout" className="nav-link">
                Workout
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Nutrition" className="nav-link">
                Nutrition
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/find-gym" className="nav-link">
                Find Gym
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about-us" className="nav-link">
                About Us
              </Link>
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
  );
};

export default Nav;
