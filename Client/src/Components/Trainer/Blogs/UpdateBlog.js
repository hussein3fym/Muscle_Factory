import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateBlog = () => {
  const { id } = useParams();
  const [blogs, setBlogs] = useState({
    title: "",
    description: "",
    image: null,
    videoUrl: "",
  });
  useEffect(() => {
    axios
      .get(`http://localhost:4300/blogs/${id} `)
      .then((res) => setBlogs(res.data))
      .catch((error) => console.error("Error fetching blogs:", error));
  }, [id]);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" || name === "video") {
      setBlogs((prevData) => ({
        ...prevData,
        [name]: files[0], // Access the file from the files array
      }));
    } else {
      setBlogs((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:4300/blogs/${id}`, blogs)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.error("Error updating blog:", error));
  };
  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1>Update Blog</h1>
        <form onSubmit={handleUpdate}>
          <label>
            Blog Title
            <input
              type="text"
              name="title"
              value={blogs.title}
              onChange={handleChange}
            />
          </label>

          <label>
            Blog Description
            <input
              type="text"
              className="form-control"
              name="description"
              value={blogs.description}
              onChange={handleChange}
            />
          </label>

          <label>
            Blog Image
            <input
              type="file"
              className="form-control"
              name="image"
              onChange={handleChange}
            />
          </label>

          <label>
            Video Url *OPtional
            <input
              type="text"
              className="form-control"
              name="videoUrl"
              value={blogs.videoUrl}
              onChange={handleChange}
            />
          </label>
          <button type="submit" className="btn btn-success">
            Update Blog
          </button>
        </form>
      </div>
    </div>
  );
};
export default UpdateBlog;
