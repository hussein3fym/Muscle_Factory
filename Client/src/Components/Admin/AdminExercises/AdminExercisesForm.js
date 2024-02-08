import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminExercisesForm = () => {
  const [adminExercise, setAdminExercise] = useState([]);
  useEffect(() => {
    axios
      .get("  http://localhost:4201/AdminExercises")
      .then((res) => setAdminExercise(res.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleDelete = (adminExerciseId) => {
    const confirm = window.confirm("Would you like to delete?");
    if (confirm) {
      axios
        .delete(" http://localhost:4201/AdminExercises/" + adminExerciseId)
        .then((res) => {
          setAdminExercise(
            adminExercise.filter(
              (adminExercise) => adminExercise.id !== adminExerciseId
            )
          );
        })
        .catch((error) => console.error("Error deleting trainer:", error));
    }
    console.log(`Deleted Trainer with ID: ${adminExerciseId}`);
  };
  const handleView = (adminExerciseId) => {
    console.log(`View User Details with ID:${adminExerciseId}`);
  };
  return (
    <div className="FormContainer d-flex flex-column justify-content-center align-items-center bg-light vh-100">
      <h1 className="t-TrainerForm">Muscle Factory ADMIN Exercises</h1>
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
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => handleView(adminExercise.id)}
                    >
                      View
                    </Link>
                    <Link
                      to={`/AdminUpdateExercises/${adminExercise.id}`}
                      className="btn btn-sm btn-success me-2"
                      onClick={() => handleView(adminExercise.id)}
                    >
                      Update
                    </Link>
                    <button
                      className="btn btn-sm btn-danger me-2"
                      onClick={() => handleDelete(adminExercise.id)}
                    >
                      Delete
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
