import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AllBlogs = () => {
  // State for blogs by Trainer
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    axios
      .get("https://localhost:7095/api/Blogs/TrainersBlogs")
      .then((res) => setBlogs(res.data))
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);
  const handleDelete = (blogId) => {
    const confirm = window.confirm("Would you like to delete?");
    if (confirm) {
      axios
        .delete("https://localhost:7095/api/Blogs/" + blogId)
        .then((res) => {
          setBlogs(blogs.filter((blog) => blog.id !== blogId));
        })
        .catch((error) => console.error("Error deleting blog:", error));
    }
    console.log(`Deleted Blog with ID: ${blogId}`);
  };
  const handleView = (blogId) => {
    console.log(`View User Details with ID:${blogId}`);
  };
  //////////////////////////////////////////////////////
  const [adminBlogs, setAdminBlogs] = useState([]);
  // Fetch blogs by admin
  useEffect(() => {
    axios
      .get("https://localhost:7095/api/Blogs/AdminBlogs")
      .then((res) => setAdminBlogs(res.data))
      .catch((error) => console.error("Error fetching admin blogs:", error));
  }, []);
  const handleDeleteAdmin = (adminBlogId) => {
    const confirm = window.confirm("Would you like to delete?");
    if (confirm) {
      axios
        .delete("https://localhost:7095/api/Blogs/" + adminBlogId)
        .then((res) => {
          setAdminBlogs(
            adminBlogs.filter((adminBlog) => adminBlog.id !== adminBlogId)
          );
        })
        .catch((error) => console.error("Error deleting admin blog:", error));
    }
    console.log(`Deleted Blog with ID: ${adminBlogId}`);
  };
  const handleViewAdmin = (adminBlogId) => {
    console.log(`View User Details with ID:${adminBlogId}`);
  };

  return (
    <div className="FormContainer d-flex flex-column justify-content-center align-items-center bg-light vh-100">
      <h1 className="t-TrainerForm">See All BLOGS</h1>
      <div className="w-75 rounded bg-white border shadow p-4 table-body">
        <h2> Blogs by Trainer </h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Image</th>
              <th>Video URL</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, i) => (
              <tr key={i}>
                <td>{blog.id}</td>
                <td>{blog.title}</td>
                <td> 
        <div>
          
            <img  src={`data:image/jpeg;base64,${blog.image}`}  style={{ maxWidth: "1000px"}}/>
          
        </div>
      </td>
                <td>{blog.videoURL}</td>
                <td>
                  <div className="buttons-container">
                    <Link
                      to={`/ViewBlog/${blog.id}`}
                      className="btn btn-info"
                      onClick={() => handleView(blog.id)}
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleDelete(blog.id)}
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
      <div className="w-75 rounded bg-white border shadow p-4 table-body">
        <h2> BLOGS By Admins</h2>
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
                <td> 
        <div>
          
            <img  src={`data:image/jpeg;base64,${adminBlog.image}`}  style={{ maxWidth: "1000px"}}/>
          
        </div>
      </td>
                <td>{adminBlog.videoUrl}</td>
                <td>
                  <div className="buttons-container">
                    <Link
                      to={`/ViewAdminBlogs/${adminBlog.id}`}
                      className="btn btn-info"
                      onClick={() => handleViewAdmin(adminBlog.id)}
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
                      onClick={() => handleDeleteAdmin(adminBlog.id)}
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

export default AllBlogs;
