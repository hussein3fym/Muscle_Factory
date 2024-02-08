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
    <div className="app">
      <div className="BMcontainer">
        <h1 lassName="BMtitle">Update</h1>
        <form onSubmit={handleUpdate}>
          <label>
            Blog Title
            <input
              type="text"
              name="title"
              value={blogs.title}
              onChange={handleChange}
              className="BMinput"
            />
          </label>

          <label>
            Blog Description
            <input
              type="text"
              name="description"
              value={blogs.description}
              onChange={handleChange}
              className="BMinput"
            />
          </label>

          <label>
            Blog Image
            <input
              type="file"
              className="BMinput"
              name="image"
              onChange={handleChange}
            />
          </label>

          <label>
            Video Url *OPtional
            <input
              type="text"
              className="BMinput"
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
