import DashboardLayout from "../../../layouts/DashboardLayout";
import IssueCard from "../../../components/IssueCard";


/*LecturerDashboard component is the main dashboard for lecturers*/
/*it will display a header with the lecturer's name, department, search bar, and logout button*/
const LecturerDashboard = ({lecturerName, department}) => {

  /*state to handle search input*/
  /*this will store the value entered by the lecturer in the searcg bar */
  const [searchQuery, setSearchQuery] = useState('');

  /*function is triggered whenever the lecturer types in the search bar*/
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  /*function that handles logout in case the lecturer taps the logout button*/
  const handleLogout = () => {
    console.log('Logging out ...');
  };
  
  return (
    <DashboardLayout role="Lecturer">
      <h2>Lecturer Dashboard</h2>
      <p>Manage student academic issues related to your courses.</p>
      <IssueCard title="Grade Correction Request" status="In Progress" />
    </DashboardLayout>
  );
};

export default LecturerDashboard;
