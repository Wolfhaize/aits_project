import DashboardLayout from "../../../layouts/DashboardLayout";
import React, { useEffect, useState } from "react";
import "../../../css/dashboardcss/Lecturer/LecturerDashboard.css";
import { useAuth } from "../../../contexts/AuthContext";
import axios from "axios";

const LecturerDashboard = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        if (!user || !user.token) {
          setError("User not authenticated. Please log in again.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://127.0.0.1:8000/api/issues/", 
          {
            headers: {
              Authorization: `Token ${user.token}`,
            },
          });
          console.log("API Issues Data:", response.data); // Log all issues

        if (!Array.isArray(response.data)) {
          setError("Unexpected response format from server.");
          setLoading(false);
          return;
        }

        // Filter issues assigned to the current lecturer
        const lecturerIssues = response.data.filter(issue => 
          issue.assigned_to?.id === user.id 
        );
        
        setIssues(lecturerIssues);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching issues:", error);
        setError(error.response?.status === 401 
          ? "You are not authorized. Please log in again."
          : "Failed to fetch issues. Please try again."
        );
        setLoading(false);
      }
    };

    fetchIssues();
  }, [user]); // Add user to dependency array

  

  // Calculate statistics
  const assignedIssues = issues.length;
  const resolvedIssues = issues.filter(issue => issue.status?.toLowerCase() === 'resolved').length;
const pendingIssues = issues.filter(issue => issue.status?.toLowerCase() !== 'resolved').length;

console.log("Lecturer Issues:", issues);
console.log("Resolved:", resolvedIssues);
console.log("Pending:", pendingIssues);




  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <DashboardLayout role="Lecturer">
      <div className="lecturer-dashboard-container">
        <div className="lec-heading-dash">
          <h2>Lecturer Dashboard</h2>
        
          <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
            <div className="stat-box">
              <h3>Assigned Issues</h3>
              <p>{assignedIssues}</p>
            </div>

            <div className="stat-box">
              <h3>Resolved Issues</h3>
              <p>{resolvedIssues}</p>
            </div>

            <div className="stat-box">
              <h3>Pending Issues</h3>
              <p>{pendingIssues}</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LecturerDashboard;