import React from "react";

const TrainerProfile = () => {
  return (
    <div className="trainer-profile">
      <h1>Trainer Profile</h1>
      <div>
        <h2>Basic Info</h2>
        <div>
          {/* <image>as</image> */}
          <p>First Name: John</p>
          <p>ID</p>
        </div>
        <div>
          <h2>Edit Basic Info</h2>
          <button>save</button>
          <button>cancel</button>
        </div>
      </div>
    </div>
  );
};

export default TrainerProfile;
