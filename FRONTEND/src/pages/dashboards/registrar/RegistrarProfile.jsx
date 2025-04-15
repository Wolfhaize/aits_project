import { useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import '../../../css/dashboardcss/registrar/RegistrarProfile.css';


function RegistrarProfile() {
    // Define state for isLoggedIn and setIsLoggedIn
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
  
    return (
      <DashboardLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
        <div className="registrar-profile-container">
          <div className="registrar-heading">
          <h1>Registrar Profile Page</h1>
          <p>View and update your profile details here.</p>
          </div>
          
        </div>
      </DashboardLayout>
    );
  }
  
  export default RegistrarProfile;
  