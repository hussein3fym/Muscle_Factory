import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TopBar.css";

const TopBar = () => {
  const [data, setData] = useState([]);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const id = storedUser.userId;

  useEffect(() => {
    axios
      .get("https://localhost:7095/api/Users/GetUser/" + id)
      .then((res) => setData(res.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, [id]);

  return (
    <div className="header">
      <div className="AdminHeader">
        <h1>{data.userName}</h1>
      </div>
    </div>
  );
};

export default TopBar;
