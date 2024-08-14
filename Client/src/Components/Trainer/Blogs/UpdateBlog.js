import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import "./../Styles/Creation.css";
const UpdateBlog = () => {
  const { id } = useParams();
  const [blogs, setBlogs] = useState({
    title: "",
    blogText: "",
    image: null,
    videoURL: "",
  });

  const [isImageChanged, setIsImageChanged] = useState(false);
  useEffect(() => {
    axios
      .get(`https://localhost:7095/api/Blogs/GetBlog/${id} `)
      .then((res) => setBlogs(res.data))
      .catch((error) => console.error("Error fetching blogs:", error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setIsImageChanged(true);
    }
    setBlogs((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("Title", blogs.title);
    formData.append("BlogText", blogs.blogText);
    formData.append("VideoUrl", blogs.videoURL);
    formData.append("Image", blogs.image);

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
  return (
    <div>
      <div>
        <h1>Update</h1>
        <form onSubmit={handleUpdate} className="Creation-form">
          <label className="Creation">
            Blog Title
            <input
              type="text"
              className="Input"
              name="title"
              value={blogs.title}
              onChange={handleChange}
            />
          </label>

          <label className="Creation">
            Blog Description
            <textarea
              type="text"
              name="blogText"
              value={blogs.blogText}
              onChange={handleChange}
              className="Textarea"
            />
          </label>

          <label className="Creation">
            Blog Image
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="InputFile"
            />
            {!isImageChanged && blogs.image && (
              <img
                src={`data:image/jpeg;base64,${blogs.image}`}
                style={{ maxWidth: "100px" }}
                alt="Blog Image"
              />
            )}
            {isImageChanged && <p>Image has been changed</p>}
          </label>

          <label className="Creation">
            Video Url *OPtional
            <input
              type="text"
              name="videoURL"
              className="Input"
              value={blogs.videoURL}
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
export default UpdateBlog;
