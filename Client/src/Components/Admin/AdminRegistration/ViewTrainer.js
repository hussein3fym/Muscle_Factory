import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const ViewTrainer = () => {
  const [trainers, setTrainer] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("  https://localhost:7095/api/Trainers/" + id)
      .then((res) => setTrainer(res.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, [id]);
  return (
    <div className=" d-flex flex-column justify-content-center align-items-center bg-light vh-100 ">
      <h1>Trainer Details</h1>
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h4> Name: {trainers.name}</h4>
        <p> Email: {trainers.email} </p>
        <p> Age: {trainers.age} </p>
        <p> Experience:{trainers.experience} </p>
        <p> Gender:{trainers.gender} </p>
        <p> Specialization:{trainers.specialization} </p>
      </div>
    </div>
  );
};
export default ViewTrainer;
