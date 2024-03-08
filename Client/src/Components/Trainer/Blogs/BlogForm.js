import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BlogForm = () => {
  const [blogs, setBlogs] = useState([]);
  const trainerId = 2;
  useEffect(() => {
    axios
      .get("https://localhost:7095/api/Blogs/GetTrainerBlogs/" + trainerId)
      .then((res) => setBlogs(res.data))
      .catch((error) => console.error("Error fetching blogs:", error));
  }, [trainerId]);
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

  return (
    <div className="FormContainer d-flex flex-column justify-content-center align-items-center bg-light vh-100">
      <h1 className="t-TrainerForm">Blog Form</h1>
      <div className="w-75 rounded bg-white border shadow p-4 table-body">
        <h2>See the BLOGS By Trainers</h2>
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
            {blogs.map((blog, i) => (
              <tr key={i}>
                <td>{blog.id}</td>
                <td>{blog.title}</td>
                <td>
                  <div>
                    <img
                      src={`data:image/jpeg;base64,${blog.image}`}
                      style={{ maxWidth: "1000px" }}
                    />
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

                    <Link
                      to={`/UpdateBlog/${blog.id}`}
                      className="btn btn-warning"
                    >
                      Update
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
    </div>
  );
};
export default BlogForm;
