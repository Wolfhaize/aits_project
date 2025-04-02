import { useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import "../../../css/dashboard.css"


function StudentProfile() {
  // Define state for isLoggedIn and setIsLoggedIn
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  return (
    <DashboardLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
      <div>
        <div className="heading">
        <h1>Student Profile Page</h1>
        <p>View and update your profile details here.</p>
        </div>
        
      </div>
    </DashboardLayout>
  );
}

export default StudentProfile;
