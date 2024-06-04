import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Coaches.css";
import defaultImage from "./../../../Assets/icons/favicon.ico";

const Coaches = () => {
  const [trainers, setTrainers] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const trainersPerPage = 9;

  useEffect(() => {
    axios
      .get("https://localhost:7095/api/Users/accepted")
      .then((res) => {
        setTrainers(res.data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching trainers:", error);
        setError("Error fetching trainers. Please try again later.");
      });
  }, []);

  const handleView = (userId) => {
    console.log(`View Trainer Details with ID: ${userId}`);
  };

  // Pagination logic
  const indexOfLastTrainer = currentPage * trainersPerPage;
  const indexOfFirstTrainer = indexOfLastTrainer - trainersPerPage;
  const currentTrainers = trainers.slice(
    indexOfFirstTrainer,
    indexOfLastTrainer
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="coaches">
      <div>
        <h1>Coaches</h1>
        {error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div>
            <div className="coaches-grid">
              {currentTrainers.map((trainer, i) => (
                <div key={i} className="coach-container">
                  <img
                    src={
                      trainer.photo
                        ? `data:image/jpeg;base64,${trainer.photo}`
                        : defaultImage
                    }
                    alt="img"
                    className="Coach-image"
                  />
                  <div className="Coach-overlay">
                    <h2>{trainer.userName}</h2>
                    <p>Email: {trainer.email}</p>
                    <p>Years of experience: {trainer.experience}</p>
                    <p>specialization: {trainer.specialization}</p>
                    <div>
                      <Link to={`/ViewCoaches/${trainer.id}`}>View</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pagination">
              {Array.from(
                { length: Math.ceil(trainers.length / trainersPerPage) },
                (_, i) => (
                  <button key={i} onClick={() => paginate(i + 1)}>
                    {i + 1}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Coaches;
