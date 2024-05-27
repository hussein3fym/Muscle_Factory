import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
const ViewTrainer = () => {
  const [trainers, setTrainers] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [transformations, setTransformations] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(" https://localhost:7095/api/Users/GetUser/" + id)
      .then((res) => setTrainers(res.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, [id]);
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7095/api/Certificates/GetByUserId/${id}`
        );
        if (response.data && response.data.length > 0) {
          setCertificates(response.data);
        } else {
          setCertificates([]);
        }
      } catch (error) {
        console.error("Error fetching Certificates:", error);
      }
    };
    fetchCertificates();
  });
  useEffect(() => {
    const fetchTransformations = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7095/api/Transformation/GetByUserId/" + id
        );
        setTransformations(response.data);
      } catch (error) {
        console.error("Error fetching transformations:", error);
      }
    };

    fetchTransformations();
  }, []);
  const handleDeleteTransformation = async (transformationId) => {
    try {
      await axios.delete(
        `https://localhost:7095/api/Transformation/${transformationId}`
      );
      // Remove the deleted transformation from the state
      setTransformations((prevTransformations) =>
        prevTransformations.filter(
          (transformation) => transformation.id !== transformationId
        )
      );
      toast.success("Transformation Deleted Successfully");
    } catch (error) {
      console.error("Error deleting transformation:", error);
    }
  };

  return (
    <div className=" d-flex flex-column justify-content-center align-items-center bg-light vh-100 ">
      <h1>Trainer Details</h1>
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h4> Name: {trainers.userName}</h4>
        <p> Email: {trainers.email} </p>
        <p> Age: {trainers.age} </p>
        <p> Experience:{trainers.experience} </p>
        <p> Gender:{trainers.gender} </p>
        <p> Specialization:{trainers.specialization} </p>
        <div>
          <img
            src={`data:image/jpg;base64,${trainers.photo}`}
            alt="Trainer Profile"
            style={{ maxWidth: "30rem", marginTop: "10px" }}
          />
        </div>
      </div>
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <p> CV:{trainers.cv} </p>
        <p>
          {" "}
          Transformations:{" "}
          <div className="trainerUploads">
            {transformations.map((transformation) => (
              <div key={transformation.id} className="trainerUploads-card">
                <img
                  src={`data:image/jpeg;base64,${transformation.file}`}
                  className="trainerUploads-card-image"
                  alt="transform"
                />{" "}
                <div className="category">{transformation.title}</div>
                <div className="heading">{transformation.description}</div>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteTransformation(transformation.id)}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>{" "}
        </p>
        <p> Certificates:{certificates.certificates} </p>
      </div>
    </div>
  );
};
export default ViewTrainer;
