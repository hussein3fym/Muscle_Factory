import React, { useState } from "react";
import "./Home.css";
import Search from "./../../../pages/Search/Search";
import { Link } from "react-router-dom";
import experienceImage from "./../../../Assets/about.jpg";
import trainers from "./../../../Assets/icons/coach.png";
import certificate from "./../../../Assets/icons/guarantee-certificate.png";

const Home = () => {
  const [exercise, setExercise] = useState([]);
  const [bodyPart, setBodyPart] = useState("all");
  return (
    <div>
      <div className="home-container">
        <div className="home-overlay"></div>
        <div className="home-content">
          <div className="home-text-container">
            <h1>
              Fitness & Health is a <span> Mentality</span>
            </h1>
            <p>
              It's a fitness hub offering everything for gym enthusiasts and
              soon expanding to cater to all sports needs.
            </p>
            <Link className="link"> Join Now! </Link>
            <div className="count-home">
              <div>
                <h2> +1500 </h2>
                <span className="count">Exercise</span>
              </div>
              <h3>|</h3>
              <div>
                <h2> +50 </h2>
                <span className="count">Trainer</span>
              </div>
              <h3>|</h3>
              <div>
                <h2> +500 </h2>
                <span className="count">Achieved Goal</span>
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
      <div className="help">
        <h1 className="h1-help">How can we help you?</h1>
        <div className="help-container">
          <div className="help-card">
            <h2>Workout</h2>
            <p>
              Find the best workout for you, whether you're looking for a
              strength training, cardio, or yoga workout.
            </p>
            <Link className="card-link">Find Workout</Link>
          </div>
          <div className="help-card">
            <h2>Trainer</h2>
            <p>
              Find the best trainer for you, whether you're looking for a
              strength training, cardio, or yoga workout.
            </p>
            <Link className="card-link">Find Trainer</Link>
          </div>
          <div className="help-card">
            <h2> Weight Goal</h2>
            <p>
              Find the best goal for you, whether you're looking for a strength
              training, cardio, or yoga workout.
            </p>
            <Link className="card-link">Find Plan</Link>
          </div>
        </div>
        <div className="Experience">
          <div class="experience-container">
            <img src={experienceImage} alt="" />
            <div class="text-container">
              <h1> +10 years of Experience in fitness</h1>
              <p>
                With over 10 years of experience in the fitness industry, we
                have helped numerous individuals achieve their fitness goals.
                Our expertise ranges from personalized training programs to
                nutrition guidance, ensuring that our clients receive
                comprehensive support on their fitness journey.
              </p>{" "}
              <div className="trainer-certificate">
                <div>
                  <img src={trainers} alt="" />
                  <h2> Certified Squad</h2>
                  <p>
                    Our certified squad is dedicated to helping you achieve your
                    goals. With expert guidance and support, we're committed to
                    empowering you on your journey towards success.
                  </p>
                </div>
                <div>
                  <img src={certificate} alt="" />
                  <h2>Award Winning</h2>
                  <p>
                    Our award-winning services are recognized for excellence and
                    innovation. We tailor our solutions to exceed your
                    expectations, setting the standard in our industry with a
                    commitment to quality and customer satisfaction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Search
          setExercise={setExercise}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
        />
      </div>
    </div>
  );
};

export default Home;
