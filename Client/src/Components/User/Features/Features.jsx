import React from "react";
import "./Features.css";
import { Link } from "react-router-dom";
import food from "./../../../Assets/icons/nutrition.gif";
import blog from "./../../../Assets/icons/Animation - 1710595751429.gif";
import gym from "./../../../Assets/icons/us-exe.gif";
import question from "./../../../Assets/icons/ask1.gif";
import fitness from "./../../../Assets/icons/gym.gif";
import trainer from "./../../../Assets/icons/trainer.png";

const Features = () => {
  return (
    <div className="features">
      <h1 className="features-title">What we offer</h1>
      <div className="features-content-view">
        <div className="features-item">
          <img src={food} alt="food" />
          <h2>
            <Link to="/Nutrition">Nutrition Plan</Link>
          </h2>
          <p>
            Receive customized meal plans tailored to your dietary preferences
            and fitness goals.
          </p>
        </div>
        <div className="features-item">
          <img src={blog} alt="blog" />
          <h2>
            <Link to="/Blog">Educational Blogs</Link>
          </h2>
          <p>
            Explore a vast library of informative articles, covering topics
            ranging from nutrition and exercise science to mental wellness and
            motivation.
          </p>
        </div>
        <div className="features-item">
          <img src={gym} alt="gym" />
          <h2>
            <Link to="/Exercises">Variety of Exercises</Link>
          </h2>
          <p>
            Access an extensive collection of workout routines, including
            strength training, cardio, yoga, and more, ensuring diversity in
            your fitness regimen.
          </p>
        </div>
        <div className="features-item">
          <img src={question} alt="question" />
          <h2>
            <Link to="/Ask">Ask ?</Link>
          </h2>
          <p>
            Get expert advice and guidance from certified trainers and
            nutritionists to address any queries or concerns you may have about
            your fitness journey.
          </p>
        </div>
        <div className="features-item">
          <img src={fitness} alt="fitness" />
          <h2>
            <Link to="/FindGym">Gym Information</Link>
          </h2>
          <p>
            Gym information provides details on facilities, equipment, and
            services offered, helping individuals choose the best gym for their
            fitness needs. Access to this information ensures a well-informed
            decision, supporting effective and enjoyable workouts..
          </p>
        </div>
        <div className="features-item">
          <img src={trainer} alt="trainer" />
          <h2>
            <Link to="/Coaches">Trainers Zone</Link>
          </h2>
          <p>
            Participate in a wide range of sports activities and group classes,
            fostering camaraderie and enjoyment while staying active.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
