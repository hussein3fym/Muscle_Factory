import React, { useEffect, useState } from "react";
import axios from "axios";
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
  const [data, setData] = useState([]);
  const [photos, setPhotos] = useState([]);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const id = storedUser.userId;

  useEffect(() => {
    axios
      .get("https://localhost:7095/api/Users/GetUser/" + id)
      .then((res) => setData(res.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, [id]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7095/api/Users/GetUserPhotos/${id}`
        );

        if (response.data && response.data.length > 0) {
          // If photos are fetched successfully, set them in the state
          setPhotos(response.data);
        } else {
          // If no photos are found, display a message
          setPhotos([]);
        }
      } catch (error) {
        // Handle errors
        console.error("Error fetching photos:", error);
        //setError("Failed to fetch photos");
      }
    };

    fetchPhotos();
  }, [id]);

  return (
    <div className="header">
      <div className="AdminHeader">
        {/* <img
          src={`data:image/jpeg;base64,${photos[0].image}`}
          style={{ maxWidth: "35px", marginTop: "10px" }}
          alt="profile"
        /> */}
        <h1>{data.userName}</h1>
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
