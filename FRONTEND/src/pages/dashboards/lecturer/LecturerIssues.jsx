import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";
import DashboardLayout from "../../../layouts/DashboardLayout";
import "../../../css/dashboard.css";
import "../../../css/dashboardcss/Lecturer/LecturerIssues.css";

function LecturerIssues() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const [resolving, setResolving] = useState({}); // Track resolving state per issue

  // Fetch only assigned issues for this lecturer
  useEffect(() => {
    const fetchAssignedIssues = async () => {
      try {
        if (!user?.token) {
          setError("Please log in again.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://127.0.0.1:8000/api/issues/", {
          headers: { Authorization: `Token ${user.token}` },
        });

        // Filter issues assigned to this lecturer
        const assignedIssues = response.data.filter(issue => {
          // Check both possible assignment fields
          return (
            issue.assigned_to === user.id ||
            (issue.assigned_to?.id === user.id) ||
            issue.status === "assigned"
          );
        });

        setIssues(assignedIssues);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setError(error.response?.status === 401 
          ? "You are not authorized. Please log in again."
          : "Failed to fetch issues. Please try again."
        );
        setLoading(false);
      }
    };

    fetchAssignedIssues();
  }, [user]);

  // Mark issue as resolved
  const handleResolve = async (issueId) => {
    try {
      setResolving(prev => ({ ...prev, [issueId]: true }));
      
      await axios.post(
        `http://127.0.0.1:8000/api/issues/${issueId}/resolve/`,
        {},
        { headers: { Authorization: `Token ${user.token}` } }
      );

      // Update local state to reflect resolution
      setIssues(prev => prev.map(issue => 
        issue.id === issueId ? { ...issue, status: "resolved" } : issue
      ));
    } catch (error) {
      console.error("Failed to resolve issue:", error);
      alert("Failed to mark as resolved. Please try again.");
    } finally {
      setResolving(prev => ({ ...prev, [issueId]: false }));
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <DashboardLayout role="Lecturer">
      <div className="lec-issues-container">
        <div className="lec-issues-heading">
          <h1>Lecturer Issues</h1>
          <p>View and manage your assigned academic issues.</p>
        </div>

        {issues.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Student</th>
                <th>Student #</th>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue) => (
                <tr key={issue.id}>
                  <td>{issue.id}</td>
                  <td>{issue.user?.first_name} {issue.user?.last_name}</td>
                  <td>{issue.user?.student_number}</td>
                  <td>{issue.title}</td>
                  <td>{issue.category}</td>
                  <td className={`status-${issue.status}`}>
                    {issue.status}
                  </td>
                  <td>{new Date(issue.created_at).toLocaleDateString()}</td>
                  <td>
                    {issue.status !== "resolved" && (
                      <button
                        onClick={() => handleResolve(issue.id)}
                        disabled={resolving[issue.id]}
                        className="resolve-btn"
                      >
                        {resolving[issue.id] ? "Processing..." : "Resolve"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No assigned issues found.</p>
        )}
      </div>
    </DashboardLayout>
  );
}

export default LecturerIssues;