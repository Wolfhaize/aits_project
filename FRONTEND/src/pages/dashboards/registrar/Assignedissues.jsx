import React, { useEffect, useState } from 'react';

const AssignedIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchassignedissues = async () => {
      try {
        const token = localStorage.getItem('token',response.token);
        const response = await fetch('http://localhost:8000/api/issues/?status=assigned',{
          headers:{
            'Authorization':`Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }

        );
        

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API response:", data);
        setIssues(data);
      } catch (error) {
        console.error('Error fetching assigned issues:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchassignedissues();
  }, []);

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2> Assigned Issues</h2>

      {loading ? (
        <p>Loading...</p>
      ) : issues.length === 0 ? (
        <p>No assigned issues found.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Student Name</th>
              <th>Student Number</th>
              <th>Title</th>
              <th>Assigned To</th>
              <th>Status</th>
              <th>Assigned Date</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr key={issue.id}>
                <td>{issue.id}</td>
                <td>{issue.user?.first_name} {issue.user?.last_name}</td>
                <td>{issue.user?.student_number}</td>
                <td>{issue.title}</td>
                <td>{issue.assigned_to}</td>
                <td>{issue.status}</td>
                <td>
                  {issue.assigned_at
                    ? new Date(issue.assigned_at).toLocaleDateString()
                    : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AssignedIssues;
