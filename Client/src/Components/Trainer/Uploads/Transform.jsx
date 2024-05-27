import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import "./Uploads.css";
import Adding from "./../../../Assets/icons/Adding.png";

const Transform = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const TrainerId = storedUser.userId;
  const [transformations, setTransformations] = useState([]);

  useEffect(() => {
    const fetchTransformations = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7095/api/Transformation/GetByUserId?UserId=${TrainerId}`
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
    <div className="trainerUploads-content">
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
      </div>
      <div className="trainerUploads-AddCard">
        <Link to="/TrainerProfile">
          <img src={Adding} alt="add" />
        </Link>
      </div>
    </div>
  );
};

export default Transform;
