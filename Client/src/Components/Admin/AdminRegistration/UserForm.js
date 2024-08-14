import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
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
    const confirmDelete = window.confirm("Would you like to delete?");
    if (confirmDelete) {
      axios
        .delete("https://localhost:7095/api/Users/DeleteUser/" + userId)
        .then((res) => {
          setData((prevData) => prevData.filter((user) => user.id !== userId));
          toast.success("User Deleted Successfully");
        })
        .catch((error) => {
          toast.error("Error Deleting User");
        });
      console.log(`Deleted user with ID: ${userId}`);
    }
  };
  const handleSendEmail = (userId, userName, email) => {
    const subject = `Regarding Your Muscle Factory Account, ${userName}`;
    const body = `Dear ${userName},\n\n`;
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  };

  const handleView = (userId) => {
    console.log(`View User Details with ID:${userId}`);
  };

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
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>
                  <Link
                    to={`/ViewUser/${user.id}`}
                    className="viewContent"
                    onClick={() => handleView(user.id)}
                  >
                    <FaEye />
                  </Link>
                  <button
                    style={{ border: "none" }}
                    className="deleteContent"
                    onClick={() => handleDelete(user.id)}
                  >
                    <MdDelete />
                  </button>
                  <button
                    style={{ border: "none" }}
                    className="SendContent"
                    onClick={() =>
                      handleSendEmail(user.id, user.userName, user.email)
                    }
                  >
                    <MdEmail />
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
