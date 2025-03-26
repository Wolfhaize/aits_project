import DashboardLayout from "../../../layouts/DashboardLayout";
import IssueCard from "../../../components/IssueCard";
import { useState } from "react";


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
      {/*header section will be displayed at the top of the dashboard */}
      <header className = 'dashboard-header'>
        <div className = 'header-container'>
          <h1 className = 'project-name'>Welcome to AITS</h1>

          {/*lecturer infor, displaying lecturer name and department */}
          {/*the values are passed in as props */}
          <div className = 'lecturer-infor'>
            <span className = 'lecturer-name'>{lecturerName}</span>
            <span className = 'department-name'>{department}</span>
          </div>

          {/*search bar, allows the lecturer to search for marks or any relevant information */}
          {/*search input is controlled by the search query state */}
          <input type="text" 
          className = 'search-bar'
          placeholder = 'search here...'
          value = {searchQuery} /*bind the input value to the state */
          onChange = {handleSearchChange}
          />

          {/*logout button, logs the lecturer out if clicked */}
          <button className = 'logout-button' onClick = {handleLogout}>Logout</button>

          {/*main content of the dashboard */}
          

        </div>

      </header>

      {/*main content of the dashboard */}
      <h3>Lecturer Dashboard</h3>
      <p>Manage student academic issues related to your courses.</p>
      <IssueCard title="Grade Correction Request" status="In Progress" />
    </DashboardLayout>
  );
};

export default LecturerDashboard;
