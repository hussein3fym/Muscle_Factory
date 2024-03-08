import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactPlayer from "react-player";

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
    <div className="app">
      <div className="BMcontainer">
        <h1 lassName="BMtitle">View Blog Post</h1>
        <div>
          <h2>See the BLOGS</h2>
          <p>ID:{blogs.id}</p>
          <p>Title:{blogs.title}</p>
          <div>
            <img
              src={`data:image/jpeg;base64,${blogs.image}`}
              style={{ maxWidth: "400px" }}
            />
          </div>
          <p>Description:{blogs.blogText}</p>

          <ReactPlayer url={blogs.videoURL} />
        </div>
      </div>
    </div>
  );
};
export default ViewBlog;
