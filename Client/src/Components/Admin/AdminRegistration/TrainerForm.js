import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Form.css";
const TrainerForm = () => {
  const [trainers, setTrainer] = useState([]);

  useEffect(() => {
    axios
      .get("  http://localhost:4000/trainers")
      .then((res) => setTrainer(res.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleDelete = (trainerId) => {
    const confirm = window.confirm("Would you like to delete?");
    if (confirm) {
      axios
        .delete(" http://localhost:4000/trainers/" + trainerId)
        .then((res) => {
          setTrainer(trainers.filter((trainer) => trainer.id !== trainerId));
        })
        .catch((error) => console.error("Error deleting trainer:", error));
    }
    console.log(`Deleted Trainer with ID: ${trainerId}`);
  };
  const handleView = (trainerId) => {
    console.log(`View User Details with ID:${trainerId}`);
  };
  const handleAccept = (trainerId) => {
    // Handle accepting logic here
    console.log(`Accepted trainer with ID: ${trainerId}`);
  };

  const handleReject = (trainerId) => {
    // Handle rejecting logic here
    console.log(`Rejected trainer with ID: ${trainerId}`);
  };

  return (
    <div className="table">
      <div className="body">
        {/* <h1 className="tables-title">Muscle Factory SQUAD</h1> */}

        <div className="table-container">
          <div className="table-header">
            <h2>Trainers</h2>
          </div>
          <div className="table-body">
            <table>
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
                      <Link
                        to={`/ViewTrainer/${trainer.id}`}
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => handleView(trainer.id)}
                      >
                        View
                      </Link>
                      <button
                        className="btn btn-sm btn-danger me-2"
                        onClick={() => handleDelete(trainer.id)}
                      >
                        Delete
                      </button>
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TrainerForm;
