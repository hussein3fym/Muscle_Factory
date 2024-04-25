import React from "react";
import "./TrainerPanel.css";
import exercises from "./../../../Assets/icons/exercise (1).png";
import blogs from "./../../../Assets/icons/blog (1).png";
import Questions from "./../../../Assets/icons/question.png";
import Certificates from "./../../../Assets/icons/guarantee-certificate.png";
import Results from "./../../../Assets/icons/change-management.png";
import whatsapp from "./../../../Assets/icons/whatsapp.png";
import email from "./../../../Assets/icons/send-mail (1).png";
const TrainerPanel = () => {
  const adminPhoneNumber = "+201002406468";
  const handleWhatsAppButtonClick = () => {
    const url = `https://wa.me/${adminPhoneNumber}`;
    window.open(url, "_blank");
  };
  return (
    <div>
      <div className="Card-list">
        <div className="P-card">
          <div>
            <h2>00</h2>
            <p> Exercise</p>
          </div>
          <div className="panel-icon">
            <img src={exercises} alt="exercises" />
          </div>
        </div>
        <div className="P-card">
          <div>
            <h2>00 </h2>
            <p> Blog</p>
          </div>
          <div className="panel-icon">
            <img src={blogs} alt="blogs" />
          </div>
        </div>
        <div className="P-card">
          <div>
            <h2>00 </h2>
            <p> Answer</p>
          </div>
          <div className="panel-icon">
            <img src={Questions} alt="Questions" />
          </div>
        </div>
        <div className="P-card">
          <div>
            <h2>00 </h2>
            <p> Certificate</p>
          </div>
          <div className="panel-icon">
            <img src={Certificates} alt="Certificates" />
          </div>
        </div>
        <div className="P-card">
          <div>
            <h2>00 </h2>
            <p> Transformation</p>
          </div>
          <div className="panel-icon">
            <img src={Results} alt="Results" />
          </div>
        </div>
      </div>
      <div className="communication">
        <h1>Need Help?</h1>
        <div className="communication-container">
          <div className="email">
            <h3>Send E-mail</h3>
            <div>
              <label htmlFor="name">
                <input type="text" id="name" placeholder="Enter your name" />
              </label>
              <label htmlFor="email">
                <input type="email" id="email" placeholder="Enter your email" />
              </label>
            </div>{" "}
            <div className="content">
              <label htmlFor="feedback">
                <textarea placeholder="Enter your feedback"></textarea>
              </label>
              <button type="submit" className="send">
                Send <img src={email} alt />
              </button>
            </div>
          </div>
          <div className="chat">
            <button className="button2" onClick={handleWhatsAppButtonClick}>
              Contact Admin on WhatsApp
              <img src={whatsapp} alt="whatsapp" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerPanel;
