import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const ViewUser = () => {
  const [data, setData] = useState([]);
  const [photos, setPhotos] = useState([]);
  const { id } = useParams();
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://localhost:7095/api/Users/GetUser/" + id)
      .then((res) => setData(res.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, [id]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7095/api/Users/GetUser/${id}`
        );

        if (response.data && response.data.length > 0) {
          // If photos are fetched successfully, set them in the state
          setPhotos(response.data);
        } else {
          // If no photos are found, display a message
          setPhotos([]);
        }
      } catch (error) {
        // Handle errors
        console.error("Error fetching photos:", error);
        setError("Failed to fetch photos");
      }
    };

    fetchPhotos();
  }, [id]);

  return (
    <div className=" d-flex flex-column justify-content-center align-items-center bg-light vh-100 ">
      <h1>User Details</h1>
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <div>
          <h2> Name: {data.userName}</h2>
        </div>

        <div>
          <h2>Email: {data.email}</h2>
        </div>
        <div>
          <h2>Age: {data.age}</h2>
        </div>
        <div>
          <h2>Gender: {data.gender}</h2>
        </div>
        <div>
          <h2>User Photos</h2>
          {/* {error && <div>Error: {error}</div>}
          {photos.length === 0 && !error && <div>No photos found</div>} */}

          <div>
            <img
              src={`data:image/jpg;base64,${data.photo}`}
              alt="User Profile"
              style={{ maxWidth: "30rem", marginTop: "10px" }}
            />
          </div>
        </div>

        <Link to="/UserForm" className="btn btn-sm btn-primary me-2">
          GO Back
        </Link>
      </div>
    </div>
  );
};
export default ViewUser;
