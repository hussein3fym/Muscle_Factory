import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { GrFormView } from "react-icons/gr";
import { CiSearch } from "react-icons/ci";
import "./Workout.css";
import { useQuery } from "@tanstack/react-query";

// Function to fetch exercises
const fetchExercises = async () => {
  const { data } = await axios.get("https://localhost:7095/api/Exercises");
  return data;
};

const TrainerWorkout = () => {
  // Fetch data using React Query
  const { data: trainerWorkout, error } = useQuery(
    ["trainerWorkout"],
    fetchExercises
  );

  // States for search term and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const workoutsPerPage = 9;

  // Handle search input
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  // Filter workouts based on search term
  const filteredWorkouts = trainerWorkout
    ? trainerWorkout.filter((exercise) =>
        exercise.exerciseName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Pagination logic
  const indexOfLastWorkout = currentPage * workoutsPerPage;
  const indexOfFirstWorkout = indexOfLastWorkout - workoutsPerPage;
  const currentWorkouts = filteredWorkouts.slice(
    indexOfFirstWorkout,
    indexOfLastWorkout
  );
  const totalPages = Math.ceil(filteredWorkouts.length / workoutsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (error) return <div>Error fetching workouts: {error.message}</div>;
  const handleView = (exerciseId) => {
    console.log(`View Exercise Details with ID:${exerciseId}`);
  };
  return (
    <div>
      <div className="services-search">
        <label className="search-label">
          <CiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search workouts..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </label>
        <h2>
          Do you need Custom Workout?{" "}
          <Link
            style={{
              color: "red",
            }}
            to="/Model"
          >
            Click Here
          </Link>{" "}
          to get started.
        </h2>
      </div>
      <div className="workout-list">
        {currentWorkouts.map((exercise, i) => (
          <div key={i} className="workout-item">
            <img
              src={`data:image/jpeg;base64,${exercise.image}`}
              alt={`${exercise.exerciseName}`}
              className="workout-card-image"
            />
            <h1>{exercise.exerciseName}</h1>
            <p>{exercise.targetMuscle}</p>
            <div>
              <hr />
              <Link
                className="view-btn"
                to={`/ViewWorkout/${exercise.id}`}
                onClick={() => handleView(exercise.id)}
              >
                <GrFormView />
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TrainerWorkout;
