import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminBlogs = () => {
  const [adminBlogs, setAdminBlogs] = useState([]);
  useEffect(() => {
    axios
      .get("https://localhost:7095/api/Blogs/AdminBlogs")
      .then((res) => setAdminBlogs(res.data))
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  const handleDelete = (adminBlogId) => {
    const confirm = window.confirm("Would you like to delete?");
    if (confirm) {
      axios
        .delete("https://localhost:7095/api/Blogs/" + adminBlogId)
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
            {adminBlogs.map((adminBlogs, i) => (
              <tr key={i}>
                <td>{adminBlogs.id}</td>
                <td>{adminBlogs.title}</td>
                <td> 
        <div>
          
            <img  src={`data:image/jpeg;base64,${adminBlogs.image}`}  style={{ maxWidth: "1000px"}}/>
          
        </div>
      </td>
                <td>{adminBlogs.videoURL}</td>
                <td>
                  <div className="buttons-container">
                    <Link
                      to={`/ViewAdminBlogs/${adminBlogs.id}`}
                      className="btn btn-info"
                      onClick={() => handleView(adminBlogs.id)}
                    >
                      View
                    </Link>

                    <Link
                      to={`/UpdateAdminBlogs/${adminBlogs.id}`}
                      className="btn btn-warning"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(adminBlogs.id)}
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
