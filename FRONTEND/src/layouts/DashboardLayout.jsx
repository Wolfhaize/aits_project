import React, { useState } from "react";
import TopNavbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../css/dashboard.css"; // Optional for styling
import { useRole } from "../contexts/RoleContext"; // Import the custom hook

const DashboardLayout = ({ children, isLoggedIn, setIsLoggedIn }) => {
  const { role } = useRole();  // Get the current role from context
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);

  return (
    <div className="dashboard-container">
      <TopNavbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setName={setName} setEmail={setEmail} />
      <div className="dashboard-content">
        <Sidebar role={role} /> {/* Pass role to Sidebar */}
        <main className="main-content">
          {name && email ? (
            <div className="user-info">
              <h3>Welcome, {name}</h3>
              <p>Email: {email}</p>
            </div>
          ) : (
            <p>Loading user information...</p>
          )}
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
