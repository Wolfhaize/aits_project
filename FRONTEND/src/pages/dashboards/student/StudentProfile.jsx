import { useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";

function StudentProfile() {
  // Define state for isLoggedIn and setIsLoggedIn
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  return (
    <DashboardLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
      <div>
        <h1>Student Profile Page</h1>
        <p>View and update your profile details here.</p>
      </div>
    </DashboardLayout>
  );
}

export default StudentProfile;
