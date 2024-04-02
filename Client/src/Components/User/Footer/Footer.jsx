import React, { useState, useEffect } from "react";
import "./Footer.css"; // Import CSS for styling

const Footer = () => {
  /* const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      const isAtBottom = scrollTop + windowHeight >= documentHeight;

      setIsVisible(isAtBottom);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); {`footer-container ${isVisible ? "visible" : ""}`}*/

  return (
    <footer className="footer">
      <div className="footer-content">
        <h4 className="Privacy">Privacy | Terms and condition </h4>
        <span className="footer-name">
          © 2024 All rights reserved. boonos eg
        </span>
      </div>
    </footer>
  );
};

export default Footer;
