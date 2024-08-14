import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { FaEye, FaEdit } from "react-icons/fa";
const AdminBlogs = () => {
  const [adminBlogs, setAdminBlogs] = useState([]);
  useEffect(() => {
    axios
      .get("https://localhost:7095/api/Blogs/AllAdminsBlogs")
      .then((res) => setAdminBlogs(res.data))
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  const handleDelete = (adminBlogId) => {
    axios
      .delete("https://localhost:7095/api/Blogs/" + adminBlogId)
      .then(() => {
        setAdminBlogs(
          adminBlogs.filter((adminBlog) => adminBlog.id !== adminBlogId)
        );
        toast.success("Blog Deleted Successfully");
      })
      .catch(() => {
        toast.error("Error Deleting Blog");
      });
    console.log(`Deleted Blog with ID: ${adminBlogId}`);
  };
  const handleView = (adminBlogId) => {
    console.log(`View User Details with ID:${adminBlogId}`);
  };
  return (
    <div>
      <h1 className="Users">Blogs by Admin </h1>
      <div className="w-75 rounded bg-white border shadow p-4 table-body">
        <h2>Blogs</h2>
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
            {adminBlogs.map((adminBlogs, i) => (
              <tr key={i}>
                <td>{adminBlogs.id}</td>
                <td>{adminBlogs.title}</td>
                <td>
                  <div>
                    <img
                      src={`data:image/jpeg;base64,${adminBlogs.image}`}
                      style={{ maxWidth: "1000px" }}
                    />
                  </div>
                </td>
                <td>{adminBlogs.videoURL}</td>
                <td>
                  <div className="buttons-container">
                    <Link
                      to={`/ViewAdminBlogs/${adminBlogs.id}`}
                      className="viewContent"
                      onClick={() => handleView(adminBlogs.id)}
                    >
                      <FaEye />
                    </Link>

                    <Link
                      to={`/UpdateAdminBlogs/${adminBlogs.id}`}
                      className="updateContent"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => handleDelete(adminBlogs.id)}
                      className="deleteContent"
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

export default AdminBlogs;
