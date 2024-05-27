import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import "./Uploads.css";
import Adding from "./../../../Assets/icons/Adding.png";

const Certificates = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const TrainerId = storedUser.userId;
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7095/api/Certificates/GetByUserId?UserId=${TrainerId}`
        );
        setCertificates(response.data);
      } catch (error) {
        console.error("Error fetching certificates:", error);
      }
    };

    fetchCertificates();
  }, []);

  const handleDeleteCertificate = async (certificateId) => {
    try {
      await axios.delete(
        `https://localhost:7095/api/Certificates/${certificateId}`
      );
      setCertificates((prevCertificates) =>
        prevCertificates.filter((cert) => cert.id !== certificateId)
      );
      toast.success("Certificate Deleted Successfully");
    } catch (error) {
      console.error("Error deleting certificate:", error);
    }
  };

  return (
    <div className="trainerUploads-content">
      {certificates.length === 0 ? (
        <p>No certificates found.</p>
      ) : (
        <div className="trainerUploads">
          {certificates.map((certificate) => (
            <div key={certificate.id} className="trainerUploads-card">
              <img
                src={`data:image/jpeg;base64,${certificate.file}`}
                alt="Certificate"
                className="trainerUploads-card-image"
              />
              <button
                className="delete-button"
                onClick={() => handleDeleteCertificate(certificate.id)}
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="trainerUploads-AddCard">
        <Link to="/TrainerProfile">
          <img src={Adding} alt="add" />
        </Link>
      </div>
    </div>
  );
};

export default Certificates;
