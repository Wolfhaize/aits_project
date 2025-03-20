import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext"; // Import useAuth
import DashboardLayout from "../../../layouts/DashboardLayout";

function StudentIssues() {
  const [issues, setIssues] = useState([]); // State to store issues
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(""); // State to handle errors
  const { user } = useAuth(); // Get the logged-in user from AuthContext

  // Fetch issues created by the logged-in user
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        if (!user || !user.token) {
          throw new Error("User not authenticated. Please log in again.");
        }

        // Log the token for debugging
        console.log("User Token:", user.token);

        // Fetch issues from the API
        const response = await axios.get("http://127.0.0.1:8000/api/issues/", {
          headers: {
            Authorization: `Token ${user.token}`, // Include the token in the headers
          },
        });

        // Log the full API response for debugging
        console.log("API Response:", response.data);

        // Filter issues by the logged-in user's student_number
        const userIssues = response.data.filter(
          (issue) => issue.student_number === user.student_number
        );

        // Log the filtered issues for debugging
        console.log("Filtered Issues:", userIssues);

        setIssues(userIssues); // Set the filtered issues
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error("Error fetching issues:", error);

        // Handle 401 Unauthorized error
        if (error.response && error.response.status === 401) {
          setError("You are not authorized. Please log in again.");
        } else {
          setError("Failed to fetch issues. Please try again.");
        }

        setLoading(false);
      }
    };

    fetchIssues();
  }, [user]); // Re-fetch issues if the user changes

  if (loading) {
    return <div>Loading...</div>; // Show a loading message
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>; // Show an error message
  }

  return (
    <DashboardLayout>
      <div>
        <h1>Student Issues</h1>
        <p>View and manage academic issues.</p>

        {/* Display issues in a table */}
        {issues.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue) => (
                <tr key={issue.id}>
                  <td>{issue.title}</td>
                  <td>{issue.category}</td>
                  <td>{issue.status}</td>
                  <td>{new Date(issue.created_at).toLocaleDateString()}</td>
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

export default StudentIssues;