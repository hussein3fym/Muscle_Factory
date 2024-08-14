import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { FaEye, FaEdit } from "react-icons/fa";

const AllBlogs = () => {
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
          toast.success("Exercise Deleted Successfully");
        })
        .catch(() => {
          toast.error("Error Deleting Exercise");
        });
    }
    console.log(`Deleted Blog with ID: ${blogId}`);
  };
  const handleView = (blogId) => {
    console.log(`View User Details with ID:${blogId}`);
  };

  return (
    <div>
      <h1 className="Users"> BLOGS by Trainers </h1>
      <div className="w-75 rounded bg-white border shadow p-4 table-body">
        <h2> Blogs </h2>
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
                    <img
                      src={`data:image/jpeg;base64,${blog.image}`}
                      alt="blogImage"
                      style={{ maxWidth: "1000px" }}
                    />
                  </div>
                </td>
                <td>{blog.videoURL}</td>
                <td>
                  <div className="buttons-container">
                    <Link
                      to={`/ViewBlog/${blog.id}`}
                      className="viewContent"
                      onClick={() => handleView(blog.id)}
                    >
                      <FaEye />
                    </Link>
                    <button
                      onClick={() => handleDelete(blog.id)}
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

export default AllBlogs;
