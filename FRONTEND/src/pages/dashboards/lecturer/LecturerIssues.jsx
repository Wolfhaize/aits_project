import DashboardLayout from "../../../layouts/DashboardLayout";
import React,{useState, useEffect} from 'react';


function LecturerIssues() {
  /*sample data for issues, comes from API */
  const [issues, setIssues]= useState([]);
  const [loading, setLoading] = useState(true); /*for showing a loading spinner */
  const [error, setError] = useState(null); /*to handle errors during fetch */

  /*fetch issues data from API */
  useEffect (() => {
    const fetchIssues = async() => {
      try{
        /*replace with actual API URL */
        const response = await fetch('/api/issues');

        if (!response.ok) {
          throw new Error('Failed to fetch issues');

        }
        const data = await response.json();
        setIssues(data); /*set issues data in state */
      } catch (err) {
        setError(err.message);
      } finally{
        setLoading(false);   /*once done, stop loading spinner */
      }
      
      };

      fetchIssues(); /*call the function to fetch issues */

    }, []); /*empty array enseures this only runs once the component mounts */


    
};
  
  return (
    <DashboardLayout>
      <div>
        <h1>Lecturer Issues</h1>
        <p>View and manage academic issues.</p>
      </div>
    </DashboardLayout>
  );


export default LecturerIssues;
