import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Form.css";

const UserForm = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:7095/api/Users/AllUsers")
      .then((res) => setData(res.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleDelete = (userId) => {
    const confirm = window.confirm("Would you like to delete?");
    if (confirm) {
      axios
        .delete("https://localhost:7095/api/Users/DeleteUser/" + userId)
        .then((res) => {
          setData(data.filter((user) => user.id !== userId));
        })
        .catch((error) => console.error("Error deleting user:", error));
    }
    console.log(`Deleted user with ID: ${userId}`);
  };
  const handleView = (userId) => {
    console.log(`View User Details with ID:${userId}`);
  };
  console.log(data);

  return (
    <div>
      <h1 className="Users">Muscle Factory Members</h1>
      <div className=" w-75 rounded bg-white border shadow p-4">
        <h2>Users</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, i) => (
              <tr key={i}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Link
                    to={`/ViewUser/${user.id}`}
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => handleView(user.id)}
                  >
                    View
                  </Link>
                  <button
                    className="btn btn-sm btn-danger me-2"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default UserForm;
