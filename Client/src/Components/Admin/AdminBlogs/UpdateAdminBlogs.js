import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateAdminBlogs = () => {
  const { id } = useParams();
  const [adminBlogs, setAdminBlogs] = useState({
    title: "",
    description: "",
    image: null,
    videoUrl: "",
  });
  useEffect(() => {
    axios
      .get(`http://localhost:4301/adminBlogs/${id} `)
      .then((res) => setAdminBlogs(res.data))
      .catch((error) => console.error("Error fetching blogs:", error));
  }, [id]);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" || name === "video") {
      setAdminBlogs((prevData) => ({
        ...prevData,
        [name]: files[0], // Access the file from the files array
      }));
    } else {
      setAdminBlogs((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:4301/adminBlogs/${id}`, adminBlogs)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.error("Error updating blog:", error));
  };
  return (
    <div className=" app  ">
      <div className=" BMcontainer ">
        <h1 BMtitle>Update Blog</h1>
        <form onSubmit={handleUpdate}>
          <label>
            Blog Title
            <input
              type="text"
              name="title"
              className="BMinput"
              value={adminBlogs.title}
              onChange={handleChange}
            />
          </label>

          <label>
            Blog Description
            <input
              type="text"
              name="description"
              className="BMinput"
              value={adminBlogs.description}
              onChange={handleChange}
            />
          </label>

          <label>
            Blog Image
            <input
              type="file"
              className="BMinput"
              name="image"
              onChange={handleChange}
            />
          </label>

          <label>
            Video Url *OPtional
            <input
              type="text"
              className="BMinput"
              name="videoUrl"
              value={adminBlogs.videoUrl}
              onChange={handleChange}
            />
          </label>
          <button type="submit" className="btn btn-success">
            Update Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateAdminBlogs;