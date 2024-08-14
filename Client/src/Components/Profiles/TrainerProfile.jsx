import React, { useState, useEffect } from "react";
import axios from "axios";
import "./T-profile.css";
import { FaEdit } from "react-icons/fa";
import TrainerUpdate from "./Update/TrainerUpdate";
import TrainerUpload from "./Update/TrainerUpload";

const TrainerProfile = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const TrainerId = storedUser.userId;
  const [trainer, setTrainer] = useState([]);

  useEffect(() => {
    axios
      .get(`https://localhost:7095/api/Users/GetUser/${TrainerId}`)
      .then((res) => {
        setTrainer(res.data);
        console.log("Fetched Trainer Data:", res.data);
      })
      .catch((error) => console.error("Error fetching trainer:", error));
  }, [TrainerId]);

  return (
    <div>
      <div className="T-profileContent">
        <div className="Static-info">
          <div>
            <img
              src={`data:image/jpg;base64,${trainer.photo}`}
              alt="trainer"
              id="trainerImg"
            />
          </div>
          <div className="t-info">
            <h2>{trainer.userName}</h2>
            <h2>{trainer.email}</h2>
          </div>
        </div>
      </div>
      <TrainerUpdate />
      <TrainerUpload />
    </div>
  );
};

export default TrainerProfile;
