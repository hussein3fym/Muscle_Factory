import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AdminViewExercises = () => {
  const [adminExerciseData, setAdminExerciseData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get("  https://localhost:7095/api/Exercises/" + id)
      .then((res) => {
        //if (res.data.image ) {
        //const base64Image = arrayBufferToBase64(res.data.image.data);
        //setAdminExerciseData({
        //...res.data,
        //image: base64Image,
        //});
        //}
        setAdminExerciseData(res.data);
        console.log("Fetched Exercises Data:", res.data);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, [id]);

  /*const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };*/

  return (
    <div className="app">
      <div className="BMcontainer">
        <h1 className="BMtitle">Welcome Trainer</h1>
        <div>
          <h4> Exercise Name: {adminExerciseData.exerciseName}</h4>
          <p> The Equipment: {adminExerciseData.equipment} </p>
          <p> Target Muscle: {adminExerciseData.targetMuscle} </p>
          <p> Secondary Muscle:{adminExerciseData.secondaryMuscle} </p>
          <p> Instructions:{adminExerciseData.instructions} </p>
          {adminExerciseData.video && (
            <div>
              Video:
              <video
                controls
                style={{
                  width: "266px",
                  height: "266px",
                  border: "1px solid black",
                }}
              >
                <source
                  src={`data:video/mp4;base64,${adminExerciseData.video}`}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          {adminExerciseData.image && (
            <div>
              Image :
              <img
                src={`data:image/jpg;base64,${adminExerciseData.image}`}
                alt="Exercise Image"
                style={{
                  width: "100px",
                  height: "100px",
                  border: "1px solid black",
                }}
              />
            </div>
          )}

          <p> Level Suggestion:{adminExerciseData.level} </p>
        </div>
      </div>
    </div>
  );
};

export default AdminViewExercises;
