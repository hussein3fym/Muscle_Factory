import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Container } from "react-bootstrap";
import SideNav from "./SideNav";
import "./TrainerPanel.css";

const TrainerLayout = () => {
  return (
    <div className="Dashboard">
      <Header />
      <SideNav />
      <main className="main">
        <Container className="container__dashboard">
          <Outlet />
        </Container>
      </main>
    </div>
  );
};

export default TrainerLayout;
