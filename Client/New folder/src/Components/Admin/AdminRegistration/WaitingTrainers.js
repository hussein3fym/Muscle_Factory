import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Form.css";

const WaitingTrainers = () => {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:7095/api/Trainers/RejectedTrainers")
      .then((res) => setTrainers(res.data))
      .catch((error) => console.error("Error fetching trainers:", error));
  }, []);

  const handleAccept = (trainerId) => {
    console.log("Accepting trainer with ID:", trainerId);
    axios
      .put("https://localhost:7095/api/Trainers/" + trainerId)
      .then((resp) => {
        console.log("Trainer accepted successfully:", resp.data);
        // Check if the trainer with the given ID exists in the trainers array
        const updatedTrainers = trainers.filter(
          (trainer) => trainer.id !== trainerId
        );
        setTrainers(updatedTrainers);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          console.error("Trainer not found with ID:", trainerId);
        } else {
          console.error("Error accepting trainer:", error);
        }
      });
  };

  const handleReject = (trainerId) => {
    axios
      .delete("https://localhost:7095/api/Trainers/" + trainerId)
      .then((res) => {
        setTrainers(trainers.filter((trainer) => trainer.id !== trainerId));
      })
      .catch((error) => {
        console.error("Error rejecting trainer:", error);
      });
    console.log(`Rejected trainer with ID: ${trainerId}`);
  };

  return (
    <div>
      <h1 className="Users">Waiting list of Trainers</h1>
      <div className=" w-75 rounded bg-white border shadow p-4">
        <h2>Trainers</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Experience</th>
              <th>Gender</th>
              <th>Specialization</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {trainers.map((trainer, i) => (
              <tr key={i}>
                <td>{trainer.id}</td>
                <td>{trainer.name}</td>
                <td>{trainer.email}</td>
                <td>{trainer.age}</td>
                <td>{trainer.experience}</td>
                <td>{trainer.gender}</td>
                <td>{trainer.specialization}</td>
                <td>
                  <button
                    className="btn btn-sm btn-success me-2"
                    onClick={() => handleAccept(trainer.id)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-sm btn-danger me-2"
                    onClick={() => handleReject(trainer.id)}
                  >
                    Reject
                  </button>
                  {/* Use Link for navigation */}
                  <Link to="/TrainerForm" className="btn btn-sm btn-primary">
                    Go to Trainer Form
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WaitingTrainers;
