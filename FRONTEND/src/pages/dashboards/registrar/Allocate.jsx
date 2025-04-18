import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from "../../../layouts/DashboardLayout";
import { useAuth } from "../../../contexts/AuthContext";
import "../../../css/dashboardcss/registrar/allocate.css";

const AllocateIssue = () => {
  const { id } = useParams(); // Get issue ID from URL
  const navigate = useNavigate();
  const { user } = useAuth();

  const [departments, setDepartments] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedLecturer, setSelectedLecturer] = useState('');
  const [issue, setIssue] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  // Fetch departments from API
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/departments/", {
          headers: {
            Authorization: `Token ${user.token}`,
          },
        });
        setDepartments(response.data);
      } catch (err) {
        console.error("Failed to fetch departments:", err);
      }
    };
    fetchDepartments();
  }, [user.token]);

  // Fetch issue details
  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/issues/${id}/`, {
          headers: {
            Authorization: `Token ${user.token}`,
          },
        });
        setIssue(response.data);
      } catch (err) {
        console.error("Failed to fetch issue:", err);
      }
    };
    fetchIssue();
  }, [id, user.token]);

  //Fetch lecturers for selected department
  useEffect(() => {
    const getLecturers = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/departments/${selectedDepartment}/lecturers/`,
          {
            headers: {
              Authorization: `Token ${user.token}`, // ✅ FIXED spacing here
            },
          }
        );
        setLecturers(response.data);
      } catch (error) {
        console.log('Error getting lecturers:', error);
      }
    };

    if (selectedDepartment) {
      getLecturers();
    }
  }, [selectedDepartment, user.token]);

  //Handle allocation
  const handleAllocate = async () => {
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/issues/${id}/assign/`,
        {
          assigned_to: selectedLecturer,
        },
        {
          headers: {
            Authorization: `Token ${user.token}`,
          },
        }
      );

      setMessage("Issue assigned to lecturer successfully!");
      setError(false);
      setTimeout(()=>setMessage(""),5000);
    } catch (err) {
      console.error("Allocation error:", err);
      setMessage("Failed to assign issue to lecturer");
      setError(true);
    }
  };

  return (
    <DashboardLayout role="registrar">
      <div className="allocate-issue-wrapper">
        <div className="allocate-issue-content">
        {message && (
          <p style={{ 
          color: error ? "red" : "green", 
          background: "#f9f9f9", 
          padding: "10px", 
          borderRadius: "5px", 
          border: `1px solid ${error ? "red" : "green"}` 
          }}>
            {message}
          </p>
        )}
          <h2>Allocate Issue</h2>

          {issue ? (
            <div>
              <h3>Issue Details:</h3>
              <p><strong>Student Name:</strong> {issue.user?.first_name} {issue.user?.last_name}</p>
              <p><strong>Student Number:</strong> {issue.user?.student_number}</p>
              <p><strong>Title:</strong> {issue.title}</p>
              <p><strong>Category:</strong> {issue.category}</p>
              <p><strong>Description:</strong> {issue.description}</p>
              <p><strong>Status:</strong> {issue.status}</p>
              <p><strong>Created at:</strong> {new Date(issue.created_at).toLocaleDateString()}</p>
            </div>
          ) : (
            <p>Loading issue details...</p>
          )}

          <div style={{ marginBottom: "10px" }}>
            <label><strong>Choose Department:</strong></label><br />
            <select onChange={e => setSelectedDepartment(e.target.value)} value={selectedDepartment}>
              <option value="">Select Department</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>

          {selectedDepartment && (
            <div style={{ marginBottom: "10px" }}>
              <label><strong>Choose Lecturer:</strong></label><br />
              <select onChange={e => setSelectedLecturer(e.target.value)} value={selectedLecturer}>
                <option value="">Select Lecturer</option>
                {lecturers.map((lec) => (
                  <option key={lec.id} value={lec.id}>
                    {lec.first_name} {lec.last_name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button onClick={handleAllocate} disabled={!selectedLecturer}>
            Assign Issue
          </button>

          <br /><br />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AllocateIssue;
