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
        <div>
          <h2 className="HeadLines">ID:{blogs.id}</h2>
          <h2 className="HeadLines">Title:{blogs.title}</h2>
        </div>

        <div className="blogContent">
          <div>
            <h2 className="HeadLines">Description:</h2>
            <p className="Description">{blogs.blogText}</p>
            <h2 className="HeadLines">Video URL:</h2>
            <ReactPlayer url={blogs.videoURL} />
          </div>

          <div className="ViewImage">
            <img
              src={`data:image/jpeg;base64,${blogs.image}`}
              style={{ maxWidth: "400px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ViewBlog;
