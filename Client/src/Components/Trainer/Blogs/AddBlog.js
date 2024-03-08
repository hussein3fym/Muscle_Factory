import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AddBlog = () => {
  const [blogs, setBlogs] = useState({
    TrainerId: "",
    Title: "",
    BlogText: "",
    VideoURL: "",
    Image: null,
  });
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setBlogs((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("TrainerId", blogs.TrainerId);
      formDataToSend.append("Title", blogs.Title);
      formDataToSend.append("BlogText", blogs.BlogText);
      formDataToSend.append("VideoURL", blogs.VideoURL);
      formDataToSend.append("Image", blogs.Image);

      const response = await axios.post(
        "https://localhost:7095/api/Blogs/CreateBlog",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Blog created successfully:", response.data);
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };
  return (
    <div className="app">
      <div className="BMcontainer">
        <h1 className="BMtitle">Add a new Blog Post</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              Blog Title
              <input
                type="text"
                className="BMinput"
                placeholder="Enter Blog Title"
                name="Title"
                value={blogs.Title}
                onChange={handleChange}
              />
            </label>

            <label>
              Blog Description
              <input
                type="text"
                className="BMinput"
                placeholder="Enter Blog Description"
                name="BlogText"
                value={blogs.BlogText}
                onChange={handleChange}
              />
            </label>

            <label>
              Blog Image
              <input
                type="file"
                className="BMinput"
                placeholder="Enter Blog Image"
                name="Image"
                accept="image/*"
                onChange={handleChange}
              />
            </label>

            <label>
              Video Url *optional
              <input
                type="text"
                className="BMinput"
                placeholder="Enter Video Url"
                name="VideoURL"
                value={blogs.VideoURL}
                onChange={handleChange}
              />
            </label>
            <label>
              Trainer ID
              <input
                type="text"
                className="BMinput"
                placeholder="Enter Your ID"
                name="TrainerId"
                value={blogs.TrainerId}
                onChange={handleChange}
              />
            </label>
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-primary"
            >
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
