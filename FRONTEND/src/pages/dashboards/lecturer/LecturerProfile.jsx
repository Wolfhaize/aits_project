import { useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";




function LecturerProfile() {
  /*State for logged-in status for the lecturer*/
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  /* State to store the lecturer's profile information*/
  const [profile, setProfile] = useState({
    name: "Enter your name",
    email: "johndoe@example.com",
    department: "Enter your department",
  });

  /* State for form values entered by the lecturer*/
  const [formValues, setFormValues] = useState({ ...profile });
  /* set to profile so when the page first loads, the form fields are pre-filled with the current profile data*/

  /*Handle form input change*/
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  /*Handle form submission to update profile*/ 
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setProfile(formValues); /*Update profile with the form data, like the current information*/
    alert("Profile updated successfully!");
  };

  /*rendering the profile page*/
  return (
    <DashboardLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
      <div>
        <h1>Lecturer Profile Page</h1>
        <p>Edit profile details</p>

        {/* Profile Form */}
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="department">Department:</label>
            <input
              type="text"
              id="department"
              name="department"
              value={formValues.department}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Update Profile</button>
        </form>

        {/* Display the current profile information */}
        <div>
          <h2>Your Profile Information</h2>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Department:</strong> {profile.department}</p>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default LecturerProfile;

