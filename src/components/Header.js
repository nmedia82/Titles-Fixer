import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import logo from "./../images/Logo-white.svg";
import "../App.css";

const Header = ({ User, onNavClick, activeNavItem }) => {
  const isLoggedIn = () => {
    return User !== null;
  };

  return (
    <Navbar bg="" expand="lg" className="app-header">
      <Navbar.Brand href="#home" onClick={() => onNavClick("Home")}>
        <img
          src={logo}
          alt="Title Fixer Online"
          className="app-logo img-fluid"
          style={{ width: "200px", cursor: "pointer" }}
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav className="ml-auto d-flex align-items-center">
          {!isLoggedIn() ? (
            <>
              <Nav.Link
                onClick={() => onNavClick("Home")}
                active={activeNavItem === "Home"}
              >
                My Sites
              </Nav.Link>
              <div className="nav-separator"></div>
              <Nav.Link
                onClick={() => onNavClick("Buy")}
                active={activeNavItem === "Buy"}
              >
                Packages
              </Nav.Link>
              <div className="nav-separator"></div>
              <Nav.Link
                onClick={() => onNavClick("Login")}
                active={activeNavItem === "Login"}
              >
                Login
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Item>
                <span style={{ fontSize: ".75rem" }}>Hi, {User.fullname}</span>
              </Nav.Item>
              <div className="nav-separator"></div>
              <Nav.Link
                className="nav-color"
                onClick={() => onNavClick("Home")}
                active={activeNavItem === "Home"}
              >
                My Sites
              </Nav.Link>
              <div className="nav-separator"></div>
              <Nav.Link
                className="nav-color"
                onClick={() => onNavClick("Credits")}
                active={activeNavItem === "Credits"}
              >
                Credits
              </Nav.Link>
              <div className="nav-separator"></div>
              <Nav.Link
                className="nav-color"
                onClick={() => onNavClick("Buy")}
                active={activeNavItem === "Buy"}
              >
                Packages
              </Nav.Link>
              <div className="nav-separator"></div>
              <Nav.Link
                className="nav-color"
                onClick={() => onNavClick("Logout")}
                active={activeNavItem === "Logout"}
              >
                Logout
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
