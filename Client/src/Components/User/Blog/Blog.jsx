import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import "./Blog.css";

const fetchBlogs = async () => {
  const { data } = await axios.get(
    "https://localhost:7095/api/Blogs/AllBlogsUserModule"
  );
  return data;
};

const Blog = () => {
  const { data: userBlogs, error } = useQuery(["userBlogs"], fetchBlogs);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;

  if (error) return <div>Error fetching blogs: {error.message}</div>;

  const filteredBlogs = userBlogs
    ? userBlogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
      <div className="services-search">
        <label className="search-label">
          <CiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
      </div>
      <div className="blogs-list">
        {currentBlogs.map((blog, i) => (
          <div key={i} className="blog-card">
            <img
              src={`data:image/jpeg;base64,${blog.image}`}
              alt={blog.title}
              className="blog-card-image"
            />
            <h2 className="blog-card-title">{blog.title}</h2>
            <div className="View">
              <Link to={`/UserBlog/${blog.id}`} className="ViewBlog">
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        {[...Array(Math.ceil(filteredBlogs.length / blogsPerPage)).keys()].map(
          (number) => (
            <button
              key={number + 1}
              onClick={() => paginate(number + 1)}
              className={currentPage === number + 1 ? "active" : ""}
            >
              {number + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Blog;
