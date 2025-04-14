import DashboardLayout from "../../../layouts/DashboardLayout";
import "../../../css/dashboardcss/student/StudentNotifications.css"



function StudentNotifications() {
  return (
    <DashboardLayout>
      <div className="student-notifications-container">
        <div className="student-notifs-heading">
        <h1>Student Notifications</h1>
        <p>Check your recent notifications here.</p>

        </div>
        
      </div>
    </DashboardLayout>
  );
}

export default StudentNotifications;
