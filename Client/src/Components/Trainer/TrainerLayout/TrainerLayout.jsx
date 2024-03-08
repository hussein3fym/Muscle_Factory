import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import TrainerProfile from "./TrainerProfile";

const TrainerLayout = () => {
  return (
    <div>
      <Header />
      <TrainerProfile />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default TrainerLayout;
