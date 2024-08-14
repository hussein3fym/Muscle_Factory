import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { CiSquarePlus } from "react-icons/ci";
import "./../Styles/Creation.css";
import { MdDelete } from "react-icons/md";
import { FaEye, FaEdit } from "react-icons/fa";

const BlogForm = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const TrainerId = storedUser.userId;
  console.log(TrainerId);

  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://localhost:7095/api/Blogs/GetAdminOrTrainerBlogs/${TrainerId}`
      )
      .then((res) => setBlogs(res.data))
      .catch((error) => console.error("Error fetching blogs:", error));
  }, [TrainerId]);

  const handleDelete = (blogId) => {
    axios
      .delete("https://localhost:7095/api/Blogs/" + blogId)
      .then((res) => {
        setBlogs(blogs.filter((blog) => blog.id !== blogId));
        toast.success("Blog Deleted Successfully");
      })
      .catch(() => {
        toast.error("Error Deleting Blog");
      });
    console.log(`Deleted Blog with ID: ${blogId}`);
  };
  const handleView = (blogId) => {
    console.log(`View User Details with ID:${blogId}`);
  };

  return (
    <div>
      <h1 className="t-TrainerForm">Blogs Form</h1>
      <div className="f-Creation">
        <Link to="/AddBlog" className="b-Creation">
          <CiSquarePlus className="icon" />
          Write new Blog
        </Link>
      </div>
      <div className="w-75 rounded bg-white border shadow p-4 table-body">
        <h2> BLOGS</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Image</th>
              <th>Video Url</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, i) => (
              <tr key={i}>
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
                      className="viewContent"
                      onClick={() => handleView(blog.id)}
                    >
                      <FaEye />
                    </Link>

                    <Link
                      to={`/UpdateBlog/${blog.id}`}
                      className="updateContent"
                    >
                      <FaEdit />
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
export default BlogForm;
