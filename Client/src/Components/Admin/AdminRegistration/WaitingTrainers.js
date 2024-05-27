import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { TbFileCv } from "react-icons/tb";
import { FaEye } from "react-icons/fa";

import "./Form.css";

const WaitingTrainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);
  const [viewPdf, setViewPdf] = useState(null);
  const [displayCv, setDisplayCv] = useState(false); // State to control CV display
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("https://localhost:7095/api/Users/rejected")
      .then((res) => setTrainers(res.data))
      .catch((error) => console.error("Error fetching trainers:", error));
  }, []);

  const handleAccept = (userId) => {
    console.log("Accepting trainer with ID:", userId);
    axios
      .put("https://localhost:7095/api/Users/updatestatus/" + userId)
      .then((resp) => {
        console.log("Trainer accepted successfully:", resp.data);
        toast.success("Trainer accepted successfully");
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
  };

  const handleReject = (userId) => {
    axios
      .delete(" https://localhost:7095/api/Users/DeleteUser/" + userId)
      .then((res) => {
        setTrainers(trainers.filter((trainer) => trainer.id !== userId));
      });
    toast.success("Trainer rejected successfully");
  };

  const sendVerificationEmail = async (email) => {
    try {
      const response = await axios.post(
        "https://localhost:7095/api/Authentication/send-verification-email",
        null,
        {
          params: {
            email: email,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error sending verification email:", error);
      throw error;
    }
  };

  const handleSendVerificationEmail = async (email) => {
    try {
      const response = await sendVerificationEmail(email);
    } catch (error) {
      console.error("Error sending verification email:", error);
      throw error;
    }
  };

  const handleSendEmail = (userId, userName, email) => {
    const subject = `Regarding Your Muscle Factory Account, ${userName}`;
    const body = `Dear ${userName},\n\n`;
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  };

  const fileType = ["application/pdf"];

  const handlePdfFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file && fileType.includes(file.type)) {
        let reader = new FileReader();
        reader.onloadend = (e) => {
          setPdfFile(e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        setPdfFile(null);
        toast.error("Please select valid pdf file");
      }
    }
  };

  const [selectedTrainerId, setSelectedTrainerId] = useState(null);

  const handleToggleCvDisplay = (trainerId) => {
    setSelectedTrainerId(trainerId);
  };
  const handleView = (userId) => {
    console.log(`View Trainer Details with ID: ${userId}`);
  };
  return (
    <div>
      <h1 className="Users">Waiting list of Trainers</h1>
      <div className=" w-80 rounded bg-white border shadow p-4">
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
              <th>CV</th>
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
                  <TbFileCv onClick={() => handleToggleCvDisplay(trainer.id)} />
                  {displayCv && trainer.id === selectedTrainerId && (
                    <iframe
                      src={`data:application/pdf;base64,${trainer.cvFile}`} // Embedding PDF data directly
                      width="500"
                      height="375"
                      title="CV"
                    />
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-success me-2"
                    onClick={() => {
                      handleAccept(trainer.id);
                      handleSendVerificationEmail(trainer.email);
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
                  <button
                    className="btn btn-sm btn-success me-2"
                    onClick={() =>
                      handleSendEmail(
                        trainer.id,
                        trainer.userName,
                        trainer.email
                      )
                    }
                  >
                    Send Email
                  </button>
                  {/* Use Link for navigation */}
                  <Link to="/TrainerForm" className="btn btn-sm btn-primary">
                    Trainers
                  </Link>
                  <Link
                    to={`/ViewTrainer/${trainer.id}`}
                    className="viewContent"
                    onClick={() => handleView(trainer.id)}
                  >
                    <FaEye />
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
