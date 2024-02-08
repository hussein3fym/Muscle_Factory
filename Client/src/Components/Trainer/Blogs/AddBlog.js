import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const AddBlog = () => {
  const [blogs, setBlogs] = useState({
    title: "",
    description: "",
    image: null,
    videoUrl: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogs((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", blogs);
  };
  return (
    <div className="app">
      <div className="BMcontainer">
        <h1 lassName="BMtitle">Add a new Blog Post</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              Blog Title
              <input
                type="text"
                className="BMinput"
                placeholder="Enter Blog Title"
                name="title"
                value={blogs.title}
                onChange={handleChange}
              />
            </label>

            <label>
              Blog Description
              <input
                type="text"
                className="BMinput"
                placeholder="Enter Blog Description"
                name="description"
                value={blogs.description}
                onChange={handleChange}
              />
            </label>

            <label>
              Blog Image
              <input
                type="file"
                className="BMinput"
                placeholder="Enter Blog Image"
                name="image"
                value={blogs.image}
                onChange={handleChange}
              />
            </label>

            <label>
              Video Url *optional
              <input
                type="text"
                className="BMinput"
                placeholder="Enter Video Url"
                name="videoUrl"
                value={blogs.videoUrl}
                onChange={handleChange}
              />
            </label>
            <button type="submit" className="btn btn-primary">
              Add Blog
            </button>
            <Link to="/BlogForm" className="btn btn-primary">
              View Blogs
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddBlog;
