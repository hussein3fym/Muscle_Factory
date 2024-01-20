import React from "react";
import "./Home.css";
import HomeImage from "./../../../Assets/image-bg-gzg.png";

const Home = () => {
  return (
    <div className="home-container">
      <img src={HomeImage} alt="Fitness & Health" className="home-image" />
      <div className="home-text-container">
        <h2>Fitness & Health</h2>
        <p>is a Mentality</p>
      </div>
    </div>
  );
};

export default Home;
