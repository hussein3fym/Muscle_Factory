import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Header.css";
import { CiSettings, CiLogout } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
const Header = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const TrainerId = storedUser.userId;
  console.log(TrainerId);
  const [trainer, setTrainer] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  useEffect(() => {
    axios
      .get(`https://localhost:7095/api/Users/GetUser/${TrainerId}`)
      .then((res) => {
        setTrainer(res.data);
        console.log("Fetched Trainer Data:", res.data);
      })
      .catch((error) => console.error("Error fetching trainer:", error));
  }, [TrainerId]);
  const dropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem("trainerToken");
    window.location.href = "/Login";
  };

  return (
    <div className="t-header">
      <h1>Welcome {trainer.userName} Manage Your Profile Here.</h1>
      <div className="trainerInfo">
        {trainer.photo ? (
          <div>
            <img
              src={`data:image/jpg;base64,${trainer.photo}`}
              alt="trainer"
              id="trainerImg"
              onClick={dropdown}
            />
          </div>
        ) : (
          <div>
            <CgProfile className="T-ProfileIcon" onClick={dropdown} />
          </div>
        )}
        {dropdownVisible ? (
          <div className="dropdown-content">
            {/* <h2>{trainer.userName}</h2>
            <hr></hr> */}
            <h4>
              <Link to="/TrainerProfile">
                {" "}
                <CiSettings />
                Manage Account
              </Link>
            </h4>
            <h4 className="logout" onClick={handleLogout}>
              <CiLogout />
              Logout
            </h4>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
