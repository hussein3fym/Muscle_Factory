import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };
  return (
    <div className="app">
      <div className="BMcontainer">
        <h1 lassName="BMtitle">Update</h1>
        <form onSubmit={handleUpdate}>
          <label>
            Blog Title
            <input
              type="text"
              name="title"
              value={blogs.title}
              onChange={handleChange}
              className="BMinput"
            />
          </label>

          <label>
            Blog Description
            <input
              type="text"
              name="blogText"
              value={blogs.blogText}
              onChange={handleChange}
              className="BMinput"
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
            {!isImageChanged && blogs.image && (
              <img
                src={`data:image/jpeg;base64,${blogs.image}`}
                style={{ maxWidth: "100px" }}
                alt="Blog Image"
              />
            )}
            {isImageChanged && <p>Image has been changed</p>}
          </label>

          <label>
            Video Url *OPtional
            <input
              type="text"
              className="BMinput"
              name="videoURL"
              value={blogs.videoURL}
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
export default UpdateBlog;
