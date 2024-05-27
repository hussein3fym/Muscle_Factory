import "./TrainerPanel.css";
import exercises from "./../../../Assets/icons/exercise (1).png";
import blogs from "./../../../Assets/icons/blog (1).png";
import Certificates from "./../../../Assets/icons/guarantee-certificate.png";
import Results from "./../../../Assets/icons/change-management.png";
import whatsapp from "./../../../Assets/icons/whatsapp.png";
import email from "./../../../Assets/icons/send-mail (1).png";
import { useParams } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";

const TrainerPanel = () => {
  const [exerciseCount, setExerciseCount] = useState(0);
  const [blogsCount, setBlogsCount] = useState(0);
  const [certificateCount, setCertificateCount] = useState(0);
  const [transformationCount, setTransformationCount] = useState(0);
  const [trainername, setTrainername] = useState([]);

  const adminPhoneNumber = "+201002406468";

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const TrainerId = storedUser.userId;

  useEffect(() => {
    const fetchExerciseCount = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7095/api/Users/count-exercises/${TrainerId}`
        );
        setExerciseCount(response.data);
      } catch (error) {
        console.error("Error fetching exercise count:", error);
      }
    };

    const fetchBlogsCount = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7095/api/Users/count-blogs/${TrainerId}`
        );
        setBlogsCount(response.data);
      } catch (error) {
        console.error("Error fetching blogs count:", error);
      }
    };

    const fetchCertificateCount = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7095/api/Certificates/count-certificate/${TrainerId}`
        );
        setCertificateCount(response.data);
      } catch (error) {
        console.error("Error fetching certificate count:", error);
      }
    };

    const fetchTransformationCount = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7095/api/Transformation/count-transformation/${TrainerId}`
        );
        setTransformationCount(response.data);
      } catch (error) {
        console.error("Error fetching transformation count:", error);
      }
    };

    const fetchTrainerName = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7095/api/Users/GetUser/${TrainerId}`
        );
        setTrainername(response.data);
      } catch (error) {
        console.error("Error fetching trainer name", error);
      }
    };

    fetchExerciseCount();
    fetchBlogsCount();
    fetchCertificateCount();
    fetchTransformationCount();
    fetchTrainerName();
  }, [TrainerId]);

  const handleWhatsAppButtonClick = () => {
    const url = `https://wa.me/${adminPhoneNumber}`;
    window.open(url, "_blank");
  };
  return (
    <div>
      <div className="Card-list">
        <div className="P-card">
          <div>
            <h2>{exerciseCount}</h2>
            <p> Exercise</p>
          </div>
          <div className="panel-icon">
            <img src={exercises} alt="exercises" />
          </div>
        </div>
        <div className="P-card">
          <div>
            <h2>{blogsCount} </h2>
            <p> Blog</p>
          </div>
          <div className="panel-icon">
            <img src={blogs} alt="blogs" />
          </div>
        </div>
        <div className="P-card">
          <div>
            <h2>{certificateCount}</h2>
            <p> Certificate</p>
          </div>
          <div className="panel-icon">
            <img src={Certificates} alt="Certificates" />
          </div>
        </div>
        <div className="P-card">
          <div>
            <h2>{transformationCount} </h2>
            <p> Transformation</p>
          </div>
          <div className="panel-icon">
            <img src={Results} alt="Results" />
          </div>
        </div>
      </div>

      <div className="communication">
        <h1>Need Help?</h1>
        <div className="Trainer-Services">
          <div className="communication-container">
            <div className="email">
              <h3>Send E-mail</h3>
              <div>
                <label htmlFor="name">
                  <input type="text" id="name" placeholder="Enter your name" />
                </label>
                <label htmlFor="email">
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                  />
                </label>
              </div>{" "}
              <div className="content">
                <label htmlFor="feedback">
                  <textarea placeholder="Enter your feedback"></textarea>
                </label>
                <button type="submit" className="send">
                  Send <img src={email} alt="email" />
                </button>
                <div className="chat">
                  <button
                    className="button2"
                    onClick={handleWhatsAppButtonClick}
                  >
                    Contact Admin on WhatsApp
                    <img src={whatsapp} alt="whatsapp" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="OurServices">
            <h3>Our services</h3>
            <h4>Here you find what you need and more...</h4>
            <ul>
              <li>Calories Calculator</li>
              <li>BMI Calculator</li>
              <li>Food Details</li>
              <li>Custom Nutrition Plan</li>
              <li>Custom Exercises Plan</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerPanel;
