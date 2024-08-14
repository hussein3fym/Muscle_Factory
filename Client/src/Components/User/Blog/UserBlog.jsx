import axios from "axios";
import React from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import "./EachBlog.css";

const fetchEachBlog = async (id) => {
  const { data } = await axios.get(
    `https://localhost:7095/api/Blogs/GetBlog/${id}`
  );
  return data;
};

const UserBlog = () => {
  const { id } = useParams();

  const { data: userBlogs, error } = useQuery(["userBlog", id], () =>
    fetchEachBlog(id)
  );

  if (error) return <div>Error fetching blog: {error.message}</div>;

  return (
    <div className="V-container">
      <div className="V-content">
        <div className="V-details">
          <h1>{userBlogs?.title || "Loading..."}</h1>
          <p dangerouslySetInnerHTML={{ __html: userBlogs?.blogText }}></p>
          {userBlogs?.videoURL && <ReactPlayer url={userBlogs.videoURL} />}
        </div>
        <div className="V-image">
          {userBlogs?.image && (
            <img
              src={`data:image/jpeg;base64,${userBlogs.image}`}
              alt={userBlogs.title}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserBlog;
