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
};