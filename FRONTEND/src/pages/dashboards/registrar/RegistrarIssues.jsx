import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";
import DashboardLayout from "../../../layouts/DashboardLayout";
import "../../../css/dashboard.css";
import "../../../css/dashboardcss/registrar/RegistrarIssues.css";
import { useNavigate } from "react-router-dom";

function RegistrarIssues() {
  const [issues, setIssues] = useState([]); // Store all issues
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error handling state
  const { user } = useAuth(); // Get logged-in user
  const navigate = useNavigate();
  const handleAllocateClick = (id) => {
    navigate(`/Registrar/Issues/${id}`);
  };

  // Fetching all issues
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        if (!user || !user.token) {
          setError("User not authenticated. Please log in again.");
          setLoading(false);
          return;
        }

        console.log("User Token:", user.token);

        const response = await axios.get("http://127.0.0.1:8000/api/issues/", {
          headers: {
            Authorization: `Token ${user.token}`,
          },
        });

        console.log("Full API Response:", response.data);

        if (!Array.isArray(response.data)) {
          console.error("Error: API response is not an array", response.data);
          setError("Unexpected response format from server.");
          setLoading(false);
          return;
        }

        setIssues(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching issues:", error);
        if (error.response?.status === 401) {
          setError("You are not authorized. Please log in again.");
        } else {
          setError("Failed to fetch issues. Please try again.");
        }
        setLoading(false);
      }
    };

    if (user && user.token) {
      fetchIssues();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <DashboardLayout role="registrar">
      <div className="reg-issues-container">
        <div className="reg-issues-heading">
          <h1>Registrar Issues</h1>
          <p>View and manage all academic issues.</p>
        </div>

        {issues.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Student Name</th>
                <th>Student Number</th>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Allocate</th>
                {/* <th>Delete</th> */}
              </tr>
            </thead>
            <tbody>
              {issues.map((issue) => (
                <tr key={issue.id}>
                  <td>{issue.id}</td>
                  <td>
                    {issue.user?.first_name} {issue.user?.last_name}
                  </td>
                  <td>{issue.user?.student_number}</td>
                  <td>{issue.title}</td>
                  <td>{issue.category}</td>
                  <td>{issue.status}</td>
                  <td>{new Date(issue.created_at).toLocaleDateString()}</td>
                  <td>
                    {issue.status == "pending" && (
                      <button onClick={() => handleAllocateClick(issue.id)}>
                        Allocate
                      </button>
                    )}
                  </td>

                  {/* <td>
                    <button onClick={()=>handleDeleteClick(issue.id)}>Delete</button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No issues found.</p>
        )}
      </div>
    </DashboardLayout>
  );
}

export default RegistrarIssues;
