import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminBlogs = () => {
  const [adminBlogs, setAdminBlogs] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4301/adminBlogs")
      .then((res) => setAdminBlogs(res.data))
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  const handleDelete = (adminBlogId) => {
    const confirm = window.confirm("Would you like to delete?");
    if (confirm) {
      axios
        .delete("http://localhost:4301/adminBlogs/" + adminBlogId)
        .then((res) => {
          setAdminBlogs(
            adminBlogs.filter((adminBlog) => adminBlog.id !== adminBlogId)
          );
        })
        .catch((error) => console.error("Error deleting blog:", error));
    }
    console.log(`Deleted Blog with ID: ${adminBlogId}`);
  };
  const handleView = (adminBlogId) => {
    console.log(`View User Details with ID:${adminBlogId}`);
  };
  return (
    <div>
      <h1 className="t-TrainerForm">Blog Form</h1>
      <div className="w-75 rounded bg-white border shadow p-4 table-body">
        <h2>See the BLOGS By Admins</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Image</th>
              <th>Video Url</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {adminBlogs.map((adminBlog, i) => (
              <tr key={i}>
                <td>{adminBlog.id}</td>
                <td>{adminBlog.title}</td>
                <td>{adminBlog.image}</td>
                <td>{adminBlog.videoUrl}</td>
                <td>
                  <div className="buttons-container">
                    <Link
                      to={`/ViewAdminBlogs/${adminBlog.id}`}
                      className="btn btn-info"
                      onClick={() => handleView(adminBlog.id)}
                    >
                      View
                    </Link>

                    <Link
                      to={`/UpdateAdminBlogs/${adminBlog.id}`}
                      className="btn btn-warning"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(adminBlog.id)}
                      className="btn btn-danger"
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

export default AdminBlogs;
