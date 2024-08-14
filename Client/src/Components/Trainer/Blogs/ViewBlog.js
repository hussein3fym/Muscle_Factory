import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactPlayer from "react-player";
import "./../Styles/View.css";

const ViewBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get("https://localhost:7095/api/Blogs/GetBlog/" + id)
      .then((res) => setBlogs(res.data))
      .catch((error) => console.error("Error fetching blogs:", error));
  }, [id]);

  return (
    <div>
      <h1 className="ViewTitle">View Blog Post</h1>
      <div className="View-form">
        <div className="exercise-info">
          <h2 className="HeadLines">Title:</h2>
          <p>{blogs.title}</p>
        </div>
        <div className="exercise-info">
          <h2 className="HeadLines">Description:</h2>
          <p dangerouslySetInnerHTML={{ __html: blogs.blogText }}></p>
        </div>
        <div className="exercise-info">
          <h2 className="HeadLines">Video URL:</h2>
          <ReactPlayer url={blogs.videoURL} />
        </div>
        <div className="ViewImage">
          <img
            src={`data:image/jpeg;base64,${blogs.image}`}
            alt=" Blog Image "
            className="exerciseImage"
          />
        </div>
      </div>
    </div>
  );
};
export default ViewBlog;
