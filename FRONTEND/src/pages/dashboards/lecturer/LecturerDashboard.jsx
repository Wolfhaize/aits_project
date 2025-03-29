import DashboardLayout from "../../../layouts/DashboardLayout";
import IssueCard from "../../../components/IssueCard";
import { useState } from "react";
 

/*LecturerDashboard component is the main dashboard for lecturers*/
/*it will display a header with the lecturer's name, department, search bar, and logout button*/
const  LecturerDashboard = ({lecturerName = 'John Doe', department= 'Computer Science'}) => {

  /*state to handle search input*/
  /*this will store the value entered by the lecturer in the searcg bar */
  const [searchQuery, setSearchQuery] = useState('');

  /*store dashboard data for the lecturer */
  /*these values would come from an API */
  const [dashboardData, setDashboardData] = useState({
    totalStudents : 50,
    unReslovedIssues: 10,
    resolvedIssues:200,
    pendingIssues: 10,
  });

  /*function is triggered whenever the lecturer types in the search bar*/
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  /*function that handles logout in case the lecturer taps the logout button*/
  const handleLogout = () => {
    console.log('Logging out ...');
  };

  return (
    <DashboardLayout>
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

        </div>

      </header>



      {/*main content of the dashboard */}
      <h2>Lecturer Dashboard</h2>
      <p>Manage student academic issues related to your courses.</p>

      {/*display values or data for the lecturer */}
      <div className= 'values-container'>
        <div className = 'values'>
          <h4>Total Students Assigned</h4>
          {/*dashboardData contains totalstudents, unresolvedtasks, resolvedtasks, and pending issues */}
          <p>{dashboardData.totalStudents}</p>
        </div>

        <div className = 'values'>
          <h4>Unresolved Issues</h4> {/*these are issues reported but not yet addressed  */}
          <p>{dashboardData.unReslovedIssues}</p>
        </div>

        <div className = 'values'>
          <h4>Resolved Issues</h4>
          <p>{dashboardData.resolvedIssues}</p>
        </div>

        <div className = 'values'>
          <h4>Pending issues</h4> {/* these are issues that are waiting on action by the lecturer*/}
          <p>{dashboardData.pendingIssues}</p>
        </div>
      </div>

      {/*issue cards for tasks and student-related issues */}
      <IssueCard title="Grade Correction Request" status="In Progress" />
    </DashboardLayout>
  );
};


export default LecturerDashboard;
