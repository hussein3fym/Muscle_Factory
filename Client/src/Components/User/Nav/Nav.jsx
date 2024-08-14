import React, { useState, useEffect } from "react";
import "./../UserLayout/Nav.css";
import NavIcon from "./../../../Assets/icons/NavIcon.jpg";
import { NavLink, useLocation } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";
import { IoMdLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "./../../../Context/AuthProvider"; // Adjust the path accordingly
import axios from "axios";

const Nav = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const UserId = storedUser ? storedUser.userId : null;
  const [user, setUser] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, handleLogout } = useAuth();
  const handleCustomLogout = () => {
    window.location.href = "/Login";
    handleLogout(); // Call the original handleLogout from useAuth
  };

  useEffect(() => {
    if (UserId) {
      axios
        .get(`https://localhost:7095/api/Users/GetUser/${UserId}`)
        .then((res) => {
          setUser(res.data);
          console.log("Fetched Trainer Data:", res.data);
        })
        .catch((error) => console.error("Error fetching trainer:", error));
    }
  }, [UserId]);

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
                    {user.photo ? (
                      <NavLink to="/userProfile">
                        <img
                          src={`data:image/jpg;base64,${user.photo}`}
                          alt="User Profile"
                          style={{ width: 40, height: 40 }}
                          className="U-ProfileImg"
                        />
                      </NavLink>
                    ) : (
                      <div>
                        <NavLink to="/userProfile">
                          <CgProfile className="U-ProfileIcon" />
                        </NavLink>{" "}
                      </div>
                    )}
                  </li>
                  <li>
                    <IoMdLogOut
                      className="userLogout"
                      size={30}
                      onClick={handleCustomLogout}
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
