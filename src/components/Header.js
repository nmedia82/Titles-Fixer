import React, { useState } from "react";
import logo from "./../logo.svg";
import { ButtonGroup, Button } from "react-bootstrap";

const Header = ({ User, onNavClick, onLogout }) => {
  const [activeNavItem, setActiveNavItem] = useState("Home");

  const handleNavClick = (navItem) => {
    if (navItem === "Logout") return onLogout();
    setActiveNavItem(navItem);
    onNavClick(navItem);
    // Implement your own logic for navigation or other actions here
  };

  const isLoggedIn = () => {
    return User === null ? false : true;
  };

  return (
    <div className="d-flex justify-content-between align-items-center">
      <img
        src={logo}
        alt="Your Logo"
        className="app-logo img-fluid"
        style={{ width: "100px", height: "100px" }}
      />
      <div className="display-6">TitleFixer App</div>
      {!isLoggedIn() ? (
        <ButtonGroup>
          <Button
            onClick={() => handleNavClick("Home")}
            variant={activeNavItem === "Home" ? "primary" : "secondary"}
          >
            Home
          </Button>
          <Button
            onClick={() => handleNavClick("Login")}
            variant={activeNavItem === "Login" ? "primary" : "secondary"}
          >
            Login
          </Button>
          <Button
            onClick={() => handleNavClick("Register")}
            variant={activeNavItem === "Register" ? "primary" : "secondary"}
          >
            Register
          </Button>
        </ButtonGroup>
      ) : (
        <ButtonGroup>
          <Button variant="dark">
            <span style={{ fontSize: ".75rem" }}>Hi, {User.fullname}</span>
          </Button>
          <Button
            onClick={() => handleNavClick("Settings")}
            variant={activeNavItem === "Settings" ? "primary" : "secondary"}
          >
            Settings
          </Button>
          <Button
            onClick={() => handleNavClick("Logout")}
            variant={activeNavItem === "Logout" ? "primary" : "secondary"}
          >
            Logout
          </Button>
        </ButtonGroup>
      )}
    </div>
  );
};

export default Header;
