import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import "./AdminCreation.css";

const UpdateAdminBlogs = () => {
  const { id } = useParams();
  const [adminBlogs, setAdminBlogs] = useState({
    title: "",
    blogText: "",
    image: null,
    videoURL: "",
  });
  const [isImageChanged, setIsImageChanged] = useState(false);
  useEffect(() => {
    axios
      .get(`https://localhost:7095/api/Blogs/GetBlog/${id} `)
      .then((res) => setAdminBlogs(res.data))
      .catch((error) => console.error("Error fetching blogs:", error));
  }, [id]);

  console.log(adminBlogs);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setIsImageChanged(true);
    }
    setAdminBlogs((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("Title", adminBlogs.title);
    formData.append("BlogText", adminBlogs.blogText);
    formData.append("VideoUrl", adminBlogs.videoURL);
    formData.append("Image", adminBlogs.image);

    try {
      const res = await axios.put(
        `https://localhost:7095/api/Blogs/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data);
      toast.success("Blog updated successfully");
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Blog update failed");
    }
  };
  const formatBlogText = (text) => {
    return text.replace(/<br\s*\/?>/gi, "\n");
  };
  return (
    <div>
      <div>
        <h1 className="Users">Update Blog</h1>
        <form onSubmit={handleUpdate} className="Creation-form">
          <label className="Creation">
            Blog Title
            <input
              type="text"
              className="Input"
              name="title"
              value={adminBlogs.title}
              onChange={handleChange}
            />
          </label>

          <label className="Creation">
            Blog Description
            <textarea
              type="text"
              className="Input"
              name="blogText"
              value={formatBlogText(adminBlogs.blogText)}
              onChange={handleChange}
            />
          </label>

          <label className="Creation">
            Blog Image
            <input
              type="file"
              className="InputFile"
              name="image"
              onChange={handleChange}
            />
            {!isImageChanged && adminBlogs.image && (
              <img
                className="UpdateImage"
                src={`data:image/jpeg;base64,${adminBlogs.image}`}
                alt="Blog Image"
              />
            )}
            {isImageChanged && <p>Image has been changed</p>}
          </label>

          <label className="Creation">
            Video Url *OPtional
            <input
              type="text"
              className="Input"
              name="videoURL"
              value={adminBlogs.videoURL}
              onChange={handleChange}
            />
          </label>
          <button type="submit" className="AdminButton">
            Update Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateAdminBlogs;
