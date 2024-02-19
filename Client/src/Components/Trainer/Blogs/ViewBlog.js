import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get("http://localhost:4300/blogs/" + id)
      .then((res) => setBlogs(res.data))
      .catch((error) => console.error("Error fetching blogs:", error));
  }, [id]);

  return (
    <div className="app">
      <div className="BMcontainer">
        <h1 className="BMtitle">View Blog Post</h1>
        <div>
          <h2>See the BLOGS</h2>
          <p>ID:{blogs.id}</p>
          <p>Title:{blogs.title}</p>
          <p>Description:{blogs.description}</p>
          <p>Image:{blogs.image}</p>
          <p>Video:{blogs.videoUrl}</p>
        </div>
      </div>
    </div>
  );
};
export default ViewBlog;
