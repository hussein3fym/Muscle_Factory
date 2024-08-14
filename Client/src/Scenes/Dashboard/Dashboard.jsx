import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import user from "./../../Assets/icons/users.png";
import trainer from "./../../Assets/icons/healthy-life.png";
import exercise from "./../../Assets/model-icons/exercise.png";
import blog from "./../../Assets/icons/blog (1).png";
import axios from "axios";
import PieChart from "../Charts/PieChart";
import BarChart from "../Charts/BarChart";
import LineChart from "../Charts/LineChart";

const Dashboard = () => {
  const [exercises, setExercises] = useState(0);
  const [blogs, setBlogs] = useState(0);
  const [users, setUsers] = useState(0);
  const [trainers, setTrainers] = useState(0);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7095/api/Exercises/CountAllExercises`
        );
        setExercises(response.data);
      } catch (error) {
        console.error("Error fetching exercise count:", error);
      }
    };
    fetchExercises();
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7095/api/Blogs/CountAllBlogs`
        );
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs count:", error);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7095/api/Users/CountAllUsers`
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users count:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7095/api/Users/CountAllTrainers`
        );
        setTrainers(response.data);
      } catch (error) {
        console.error("Error fetching trainers count:", error);
      }
    };
    fetchTrainers();
  }, []);

  const pieChartData = {
    labels: ["Users", "Trainers", "Exercises", "Blogs"],
    datasets: [
      {
        label: "Counts",
        data: [users, trainers, exercises, blogs],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#2E8B57"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#2E8B57"],
      },
    ],
  };

  return (
    <div className="DashboardPage">
      <h1 className="dashboardTitle">Dashboard</h1>
      <div className="DashCard">
        <div className="DashItem">
          <img src={user} alt="users" />
          <h2>Users</h2>
          <p>{users}</p>
        </div>
        <div className="DashItem">
          <img src={trainer} alt="trainers" />
          <h2>Trainers</h2>
          <p>{trainers}</p>
        </div>
        <div className="DashItem">
          <img src={exercise} alt="exercises" />
          <h2>Exercises</h2>
          <p>{exercises}</p>
        </div>
        <div className="DashItem">
          <img src={blog} alt="blogs" />
          <h2>Blogs</h2>
          <p>{blogs}</p>
        </div>
      </div>
      <div className="charts">
        <PieChart data={pieChartData} />
        <BarChart data={pieChartData} />
      </div>
      <div className="lineChart">
        <LineChart data={pieChartData} />
      </div>{" "}
    </div>
  );
};

export default Dashboard;
