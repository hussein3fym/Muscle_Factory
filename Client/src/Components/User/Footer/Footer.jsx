import React from "react";
import "./Footer.css"; // Import CSS for styling
import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="contact-withUs">
          <h1>Contact us</h1>
          <p>Get in touch with us for more information </p>
          <div className="contact-container">
            <div className="contact-card">
              <div className="contact-item">
                <IoLocationOutline className="icon" />
                <h2>Location</h2>
              </div>
              <p>1234 Street Name, City Name, United States</p>

              <div className="contact-item">
                <MdEmail className="icon" />
                <h2>Email</h2>
              </div>
              <p>musclesfactory101@gmail.com</p>

              <div className="contact-item">
                <FaPhoneAlt className="icon" />
                <h2>Phone</h2>
              </div>
              <p>123-456-7890</p>
            </div>
          </div>
        </div>
        {/*2*/}
        <div className="all-component">
          <h4>
            <Link to="/">Home</Link>
          </h4>
          <h4>
            <Link to="/Workout">Workout</Link>
          </h4>
          <h4>
            <Link to="/blog">Blog</Link>
          </h4>
          <h4>
            <Link to="/Nutrition">Nutrition</Link>
          </h4>
          <h4>
            <Link>ASK</Link>
          </h4>
        </div>
        {/*3*/}
        <div className="all-links">
          <h3>
            <Link to="">
              <FaFacebook className="icon-facebook" /> Facebook
            </Link>
          </h3>
          <h3>
            <Link to="">
              <FaInstagram className="icon-instagram" /> Instagram
            </Link>
          </h3>
          <h3>
            <Link to="">
              <FaYoutube className="icon-youtube" /> YouTube
            </Link>
          </h3>
        </div>
      </div>
      {/*4*/}
      <hr></hr>
      <div className="all-rights">
        <h3>@ {new Date().getFullYear()} BOONOS.EG All rights reserved.</h3>
        <h3>Terms.Privacy Policy</h3>
      </div>
    </div>
  );
};

export default Footer;
