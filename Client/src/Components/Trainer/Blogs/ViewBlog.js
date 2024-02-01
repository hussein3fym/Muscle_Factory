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
    <div className=" d-flex flex-column justify-content-center align-items-center bg-light vh-100 ">
      <h1>View Blog</h1>
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h2>See the BLOGS</h2>
        <p>ID:{blogs.id}</p>
        <p>Title:{blogs.title}</p>
        <p>Description:{blogs.description}</p>
        <p>Image:{blogs.image}</p>
        <p>Video:{blogs.videoUrl}</p>
      </div>
    </div>
  );
};
export default ViewBlog;
