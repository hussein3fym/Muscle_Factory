import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AdminBlogs.css";

const AddAdminBlogs = () => {
  const [adminBlogs, setAdminBlogs] = useState({
    title: "",
    description: "",
    image: null,
    videoUrl: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminBlogs((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", adminBlogs);
  };

  return (
    <div className="app">
      <div className="BMcontainer">
        <h1 lassName="BMtitle">Welcome ADMIN</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              Blog Title
              <input
                type="text"
                className="BMinput"
                placeholder="Enter Blog Title"
                name="title"
                value={adminBlogs.title}
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
                value={adminBlogs.description}
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
                value={adminBlogs.image}
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
                value={adminBlogs.videoUrl}
                onChange={handleChange}
              />
            </label>
            <button type="submit" className="btn btn-success AD_button">
              Add Blog
            </button>
            <Link to="/AdminBlogs" className="btn btn-success AD_button">
              View Blogs
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAdminBlogs;
