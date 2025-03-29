import DashboardLayout from "../../../layouts/DashboardLayout";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../css/pagecss/issues.css";

const IssuesList = () => {
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/issues")
      .then((res) => res.json())
      .then((data) => setIssues(data))
      .catch((error) => console.error("Error fetching issues:", error));
  }, []);

  const handleView = (id) => {
    navigate(`/issues/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this issue?")) {
      fetch(`http://127.0.0.1:8000/api/issues/${id}`, { method: "DELETE" })
        .then(() => setIssues(issues.filter((issue) => issue.id !== id)))
        .catch((error) => console.error("Error deleting issue:", error));
    }
  };

  return (
    <DashboardLayout role="registrar">
      <div>
        <h1>Registrar Issues</h1>
        <p>View and manage academic Issues </p>
      </div>
      <h2>Academic Issues</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Student Name</th>
            <th>Student number</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue) => (
            <tr key={issue.id}>
              <td>{issue.id}</td>
              <td>{issue.student_name}</td>
              <td>{issue.description}</td>
              <td>{issue.status}</td>
              <td>
                <button onClick={() => handleView(issue.id)}>View</button>
                <button onClick={() => handleDelete(issue.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
};

export default IssuesList;
