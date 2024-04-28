import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactPlayer from "react-player";
import "./AdminView.css";

const ViewAdminBlogs = () => {
  const [adminBlogs, setAdminBlogs] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://localhost:7095/api/Blogs/GetBlog/${id}`)
      .then((res) => setAdminBlogs(res.data))
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        if (error.response && error.response.status === 404) {
          console.log("Blog not found");
        } else {
          console.log("An unexpected error occurred");
        }
      });
  }, [id]);

  return (
    <div>
      <h1 className="ViewTitle">View Blog</h1>
      <div className="View-form">
        <div>
          <h2 className="HeadLines">
            Title: {adminBlogs.title || "Loading..."}
          </h2>
          <h2 className="HeadLines">ID: {adminBlogs.id || "Loading..."}</h2>
        </div>
        <div className="blogContent">
          <div>
            <h2 className="HeadLines">Description:</h2>
            <p dangerouslySetInnerHTML={{ __html: adminBlogs.blogText }}></p>
            <h2 className="HeadLines">Video URL:</h2>
            <ReactPlayer url={adminBlogs.videoURL} />
          </div>
          <div className="ViewImage">
            <img
              src={`data:image/jpeg;base64,${adminBlogs.image}`}
              alt="Blog Image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAdminBlogs;
