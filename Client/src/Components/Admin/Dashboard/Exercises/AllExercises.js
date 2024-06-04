import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { FaEye, FaEdit } from "react-icons/fa";
const AllExercises = () => {
  const [exercises, setExercise] = useState([]);
  useEffect(() => {
    axios
      .get("  https://localhost:7095/api/Exercises/ExercisesOfTrainers")
      .then((res) => setExercise(res.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleDelete = (exerciseId) => {
    axios
      .delete(" https://localhost:7095/api/Exercises/" + exerciseId)
      .then(() => {
        setExercise(exercises.filter((exercise) => exercise.id !== exerciseId));
        toast.success("Exercise Deleted Successfully");
      })
      .catch(() => {
        toast.error("Error Deleting Exercise");
      });

    console.log(`Deleted Trainer with ID: ${exerciseId}`);
  };
  const handleView = (exerciseId) => {
    console.log(`View User Details with ID:${exerciseId}`);
  };
  return (
    <div>
      <h1 className="Users">All Exercises by Trainers</h1>
      <div className="w-75 rounded bg-white border shadow p-4 table-body">
        <h2>Exercises</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th> Exercise Name</th>
              <th> The Equipment</th>
              <th> Target Muscle</th>
              <th> Secondary Muscle</th>
              <th> Level Suggestion:</th>
              <th> Action:</th>
            </tr>
          </thead>
          <tbody>
            {exercises.map((exercise, i) => (
              <tr key={i}>
                <td>{exercise.id}</td>
                <td>{exercise.exerciseName}</td>
                <td>{exercise.equipment}</td>
                <td>{exercise.targetMuscle}</td>
                <td>{exercise.secondaryMuscle}</td>
                <td>{exercise.level}</td>

                <td>
                  <div className="buttons-container">
                    <Link
                      to={`/ViewExercises/${exercise.id}`}
                      className="viewContent"
                      onClick={() => handleView(exercise.id)}
                    >
                      <FaEye />
                    </Link>
                    <Link
                      to={`/UpdateExercises/${exercise.id}`}
                      className="updateContent"
                      onClick={() => handleView(exercise.id)}
                    >
                      <FaEdit />
                    </Link>
                    <button
                      className="deleteContent"
                      onClick={() => handleDelete(exercise.id)}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllExercises;
