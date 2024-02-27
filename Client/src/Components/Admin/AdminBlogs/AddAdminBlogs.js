import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AdminBlogs.css";
import axios from "axios";

const AddAdminBlogs = () => {
  const [adminBlogs, setAdminBlogs] = useState({
    AdminId: '', 
    Title: '',
    BlogText: '',
    VideoURL: '',
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
      formDataToSend.append('AdminId', adminBlogs.AdminId);
      formDataToSend.append('Title', adminBlogs.Title);
      formDataToSend.append('BlogText', adminBlogs.BlogText);
      formDataToSend.append('VideoURL', adminBlogs.VideoURL);
      formDataToSend.append('Image', adminBlogs.Image);

      const response = await axios.post('https://localhost:7095/api/Blogs/CreateBlog', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Blog created successfully:', response.data);
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  return (
    <div className="app">
      <div className="BMcontainer">
        <h1 className="BMtitle">Welcome ADMIN</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              Blog Title
              <input
                type="text"
                className="BMinput"
                placeholder="Enter Blog Title"
                name="Title"
                value={adminBlogs.Title}
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
                value={adminBlogs.BlogText} 
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
              Video URL *optional
              <input
                type="text"
                className="BMinput"
                placeholder="Enter Video Url"
                name="VideoURL"
                value={adminBlogs.VideoURL}
                onChange={handleChange}
              />
            </label>

            <label>
              Admin ID
              <input
                type="text"
                className="BMinput"
                placeholder="Enter Your ID"
                name="AdminId"
                value={adminBlogs.AdminId}
                onChange={handleChange}
              />
            </label>
            <br/>
            <button type="submit" onClick ={handleSubmit}className="btn btn-success AD_button">
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
