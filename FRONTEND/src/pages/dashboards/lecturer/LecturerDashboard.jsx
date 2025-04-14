import DashboardLayout from "../../../layouts/DashboardLayout";
import IssueCard from "../../../components/IssueCard";
import { useState } from "react";
// import "../../../css/dashboardcss/lecturer/LecturerDashboard.css"



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

  /* state to hold issues assigned to the lecturer */
  const [issues, setIssues] = useState([]);

  /*State to handle loading state and errors*/
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  /*function that handles logout in case the lecturer taps the logout button*/
  const handleLogout = () => {
    console.log('Logging out ...');
  };

  /*function is triggered whenever the lecturer types in the search bar*/
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  /* Fetch dashboard summary and issues when the component mount */
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch summary stats
        const summaryResponse = await fetch("/api/lecturer/summary");
        const summary = await summaryResponse.json();
        setDashboardData(summary);

        // Fetch issues assigned to lecturer
        const issuesResponse = await fetch("/api/lecturer/issues");
        const issuesData = await issuesResponse.json();
        setIssues(issuesData);

        setLoading(false);
      } catch (err) {
        setError("Failed to load dashboard data. Please try again later.");
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  /* filter issues based on input */
  const filteredIssues = issues.filter((issue) =>
    issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    issue.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    issue.courseCode.toLowerCase().includes(searchQuery.toLowerCase())
   


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
      <section className = 'dashboard-content'>
        <h2>Lecturer Dashboard</h2>
        <p>Manage student academic issues related to your courses.</p>

      {/* Show loading state if data is still being fetched */}
      {loading && <p>Loading dashboard data...</p>}

      {/* Show error if the API request fails */}
      {error && <p className = 'error-text'>{error}</p>}

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

    {/* Issues list section */}
    <section className="issues-section">
          <h3>Assigned Issues</h3>

          {/* No issues found */}
          {!loading && filteredIssues.length === 0 && (
            <p>No issues match your search.</p>
          )}

          {/* Issue cards */}
          <div className="issues-list">
            {filteredIssues.map((issue) => (
              <IssueCard
                key={issue.id}
                title={issue.title}
                studentName={issue.studentName}
                courseCode={issue.courseCode}
                dateReported={issue.dateReported}
                status={issue.status}
              />
            ))}
          </div>
        </section>
      </section>
    </DashboardLayout>
  );
};

export default LecturerDashboard;

    


















      
