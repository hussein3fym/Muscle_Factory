import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import "./Bloga.css";

const UserBlog = () => {
  const [userBlogs, setUserBlogs] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://localhost:7095/api/Blogs/GetBlog/${id}`)
      .then((res) => setUserBlogs(res.data))
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        // Handle the error, e.g., display an error message to the user
      });
  }, [id]);

  return (
    <div className="V-container">
      <div className="V-content">
        <div className="V-details">
          <h1>{userBlogs.title || "Loading..."}</h1>
          <p>{userBlogs.blogText || "Loading..."}</p>
          <ReactPlayer url={userBlogs.videoURL} />
        </div>
        <div className="V-image">
          <img
            src={`data:image/jpeg;base64,${userBlogs.image}`}
            alt="Blog Image"
          />
        </div>
      </div>
    </div>
  );
};

export default UserBlog;
