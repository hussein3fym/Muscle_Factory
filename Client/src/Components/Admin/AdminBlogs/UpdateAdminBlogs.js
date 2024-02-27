import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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
    } catch (error) {
      console.error("Error updating blog:", error);
    }
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
              name="blogText"
              className="BMinput"
              value={adminBlogs.blogText}
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
             {!isImageChanged && adminBlogs.image && (
              <img
                src={`data:image/jpeg;base64,${adminBlogs.image}`}
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
              value={adminBlogs.videoURL}
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
