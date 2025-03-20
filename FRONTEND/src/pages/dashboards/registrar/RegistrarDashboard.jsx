import DashboardLayout from "../../../layouts/DashboardLayout";
import IssueCard from "../../../components/IssueCard";

const RegistrarDashboard = () => {
  return (
    <DashboardLayout role="registrar">
      <h2>Registrar Dashboard</h2>
      <p>Monitor and assign academic issues to departments.</p>
      <IssueCard title="Course Transfer Request" status="Resolved" />
    </DashboardLayout>
  );
};

export default RegistrarDashboard;
