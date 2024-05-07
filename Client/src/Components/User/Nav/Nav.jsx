import React, { useState, useEffect } from "react";
import "./../UserLayout/Nav.css";
import NavIcon from "./../../../Assets/icons/NavIcon.jpg";
import { NavLink, useLocation } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";
import { IoMdLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import User from "./../../../Assets/icons/dashboardicon.jpeg";

const Nav = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initially set to false

  // Assuming somewhere in your app you handle the actual login
  const handleLoginSuccess = (token) => {
    localStorage.setItem("userToken", token);
    setIsLoggedIn(true);
    navigate("/userProfile");
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setIsLoggedIn(false);
    navigate("/login");
  };

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("userToken") !== null);
  }, [location]); // Use location if it's really relevant to your auth state

  return (
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
                <NavLink to="/Exercises" className="nav-link">
                  Exercises
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/Nutrition" className="nav-link">
                  Nutrition
                </NavLink>
              </li>
              {/* <li className="nav-item">
                  <NavLink to="/find-gym" className="nav-link">
                    Find Gym
                  </NavLink>
                </li> */}
              <li className="nav-item">
                <NavLink to="/AboutUs" className="nav-link">
                  About Us
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              {!isLoggedIn ? (
                <li>
                  <Link to="/register" className="nav-button">
                    Start Now
                  </Link>
                  <Link to="/login" className="nav-link">
                    Already Started?
                  </Link>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink to="/userProfile">
                      <img
                        src={User}
                        alt="User Profile"
                        style={{ width: 30, height: 30 }}
                      />
                    </NavLink>
                  </li>
                  <li>
                    <IoMdLogOut
                      size={30}
                      onClick={handleLogout}
                      style={{ cursor: "pointer" }}
                    />
                  </li>
                </>
              )}
            </ul>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Nav;
