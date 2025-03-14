
import { Link } from "react-router-dom";
import React from "react";
import "../css/componentcss/Navbar.css";
import Navbar from 'react-bootstrap/Navbar';

const TopNavbar = () => {
  return (
    <Navbar className="navbar">
      <div className="navbar-left">
        <Navbar.Brand href="/" className="logo">
          AITS
        </Navbar.Brand>
      </div>
      <div className="navbar-center">
        <ul className="nav-links">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </ul>
      </div>
    </Navbar>
  );
};

export default TopNavbar;
