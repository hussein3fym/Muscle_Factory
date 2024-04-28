// Model.js
import React, { useState } from "react";
import SideBar from "./components/SideBar/SideBar";
import Main from "./components/Main/Main";
import "./index.css";

const Model = () => {
  const [mainContent, setMainContent] = useState("Initial content");

  // Function to reload the content of the main section
  const reloadMainContent = () => {
    // You can fetch new content from an API or update it based on some logic
    const newContent = "New content after reload";
    setMainContent(newContent);
  };

  return (
    <div className="model-container">
      <SideBar reloadMainContent={reloadMainContent} />
      <Main content={mainContent} />
    </div>
  );
};

export default Model;
