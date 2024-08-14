import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { FaEye, FaEdit } from "react-icons/fa";

const AdminExercisesForm = () => {
  const [adminExercise, setAdminExercise] = useState([]);
  useEffect(() => {
    axios
      .get("  https://localhost:7095/api/Exercises/ExercisesOfAdmins")
      .then((res) => setAdminExercise(res.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleDelete = (adminExerciseId) => {
    axios
      .delete(" https://localhost:7095/api/Exercises/" + adminExerciseId)
      .then(() => {
        setAdminExercise(
          adminExercise.filter(
            (adminExercise) => adminExercise.id !== adminExerciseId
          )
        );
        toast.success("Exercise Deleted Successfully");
      })
      .catch(() => {
        toast.error("Error Deleting Exercise");
      });

    console.log(`Deleted Trainer with ID: ${adminExerciseId}`);
  };
  const handleView = (adminExerciseId) => {
    console.log(`View User Details with ID:${adminExerciseId}`);
  };
  return (
    <div>
      <h1 className="Users">Muscle Factory ADMIN Exercises</h1>
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
            {adminExercise.map((adminExercise, i) => (
              <tr key={i}>
                <td>{adminExercise.id}</td>
                <td>{adminExercise.exerciseName}</td>
                <td>{adminExercise.equipment}</td>
                <td>{adminExercise.targetMuscle}</td>
                <td>{adminExercise.secondaryMuscle}</td>
                <td>{adminExercise.level}</td>

                <td>
                  <div className="buttons-container">
                    <Link
                      to={`/AdminViewExercises/${adminExercise.id}`}
                      className="viewContent"
                      onClick={() => handleView(adminExercise.id)}
                    >
                      <FaEye />
                    </Link>
                    <Link
                      to={`/AdminUpdateExercises/${adminExercise.id}`}
                      className="updateContent"
                      onClick={() => handleView(adminExercise.id)}
                    >
                      <FaEdit />
                    </Link>
                    <button
                      className="deleteContent"
                      onClick={() => handleDelete(adminExercise.id)}
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

export default AdminExercisesForm;
