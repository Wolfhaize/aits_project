import DashboardLayout from "../../../layouts/DashboardLayout";
import IssueCard from "../../../components/IssueCard";
import { useState, useEffect } from "react";
 

/*LecturerDashboard component is the main dashboard for lecturers*/
/*it will display a header with the lecturer's name, department, search bar, and logout button*/
const  LecturerDashboard = ({lecturerName = 'John Doe', department= 'Computer Science'}) => {

  /*state to handle search input*/
  /*this will store the value entered by the lecturer in the searcg bar */
  const [searchQuery, setSearchQuery] = useState('');

  /*store dashboard data for the lecturer */
  /*these values would come from an API */
  const [dashboardData, setDashboardData] = useState({
    totalStudents : 0,
    unReslovedIssues: 0,
    resolvedIssues:0,
    pendingIssues: 0,
  });

  /*State to handle loading state and errors*/
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /*function is triggered whenever the lecturer types in the search bar*/
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  /*function that handles logout in case the lecturer taps the logout button*/
  const handleLogout = () => {
    console.log('Logging out ...');
  };

  /* Fetch the dashboard data from the API on component mount*/
  useEffect(() => {
    /*Step 1: Define the API endpoint (replace with the actual API endpoint)*/
    const apiUrl = "https://your-api.com/dashboardData"; // Example API URL

    /*Step 2: Make the API request to fetch data*/
    const fetchDashboardData = async () => {
      try {
        setLoading(true); /*Set loading to true while fetching data*/
        const response = await fetch(apiUrl);
        
        /* Check if the response is OK*/
        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }
        
        const data = await response.json();
        
        /* Step 3: Update state with the fetched data*/
        setDashboardData({
          totalStudents: data.totalStudents,
          unResolvedIssues: data.unResolvedIssues,
          resolvedIssues: data.resolvedIssues,
          pendingIssues: data.pendingIssues,
        });
        setLoading(false); /*Set loading to false when data is fetched*/
      } catch (error) {
        setError(error.message); /* Set error if any*/
        setLoading(false); /*Set loading to false if there's an error*/
      }
    };

    /*Step 4: Call the fetch function*/
    fetchDashboardData();
  }, []); /* Empty dependency array ensures the effect runs only once when the component mounts*/


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

      {/* Show loading state if data is still being fetched */}
      {loading && <p>Loading dashboard data...</p>}

      {/* Show error if the API request fails */}
      {error && <p>Error: {error}</p>}

      {/* Display values or data for the lecturer */}
      {!loading && !error && (
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
      )}

      {/*issue cards for tasks and student-related issues */}
      <IssueCard title="Grade Correction Request" status="In Progress" />
    </DashboardLayout>
  );
};


export default LecturerDashboard;
