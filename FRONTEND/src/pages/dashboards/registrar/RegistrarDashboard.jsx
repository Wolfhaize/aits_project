import DashboardLayout from "../../../layouts/DashboardLayout";
import IssueCard from "../../../components/IssueCard";
import React, {useEffect, useState} from 'react';


const RegistrarDashboard = () => {
  const[issues,setIssues] = useState([])
  const[stats,setStats] = useState({total:0,pending:0,resolved:0});
  useEffect(() =>{
        const fetchIssues = async () => {
          
        try{
        const response = await fetch("http://localhost:8000/api/issues");
        const data = await response.json();
        setIssues(data);
        const total = data.length;
        const pending = data.filter(issue => issue.status === 'pending').length;
        const resolved = data.filter(issue => issue.status === "resolved").length;
        setStats({total,pending,resolved});
      } catch(error){
        console.log("Error fetching issues:",error);
      }
    };
    fetchIssues();
  },[]);
  return (
    <DashboardLayout role="registrar">
      <h2>Registrar Dashboard</h2>
      <div style={{display:"flex",gap:"20px",marginTop:"20px"}}>
        <div>
          <h3>Total Issues</h3>
          <p>{stats.total}</p>
        </div>
        <div>
          <h3>Resolved Issues</h3>
          <p>{stats.resolved}</p>
        </div>
        <div>
          <h3>Pending Issues</h3>
          <p>{stats.pending}</p>
        </div>
      </div>
    </DashboardLayout>

    
  );
};

export default RegistrarDashboard;
