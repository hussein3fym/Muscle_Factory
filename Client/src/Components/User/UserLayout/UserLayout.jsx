import React from "react";
import "./Nav.css";
import Footer from "./../Footer/Footer";
import { Outlet } from "react-router-dom";
import Nav from "./../Nav/Nav";

const UserLayout = () => {
  return (
    <>
      <Nav />
      <div className="userLayout">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default UserLayout;
