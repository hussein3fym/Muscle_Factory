import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import "./ViewForm.css";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

// Fetch certificates by user ID
const fetchCertificates = async (id) => {
  const response = await axios.get(
    `https://localhost:7095/api/Certificates/GetByUserId?UserId=${id}`
  );
  return response.data;
};

// Fetch transformations by user ID
const fetchTransformations = async (id) => {
  const { data } = await axios.get(
    `https://localhost:7095/api/Transformation/GetByUserId?UserId=${id}`
  );
  return data;
};
// Fetch Trainer details by ID
const fetchTrainerDetails = async (id) => {
  const response = await axios.get(
    `https://localhost:7095/api/Users/GetUser/${id}`
  );
  return response.data;
};

const ViewTrainer = () => {
  const { id } = useParams(); // Destructure id from useParams
  const [trainers, setTrainers] = useState(null); // Initialize trainers state

  // Use React Query to fetch data
  const {
    data: transformations,
    isLoading: loadingTransformations,
    error: errorTransformations,
  } = useQuery(["transformations", id], () => fetchTransformations(id));
  const {
    data: certificates,
    isLoading: loadingCertificates,
    error: errorCertificates,
  } = useQuery(["certificates", id], () => fetchCertificates(id));

  // Fetch trainer details
  useEffect(() => {
    axios
      .get(`https://localhost:7095/api/Users/GetUser/${id}`)
      .then((res) => setTrainers(res.data))
      .catch((error) => {
        console.error("Error fetching user details:", error);
        toast.error("Error fetching user details");
      });
  }, [id]);

  const handleDownloadCv = async (userId, userName) => {
    try {
      const response = await axios.get(
        `https://localhost:7095/api/Users/download-cv/${userId}`,
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `cv_${userName}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading CV:", error);
      toast.error("Error downloading CV");
    }
  };

  if (!trainers) return <p>Loading trainer details...</p>;

  return (
    <div className="ViewTrainerDetails">
      <h1>Trainer Details</h1>
      <div className="ViewTrainerDetails-content">
        <div className="ViewTrainerDetails-info">
          <div>
            {trainers.photo ? (
              <img
                src={`data:image/jpg;base64,${trainers.photo}`}
                alt="Trainer Profile"
                style={{ maxWidth: "15rem", marginTop: "10px" }}
              />
            ) : (
              <p>No profile photo available</p>
            )}
          </div>
          <div className="TrainerDetails-view">
            <h4>Name: {trainers.userName}</h4>
            <p>Email: {trainers.email}</p>
            <p>Age: {trainers.age}</p>
            <p>Experience: {trainers.experience}</p>
            <p>Gender: {trainers.gender}</p>
            <p>Specialization: {trainers.specialization}</p>
          </div>
          <button
            onClick={() => handleDownloadCv(trainers.id, trainers.userName)}
          >
            Download CV
          </button>
        </div>
        <hr />
        <div className="TrainerCertificatesTransformations">
          <h2>Certificates</h2>
          <div className="TrainerCertificates-Card">
            {loadingCertificates ? (
              <p>Loading certificates...</p>
            ) : errorCertificates ? (
              <p>Error loading certificates</p>
            ) : certificates && certificates.length > 0 ? (
              certificates.map((certificate) => (
                <div key={certificate.id}>
                  <img
                    src={`data:image/jpeg;base64,${certificate.file}`}
                    alt="CoachCertificate"
                  />
                </div>
              ))
            ) : (
              <p>No certificates available</p>
            )}
          </div>
          <hr />
          <h2>Transformations</h2>
          <div className="TrainerTransformations-Card">
            {loadingTransformations ? (
              <p>Loading transformations...</p>
            ) : errorTransformations ? (
              <p>Error loading transformations</p>
            ) : transformations && transformations.length > 0 ? (
              transformations.map((transformation) => (
                <div key={transformation.id}>
                  <img
                    src={`data:image/jpeg;base64,${transformation.file}`}
                    alt="CoachTransformation"
                  />
                  <h2>{transformation.title}</h2>
                  <h3>{transformation.description}</h3>
                </div>
              ))
            ) : (
              <p>No transformations available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTrainer;
