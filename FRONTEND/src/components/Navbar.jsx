import React from "react";
import "../css/componentcss/Navbar.css";
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Dropdown from 'react-bootstrap/Dropdown';
import { useAuth } from "../contexts/AuthContext"; // Import useAuth

const TopNavbar = (props) => {
  let navigate = useNavigate();
  const { setName, setEmail } = props;

  // Use isLoggedIn and logout from AuthContext
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    // Call the logout function from AuthContext
    logout();

    // Reset any local state (if needed)
    setName(null);
    setEmail(null);

    // Navigate to the home page or login page
    navigate("/");

    // Show logout success message
    toast.success("You are successfully logged out!");
  };

  return (
    <Navbar className="navbar">
      <div className="navbar-left">
        <Navbar.Brand href="/" className="logo">
          AITS
        </Navbar.Brand>
      </div>
      <div className="navbar-center">
        {isLoggedIn && ( // Use isLoggedIn from AuthContext
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Profile
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Settings</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Help</Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Log Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
    </Navbar>
  );
};

export default TopNavbar;