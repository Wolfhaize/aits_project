import DashboardLayout from "../../../layouts/DashboardLayout";
import IssueCard from "../../../components/IssueCard";

const LecturerDashboard = () => {
  return (
    <DashboardLayout role="lecturer">
      <h2>Lecturer Dashboard</h2>
      <p>Manage student academic issues related to your courses.</p>
      <IssueCard title="Grade Correction Request" status="In Progress" />
    </DashboardLayout>
  );
};

export default LecturerDashboard;
