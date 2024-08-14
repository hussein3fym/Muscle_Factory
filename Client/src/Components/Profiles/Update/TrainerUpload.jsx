import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";


const TrainerUpload = () => {

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const TrainerId = storedUser.userId;
  console.log(TrainerId);

  const [certificates, setCertificates] = useState([]);

  const [transformation, setTransformation] = useState({
    file: null,
    title: "",
    description: "",
  });

  /*const handleCertificateChange = (e) => {
    setCertificates(Array.from(e.target.files));
  };*/

  const handleTransformationChange = (e) => {
    const { name, value } = e.target;
    if (name === "file") {
      setTransformation({ ...transformation, file: e.target.files[0] });
    } else {
      setTransformation({ ...transformation, [name]: value });
    }
  };

  const handleCertificateChange = (e) => {
    setCertificates(Array.from(e.target.files));
  };

  const uploadCertificates = async () => {
    try {
      const formData = new FormData();
    certificates.forEach((file) => {
      formData.append("userId",TrainerId);
      formData.append("file", file);
    });
    await axios.post(
      "https://localhost:7095/api/Certificates",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Form submitted:", certificates);
  } catch (error) {
    console.log("Error in submitting form:", error);
    toast.error("Failed to create transformation");
  }
};

  const uploadTransformation = async () => {
    try {
    const formData = new FormData();
    formData.append("userid",TrainerId);
    formData.append("file", transformation.file);
    formData.append("title", transformation.title);
    formData.append("description", transformation.description);
    await axios.post(
      "https://localhost:7095/api/Transformation",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Form submitted:", transformation);
    toast.success("transformation created successfully");
  } catch (error) {
    console.log("Error in submitting form:", error);
    toast.error("Failed to create transformation");
  }
  };
  return (
    <div>
      <div className="upload">
        <div className="U-info">

          <label>
            <h2>Upload Certificates</h2>
            <input type="file" multiple onChange={handleCertificateChange} />
            <button onClick={uploadCertificates}>Upload</button>
          </label>
          
          <div className="Transformations">
            <h2>Upload Transformations</h2>
            <label className="U-info">
              <input
                type="file"
                name="file"
                onChange={handleTransformationChange}
              />
              <input
                type="text"
                name="title"
                className="trans-title"
                placeholder="Title"
                value={transformation.title}
                onChange={handleTransformationChange}
              />
            </label>
            <label>
              <textarea
                name="description"
                className="Type more details if there is..."
                placeholder="Description"
                value={transformation.description}
                onChange={handleTransformationChange}
              />
            </label>
            <button onClick={uploadTransformation}>Upload</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerUpload;
