import React, { useEffect, useState } from "react";
import "./Blog.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Blog = () => {
  const [userBlogs, setUserBlogs] = useState([]);
  useEffect(() => {
    axios
      .get("https://localhost:7095/api/Blogs/AllBlogsUserModule")
      .then((res) => setUserBlogs(res.data))
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        // Handle the error, e.g., display an error message to the user
      });
  }, []);
  const handleView = (blogId) => {
    console.log(`View User Details with ID:${blogId}`);
  };

  return (
    <div className="blog-container">
      <h1 className="blog-title">
        <span>health</span>
        <span>power</span>
        <span>mentality</span>
      </h1>
      <p>
        Promotes mental well-being for physical performance through positivity,
        stress management, and emotional health
      </p>
      <div>
        <div className="blogs-list">
          {userBlogs.map((blog, i) => (
            <div key={i} className="blog-card">
              <img
                src={`data:image/jpeg;base64,${blog.image}`}
                alt="Blog Thumbnail"
                className="blog-card-image"
              />
              <h2 className="blog-card-title">{blog.title}</h2>
              <div className="View">
                <Link
                  to={`/UserBlog/${blog.id}`}
                  className="ViewBlog"
                  onClick={() => handleView(blog.id)}
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
