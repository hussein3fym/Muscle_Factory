import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./AdminCreation.css";

const AddAdminBlogs = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const AdminId = storedUser.userId;

  const [adminBlogs, setAdminBlogs] = useState({
    Title: "",
    BlogText: "",
    VideoURL: "",
    Image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setAdminBlogs((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("UserId", AdminId);
      formDataToSend.append("Title", adminBlogs.Title);
      formDataToSend.append("BlogText", adminBlogs.BlogText);
      formDataToSend.append("VideoURL", adminBlogs.VideoURL);
      formDataToSend.append("Image", adminBlogs.Image);

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
      <h1 className="Users">Welcome ADMIN</h1>
      <div>
        <form onSubmit={handleSubmit} className="Creation-form">
          <label className="Creation">
            Blog Title
            <input
              type="text"
              className="Input"
              required
              placeholder="Enter Blog Title"
              name="Title"
              onChange={handleChange}
            />
          </label>

          <label className="Creation">
            Blog Description
            <textarea
              type="textarea"
              className="Textarea"
              placeholder="Enter Blog Description"
              name="BlogText"
              value={adminBlogs.BlogText}
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
            Video URL *optional
            <input
              type="text"
              className="Input"
              placeholder="Enter Video Url"
              name="VideoURL"
              value={adminBlogs.VideoURL}
              onChange={handleChange}
            />
          </label>

          <button className="AdminButton" type="submit" onClick={handleSubmit}>
            Add Blog
          </button>
          <Link className="AdminLink" to="/AdminBlogs">
            View Blogs
          </Link>
        </form>
      </div>
    </div>
  );
};

export default AddAdminBlogs;
