import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Form.css";
const TrainerForm = () => {
  const [trainers, setTrainer] = useState([]);

  useEffect(() => {
    axios
      .get("  https://localhost:7095/api/Trainers/AcceptedTrainers")
      .then((res) => setTrainer(res.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleDelete = (trainerId) => {
    const confirm = window.confirm("Would you like to delete?");
    if (confirm) {
      axios
        .delete(" https://localhost:7095/api/Trainers/" + trainerId)
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

  return (
    <div>
      <h1 className="Users">Muscle Factory Squad</h1>
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default TrainerForm;
