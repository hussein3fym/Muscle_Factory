import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Form.css";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const TrainerForm = () => {
  const [trainers, setTrainers] = useState([]);
  const [error, setError] = useState(null);

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

  const handleDelete = (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      axios
        .delete(`https://localhost:7095/api/Users/DeleteUser/${userId}`)
        .then((res) => {
          setTrainers((prevTrainers) =>
            prevTrainers.filter((trainer) => trainer.id !== userId)
          );
          toast.success("Trainer deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting trainer:", error);
          toast.error("Error deleting trainer. Please try again later.");
        });
    }
  };

  const handleView = (userId) => {
    console.log(`View Trainer Details with ID: ${userId}`);
  };

  const handleSendEmail = (userId, userName, email) => {
    const subject = `Regarding Your Muscle Factory Account, ${userName}`;
    const body = `Dear ${userName},\n\n`;
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  };

  return (
    <div>
      <h1 className="Users">Muscle Factory Squad</h1>
      <div className=" w-75 rounded bg-white border shadow p-4">
        <h2>Trainers</h2>
        {error && <div className="error">{error}</div>}
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
                <td>{trainer.userName}</td>
                <td>{trainer.email}</td>
                <td>{trainer.age}</td>
                <td>{trainer.experience}</td>
                <td>{trainer.gender}</td>
                <td>{trainer.specialization}</td>

                <td>
                  <Link
                    to={`/ViewTrainer/${trainer.id}`}
                    className="viewContent"
                    onClick={() => handleView(trainer.id)}
                  >
                    <FaEye />
                  </Link>
                  <button
                    style={{ border: "none" }}
                    className="deleteContent"
                    onClick={() => handleDelete(trainer.id)}
                  >
                    <MdDelete />
                  </button>
                  <button
                    style={{ border: "none" }}
                    className="SendContent"
                    onClick={() =>
                      handleSendEmail(
                        trainer.id,
                        trainer.userName,
                        trainer.email
                      )
                    }
                  >
                    <MdEmail />
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
