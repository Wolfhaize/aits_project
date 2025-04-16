import { useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import '../../../css/dashboardcss/lecturer/LecturerProfile.css';


function LecturerProfile() {
    // Define state for isLoggedIn and setIsLoggedIn
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
  
    return (
      <DashboardLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
        <div className="lecturer-profile-container">
          <div className="lecturer-heading">
          <h1>Lecturer Profile Page</h1>
          <p>View and update your profile details here.</p>
          </div>
          
        </div>
      </DashboardLayout>
    );
  }
  
  export default LecturerProfile;
  