import DashboardLayout from "../../../layouts/DashboardLayout";
import IssueCard from "../../../components/IssueCard";
import IssueForm from "../../../components/IssueForm";  // Assuming you have a form component for issues
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";  // Assuming you're using React Router for navigation

const StudentDashboard = () => {
  const [issues, setIssues] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Fetch the issues and notifications when the dashboard loads
  useEffect(() => {
    // You should replace these with actual API calls
    fetchIssues();
    fetchNotifications();
  }, []);

  // Fetch student's issues (Replace with API call)
  const fetchIssues = async () => {
    // Example: Replace this with an actual API call
    const response = await fetch("/api/issues?student=true"); // Adjust based on your API
    const data = await response.json();
    setIssues(data);
  };

  // Fetch student's notifications (Replace with API call)
  const fetchNotifications = async () => {
    // Example: Replace this with an actual API call
    const response = await fetch("/api/notifications?student=true"); // Adjust based on your API
    const data = await response.json();
    setNotifications(data);
  };

  return (
    <DashboardLayout role="student">
      <h2>Student Dashboard</h2>
      <p>Submit and track academic issues.</p>
      
      {/* Issue Submission Form */}
      <IssueForm />

      <section>
        <h3>Ongoing Issues</h3>
        {/* Display a list of issues with a simple IssueCard component */}
        {issues.length > 0 ? (
          issues.map((issue) => (
            <IssueCard
              key={issue.id}
              title={issue.title}
              status={issue.status}
              // Add other necessary fields like due dates, assignees, etc.
            />
          ))
        ) : (
          <p>No ongoing issues at the moment.</p>
        )}
      </section>

      <section>
        <h3>Recent Notifications</h3>
        {/* Display notifications with links to the notification page for more details */}
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div key={notification.id} className="notification-card">
              <p>{notification.message}</p>
              <Link to="/notifications">View all notifications</Link>
            </div>
          ))
        ) : (
          <p>No new notifications.</p>
        )}
      </section>

    </DashboardLayout>
  );
};

export default StudentDashboard;
