import React from "react";
import "./Dashboard.css";
import { Outlet } from "react-router-dom";
import SideBar from "../../../Scenes/Global/SideBar";
import TopBar from "../../../Scenes/Global/TopBar";
import { Container } from "react-bootstrap";

const AdminLayout = () => {
  return (
    <div className="Dashboard">
      <TopBar />
      <SideBar />
      <main className="main">
        <Container className="container__dashboard">
          <Outlet />
        </Container>
      </main>
    </div>
  );
};

export default AdminLayout;
