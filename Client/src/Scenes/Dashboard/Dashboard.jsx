import React from "react";
import "./Dashboard.css";
import users from "./../../Assets/icons/group.png";
import trainers from "./../../Assets/icons/gym (2).png";
import exercises from "./../../Assets/icons/weights.png";
import blogs from "./../../Assets/icons/blogging.png";

const Dashboard = () => {
  return (
    <div className="DashboardPage">
      <h1 className="dashboardTitle">Dashboard</h1>
      <div className="filterButtons">
        <button>last 7 days</button>
        <button>last 30 days</button>
        <button>last 90 days</button>
      </div>
      <div className="DashCard">
        <div className="DashItem">
          <img src={users} alt="users" />

          <h2>Users</h2>
          <p>30</p>
        </div>
        <div className="DashItem">
          <img src={trainers} alt="trainers" />
          <h2>Trainers</h2>
          <p>10</p>
        </div>
        <div className="DashItem">
          <img src={exercises} alt="exercises" />
          <h2>Exercises</h2>
          <p>1500</p>
        </div>
        <div className="DashItem">
          <img src={blogs} alt="blogs" />
          <h2>Blogs</h2>
          <p>20</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
