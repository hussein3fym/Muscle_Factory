import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Form.css";

const WaitingTrainers = () => {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:7095/api/Users/RejectedTrainers")
      .then((res) => {
        console.log(res.data);
        setTrainers(res.data);
      })
      .catch((error) => console.error("Error fetching trainers:", error));
  }, []);

  const handleAccept = (userId) => {
    console.log("Accepting trainer with ID:", userId);
    axios
      .put("https://localhost:7095/api/Users/updatestatus/" + userId)
      .then((resp) => {
        console.log("Trainer accepted successfully:", resp.data);
        // Check if the trainer with the given ID exists in the trainers array
        const updatedTrainers = trainers.filter(
          (trainer) => trainer.id !== userId
        );
        setTrainers(updatedTrainers);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          console.error("Trainer not found with ID:", userId);
        } else {
          console.error("Error accepting trainer:", error);
        }
      });
    axios
      .get(`https://localhost:7095/api/Users/${userId}/email`)
      .then((emailResponse) => {
        const userEmail = emailResponse.data.email;

        // Call the verification email API with the extracted email address
        axios
          .post(
            "https://localhost:7095/api/Authentication/send-verification-email",
            {
              email: userEmail,
            }
          )
          .then((resp) => {
            console.log("Verification email sent successfully:", resp.data);

            // Proceed with updating the trainer status or any other action
          })
          .catch((error) => {
            console.error("Error sending verification email:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching email for user ID:", userId, error);
      });
  };

  const handleReject = (userId) => {
    axios
      .delete(" https://localhost:7095/api/Users/DeleteUser/" + userId)
      .then((res) => {
        setTrainers(trainers.filter((trainer) => trainer.id !== userId));
      });
    console.log(`Rejected trainer with ID: ${userId}`);
  };

  const handleVerification = async (usermail) => {
    try {
      const response = await axios.post(
        "https://localhost:7095/api/Authentication/send-verification-email",
        {
          email: usermail,
        }
      );
      console.log(response.data); // Handle the response data as needed
    } catch (error) {
      console.error("Error sending verification email:", error);
      // Handle errors
    }
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
                    onClick={() => {
                      handleAccept(trainer.id);
                      handleVerification(trainer.email);
                    }}
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
