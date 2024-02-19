import React, { useState } from "react";
import "./Home.css";
import HomeImage from "./../../../Assets/image-bg-gzg.png";
import Search from "./../../../pages/Search/Search";

const Home = () => {
  const [exercise, setExercise] = useState([]);
  const [bodyPart, setBodyPart] = useState("all");
  return (
    <div className="home-container">
      <img src={HomeImage} alt="Fitness & Health" className="home-image" />
      <div className="home-text-container">
        <h2>Fitness & Health</h2>
        <p>is a Mentality</p>
      </div>
      <Search
        setExercise={setExercise}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
      />
    </div>
  );
};

export default Home;
