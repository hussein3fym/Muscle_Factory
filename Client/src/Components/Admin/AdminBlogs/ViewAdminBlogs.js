import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactPlayer from 'react-player'

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
          // You can set some state to indicate that the blog was not found
        } else {
          console.log("An unexpected error occurred");
          // You can handle other types of errors here
        }
      });
  }, [id]);

  return (
    <div className="app">
      <div className="BMcontainer">
        <h1 className="BMtitle">View Blog</h1>
        <div>
          <h2>See the BLOGS</h2>
          <p className="BMinput">ID: {adminBlogs.id || "Loading..."}</p>
          <p className="BMinput">Title: {adminBlogs.title || "Loading..."}</p>
          <div>
          
            <img  src={`data:image/jpeg;base64,${adminBlogs.image}`}  style={{ maxWidth: "400px"}}/>
          
        </div>
          <p className="BMinput">
            Description: {adminBlogs.blogText || "Loading..."}
          </p>
          
          <ReactPlayer url={adminBlogs.videoURL} />
        </div>
      </div>
    </div>
  );
};

export default ViewAdminBlogs;
