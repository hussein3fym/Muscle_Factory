import React from "react";
import "./AboutUs.css";
import about2 from "./../../Assets/images/about2.png";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import Features from "../../Components/User/Features/Features";

const AboutUs = () => {
  return (
    <div>
      <div className="about-container">
        <div className="about-overlay"></div>
        <div className="about-content">
          <h1 className="about-title">With Us we will do it better</h1>
          <h4 className="about-text">
            <p>
              <span className="custom-word">Welcome</span> to Muscle Factory,
              your ultimate destination for achieving your fitness goals and
              unlocking your full potential. At Muscle Factory, we're passionate
              about helping you transform your body and mind through tailored
              training and nutrition plans, as well as insightful blogs to
              enhance your knowledge.
            </p>

            <p>
              Our mission is to empower individuals like you to live healthier,
              stronger, and more fulfilling lives. Whether you're a seasoned
              athlete or just starting your fitness journey, we're here to
              support you every step of the way.
            </p>
            <p>
              With our comprehensive training programs, carefully crafted by
              fitness experts, you'll unleash your inner strength and achieve
              results you never thought possible. Our nutrition plans are
              designed to fuel your body with the right nutrients, optimizing
              performance and accelerating progress towards your goals.
            </p>
            <p>
              But Muscle Factory is more than just a fitness platform – it's a
              community of like-minded individuals striving for excellence. Our
              blog section is packed with valuable resources, tips, and advice
              to educate and inspire you on your fitness journey. From workout
              routines to healthy recipes, we cover everything you need to know
              to succeed.
            </p>
            <p>
              Join us at Muscle Factory and become part of a movement dedicated
              to transforming lives and shaping a healthier future. Let's unlock
              your potential and unleash the best version of yourself, together.
            </p>
          </h4>
          <Link to="/Register" className="b-joinUs">
            <BsArrowRight className="arrow" />
            Join Us
          </Link>
        </div>
        <img src={about2} alt="About Us" className="about2-image" />
      </div>
      <Features />
    </div>
  );
};

export default AboutUs;
