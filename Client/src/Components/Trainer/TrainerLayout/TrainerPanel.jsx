import React from "react";
import "./TrainerPanel.css";
import exercises from "./../../../Assets/icons/exercise (1).png";
import blogs from "./../../../Assets/icons/blog (1).png";
import Questions from "./../../../Assets/icons/question.png";
import Certificates from "./../../../Assets/icons/guarantee-certificate.png";
import Results from "./../../../Assets/icons/change-management.png";

const TrainerPanel = () => {
  return (
    <div>
      <div className="Card-list">
        <div className="P-card">
          <div>
            <h2>00</h2>
            <p> Exercise</p>
          </div>
          <div className="icon">
            <img src={exercises} alt="exercises" />
          </div>
        </div>
        <div className="P-card">
          <div>
            <h2>00 </h2>
            <p> Blog</p>
          </div>
          <div className="icon">
            <img src={blogs} alt="blogs" />
          </div>
        </div>
        <div className="P-card">
          <div>
            <h2>00 </h2>
            <p> Answer</p>
          </div>
          <div className="icon">
            <img src={Questions} alt="Questions" />
          </div>
        </div>
        <div className="P-card">
          <div>
            <h2>00 </h2>
            <p> Certificate</p>
          </div>
          <div className="icon">
            <img src={Certificates} alt="Certificates" />
          </div>
        </div>
        <div className="P-card">
          <div>
            <h2>00 </h2>
            <p> Transformation</p>
          </div>
          <div className="icon">
            <img src={Results} alt="Results" />
          </div>
        </div>
      </div>
      <h1>tables </h1>
      <div>
        <h1>Communications</h1>
        <p> Your clients</p>
        <p>Call Admin</p>
      </div>
    </div>
  );
};

export default TrainerPanel;
