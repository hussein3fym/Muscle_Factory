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
              <Link to="/" className="nav-link" activeClassName="active">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/blog" className="nav-link" activeClassName="active">
                Blog
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/workout" className="nav-link" activeClassName="active">
                Workout
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/Nutrition"
                className="nav-link"
                activeClassName="active"
              >
                Nutrition
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/find-gym"
                className="nav-link"
                activeClassName="active"
              >
                Find Gym
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/about-us"
                className="nav-link"
                activeClassName="active"
              >
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
