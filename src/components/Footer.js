import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import logo from "./../images/Logo-white.svg";
import FacebookIcon from "../images/facebook.png";
import InstagramIcon from "../images/instagram.png";
import TwitterIcon from "../images/twitter.png";
import LinkedinIcon from "../images/linkedin.png";
import PrivacyPolicy from "./PrivacyPolicy";

const Footer = ({ onNavClick, activeNavItem }) => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          {/* First Section - Company Logo and Text */}
          <div className="col-md-4">
            <img
              src={logo}
              alt="Title Fixer Online"
              className="app-logo img-fluid mb-4"
              style={{ width: "200px", cursor: "pointer" }}
            />
            <p className="mt-2">
              Create best titles for your products and increase sales.
            </p>
          </div>

          {/* Second Section - Contact Details */}
          <div className="col-md-4">
            <h5 className="mb-4">Contact Us</h5>
            <p>Email: example@example.com</p>
            <p>Phone: +1234567890</p>
          </div>

          {/* Third Section - Follow Us and Privacy Policy */}
          <div className="col-md-4">
            <h5 className="mb-4">Help</h5>
            <Nav>
              <Nav.Link
                className="privacy-nav-item"
                onClick={() => onNavClick("PrivacyPolicy")}
                active={activeNavItem === "PrivacyPolicy"}
              >
                Privacy Policy
              </Nav.Link>
            </Nav>
            {/* <h5 className="mt-3">Follow Us</h5> */}
            <ul className="list-inline mt-3 mb-3">
              <li className="list-inline-item mr-2">
                <a href="#">
                  <img
                    src={FacebookIcon}
                    alt="Facebook"
                    className="w-50 h-50"
                  />
                </a>
              </li>
              <li className="list-inline-item mr-2">
                <a href="#">
                  <img
                    src={InstagramIcon}
                    alt="Instagram"
                    className="w-50 h-50"
                  />
                </a>
              </li>
              <li className="list-inline-item mr-2">
                <a href="#">
                  <img
                    src={LinkedinIcon}
                    alt="Linkedin"
                    className="w-50 h-50"
                  />
                </a>
              </li>
              <li className="list-inline-item mr-2">
                <a href="#">
                  <img src={TwitterIcon} alt="Twitter" className="w-50 h-50" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-12 text-center border-top pt-3">
            <p>
              &copy; Copyright 2024 | All Rights Reserved | Powered by
              TitleFixer
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
