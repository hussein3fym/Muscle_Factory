import React from "react";
import "./Nav.css";
import Footer from "./../Footer/Footer";
import NavIcon from "./../../../Assets/icons/NavIcon.jpg";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Link, useLocation, useHistory } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";
import { IoMdLogOut } from "react-icons/io";
import User from "./../../../Assets/icons/dashboardicon.jpeg";
const UserLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("userToken") !== null;

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login"); // Use `navigate` instead of `history.push`
  };
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
                  <li className="nav-item">
                    <Link to="/Register" className="nav-button">
                      Start Now
                    </Link>
                    <Link to="/Login" className="nav-link signin">
                      Already Started?
                    </Link>
                  </li>
                ) : (
                  <>
                    <li className="nav-item">
                      <NavLink to="/userProfile" className="nav-link">
                        <img src={User} alt="userImg" className="img" />
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <IoMdLogOut
                        className="user-logout"
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
      <div className="userLayout">
        <Outlet />
      </div>

      <Footer />
    </>
  );
};

export default UserLayout;
