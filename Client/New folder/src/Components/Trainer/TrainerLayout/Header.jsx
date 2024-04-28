import React, { useEffect, useState } from "react";
import "./Header.css";
import { IoIosNotifications } from "react-icons/io";
import trainerImg from "./../../../Assets/carousel-1.jpg";
import { CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
const Header = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // Close the dropdown if the user clicks outside of it
  const handleClickOutside = (event) => {
    if (dropdownVisible && !event.target.matches("#trainerImg")) {
      setDropdownVisible(false);
    }
  };

  // Attach the handleClickOutside event listener when the component mounts
  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownVisible]);

  return (
    <div className="t-header">
      <h1>Welcome TrainerName, Manage Your Profile Here.</h1>
      <div className="trainerInfo">
        <IoIosNotifications className="t-notification" />
        <img
          src={trainerImg}
          alt="trainer"
          id="trainerImg"
          onClick={toggleDropdown}
        />
        {dropdownVisible && (
          <div className="dropdown-content">
            <h2>Trainer Name</h2>
            <hr></hr>
            <h4>
              <Link to="/TrainerProfile">
                {" "}
                <CiSettings />
                Manage Account
              </Link>
            </h4>
            <h4 className="logout">
              <Link to="#">
                {" "}
                <CiLogout />
                Logout
              </Link>
            </h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
