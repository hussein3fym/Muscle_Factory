import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewAdminBlogs = () => {
  const [adminBlogs, setAdminBlogs] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:4301/adminBlogs/${id}`)
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
        <h1 className="BMtitle">View Blog Post by Admin</h1>
        <div>
          <h2>See the BLOGS</h2>
          <p className="BMinput">ID: {adminBlogs.id || "Loading..."}</p>
          <p className="BMinput">Title: {adminBlogs.title || "Loading..."}</p>
          <p className="BMinput">
            Description: {adminBlogs.description || "Loading..."}
          </p>
          <p className="BMinput">Image: {adminBlogs.image || "Loading..."}</p>
          <p className="BMinput">
            Video: {adminBlogs.videoUrl || "Loading..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewAdminBlogs;
