import DashboardLayout from "../../../layouts/DashboardLayout";
import React, { useEffect, useState } from "react";
import "../../../css/pagecss/registrardashboard.css";

const RegistrarDashboard = () => {
  const [issues, setIssues] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, resolved: 0 });

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/issues");
        const Issuelist = await response.json();
        setIssues(Issuelist);
        const total = Issuelist.length;
        const pending = Issuelist.filter((issue) => issue.status === "pending")
          .length;
        const resolved = Issuelist.filter(
          (issue) => issue.status === "resolved"
        ).length;
        setStats({ total, pending, resolved });
      } catch (error) {
        console.log("Error fetching issues:", error);
      }
    };
    fetchIssues();
  }, []);

  return (
    <DashboardLayout role="registrar">
      <h2>Registrar Dashboard</h2>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        {/* Total Issues */}
        <div className="stat-box">
          <h3>Total Issues</h3>
          <p>{stats.total}</p>
        </div>

        {/* Resolved Issues */}
        <div className="stat-box">
          <h3>Resolved Issues</h3>
          <p>{stats.resolved}</p>
        </div>

        {/* Pending Issues */}
        <div className="stat-box">
          <h3>Pending Issues</h3>
          <p>{stats.pending}</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RegistrarDashboard;
