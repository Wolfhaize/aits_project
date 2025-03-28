import { useState, useEffect } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
//declaring state for the registrar's profile by defining a component(RegistrarProfile)
function RegistrarProfile() {
  const [registrar, setRegistrar] = useState({
    firstName: "",
    lastName: "",
    email: "",
    registrarId: "",
  });

  useEffect(() => {
    // Fetching registrar's information depending on what was submitted when signing in 
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("authToken"); //Retrieving authentication token from the local storage
        const response = await fetch("http://localhost:8000/api/profile/", { //sending a get request to that API to fetch profile data
          method: "GET", 
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const registrarinfo = await response.json();//converting the response data into js object and converting response from API into json data
        setRegistrar({ //updating the registrar state
          firstName: registrarinfo.first_name,
          lastName: registrarinfo.last_name,
          email: registrarinfo.email,
          registrarId: registrarinfo.registrar_id,
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <DashboardLayout>
      <div style={styles.container}>
        <h1>Registrar Profile</h1>
        <div style={styles.profileInfo}>
          <p><strong>First Name:</strong> {registrar.firstName}</p>
          <p><strong>Last Name:</strong> {registrar.lastName}</p>
          <p><strong>Email:</strong> {registrar.email}</p>
          <p><strong>Registrar ID:</strong> {registrar.registrarId}</p>
        </div>
      <div>
        <h1>Change Password</h1>
        <p>To change password fill these fields;</p>
        <p>Old Password:<span contentEditable="true" class = "editable"></span></p>
        <p>New Password:<span contentEditable = "true" class="editable"></span></p>
        <p>Confirm Password:<span contentEditable="true" class = "editable"></span></p>

      </div>
      </div>
    </DashboardLayout>
  );
}

//css styles for the container 
const styles = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  profileInfo: {
    marginTop: "20px",
    fontSize: "16px",
    color: "#333",
  },

  Editable:{
    display:"inline",
    outline: "none",
    cursor: "text",


  },
};


export default RegistrarProfile;
