import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import emailIcon from "./../../../Assets/icons/send-mail (1).png";
import "./Coaches.css";

const fetchCertificates = async (id) => {
  const response = await axios.get(
    `https://localhost:7095/api/Certificates/GetByUserId?UserId=${id}`
  );
  return response.data;
};

const fetchTransformations = async (id) => {
  const { data } = await axios.get(
    `https://localhost:7095/api/Transformation/GetByUserId?UserId=${id}`
  );
  return data;
};

const fetchTrainers = async (id) => {
  const { data } = await axios.get(
    `https://localhost:7095/api/Users/GetUser/${id}`
  );
  return data;
};

const ViewCoach = () => {
  const { id } = useParams();
  const { data: trainers } = useQuery(["trainer", id], () => fetchTrainers(id));
  const { data: transformations } = useQuery(["transformations", id], () =>
    fetchTransformations(id)
  );
  const { data: certificates } = useQuery(["certificates", id], () =>
    fetchCertificates(id)
  );

  const handleSendEmail = (userId, userName, email) => {
    const subject = `Online Coaching with ${userName}`;
    const body = `Dear ${userName},\n\nI am interested in online coaching with you.`;
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  };

  return (
    <div className="ViewCoaches">
      <h1>Coach Details</h1>
      <div>
        <div className="ViewCoachesImg">
          <img
            src={`data:image/jpg;base64,${trainers?.photo}`}
            alt="Trainer Profile"
          />
        </div>
        <div className="CoachDetails">
          <h2>{trainers?.userName}</h2>
          <h2>Age: {trainers?.age}</h2>
          <h2>Experience: {trainers?.experience}</h2>
          <h2>{trainers?.email}</h2>
          <h2>Gender: {trainers?.gender}</h2>
          <h2>Specialization: {trainers?.specialization}</h2>
        </div>
        <div className="button-sendToCoach">
          <button
            onClick={() => handleSendEmail(trainers?.userName, trainers?.email)}
            className="sendToCoach"
          >
            Send E-mail for Online Coaches
            <img src={emailIcon} alt="emailCoach" />
          </button>
        </div>
        <hr />
        <div className="CoachCertificatesTransformations">
          <h2>Certificates</h2>
          <div className="CoachCertificates-Card">
            {certificates && certificates.length > 0 ? (
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
          <div className="CoachTransformations-Card">
            {transformations && transformations.length > 0 ? (
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

export default ViewCoach;
