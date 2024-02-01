import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const ViewUser = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:4100/users/" + id)
      .then((res) => setData(res.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, [id]);
  return (
    <div className=" d-flex flex-column justify-content-center align-items-center bg-light vh-100 ">
      <h1>User Details</h1>
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <div>
          <h2> Name: {data.name}</h2>
        </div>
        <div>
          <h2>Age: {data.age}</h2>
        </div>
        <div>
          <h2>Email: {data.email}</h2>
        </div>
        <div>
          <h2>Password: {data.password}</h2>
        </div>
        <Link to="/UserForm" className="btn btn-sm btn-primary me-2">
          GO Back
        </Link>
      </div>
    </div>
  );
};
export default ViewUser;
