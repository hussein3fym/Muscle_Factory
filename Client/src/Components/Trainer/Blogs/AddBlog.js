import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./../Styles/Creation.css";

const AddBlog = () => {

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const TrainerId=storedUser.userId;
  console.log(TrainerId);

  const [blogs, setBlogs] = useState({
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
      formDataToSend.append("UserId", TrainerId);
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
      toast.success("Blog created successfully");
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error("Blog creation failed");
    }
  };
  return (
    <div>
      <h1>Add a new Blog Post</h1>
      <div>
        <form onSubmit={handleSubmit} className="Creation-form">
  
          <label className="Creation">
            Blog Title
            <input
              type="text"
              placeholder="Enter Blog Title"
              required
              className="Input"
              name="Title"
              value={blogs.Title}
              onChange={handleChange}
            />
          </label>

          <label className="Creation">
            Blog Description
            <input
              type="text"
              placeholder="Enter Blog Description"
              className="Textarea"
              name="BlogText"
              value={blogs.BlogText}
              onChange={handleChange}
            />
          </label>

          <label className="Creation">
            Blog Image
            <input
              type="file"
              placeholder="Enter Blog Image"
              className="InputFile"
              name="Image"
              accept="image/*"
              onChange={handleChange}
            />
          </label>

          <label className="Creation">
            Video Url *optional
            <input
              type="text"
              placeholder="Enter Video Url"
              className="Input"
              name="VideoURL"
              value={blogs.VideoURL}
              onChange={handleChange}
            />
          </label>
          
          <button type="submit" onClick={handleSubmit} className="AdminButton">
            Add Blog
          </button>
          <Link to="/BlogForm" className="AdminLink">
            View Blogs
          </Link>
        </form>
      </div>
    </div>
  );
};
export default AddBlog;
