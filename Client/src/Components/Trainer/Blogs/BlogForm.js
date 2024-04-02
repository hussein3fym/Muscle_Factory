import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { CiSquarePlus } from "react-icons/ci";
import { IoIosMore } from "react-icons/io";
import "./../Styles/Creation.css";

const BlogForm = () => {
  const [showMoreOptionIndex, setShowMoreOptionIndex] = useState(false);
  const toggleMoreOption = (index) => {
    setShowMoreOptionIndex(index === showMoreOptionIndex ? null : index);
  };
  const [blogs, setBlogs] = useState([]);
  const trainerId = 1;
  useEffect(() => {
    axios
      .get("https://localhost:7095/api/Blogs/GetTrainerBlogs/" + trainerId)
      .then((res) => setBlogs(res.data))
      .catch((error) => console.error("Error fetching blogs:", error));
  }, [trainerId]);
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
                  <div onClick={() => toggleMoreOption(i)}>
                    <IoIosMore />
                  </div>
                  {showMoreOptionIndex === i && (
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
                  )}
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
