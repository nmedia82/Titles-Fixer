import React, { useState } from "react";
import logo from "./../images/Logo.png";
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
        alt="Title Fixer Online"
        className="app-logo img-fluid"
        style={{ width: "150px" }}
      />
      {!isLoggedIn() && <div className="display-6">TitleFixer App</div>}
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
            Login/Register
          </Button>
          <Button
            onClick={() => handleNavClick("Buy")}
            variant={activeNavItem === "" ? "primary" : "secondary"}
          >
            Packages
          </Button>
        </ButtonGroup>
      ) : (
        <nav>
          <Button variant="link">
            <span style={{ fontSize: ".75rem" }}>Hi, {User.fullname}</span>
          </Button>
          <ButtonGroup>
            <Button
              onClick={() => handleNavClick("Buy")}
              variant={activeNavItem === "Buy" ? "primary" : "success"}
            >
              Buy Credits
            </Button>
            <Button
              onClick={() => handleNavClick("Settings")}
              variant={activeNavItem === "Settings" ? "primary" : "success"}
            >
              Settings
            </Button>
            <Button
              onClick={() => handleNavClick("Logout")}
              variant={activeNavItem === "Logout" ? "primary" : "success"}
            >
              Logout
            </Button>
          </ButtonGroup>
        </nav>
      )}
    </div>
  );
};

export default Header;
