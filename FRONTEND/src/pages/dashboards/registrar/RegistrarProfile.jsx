import DashboardLayout from "../../../layouts/DashboardLayout";
import React, { useState,useEffect } from "react";
import "../../../css/pagecss/registrarprofile.css";


function RegistrarProfile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordChangeStatus, setPasswordChangeStatus] = useState('');

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/profile/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error('Error fetching user profile');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Handle password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    const data = { old_password: oldPassword, new_password: newPassword, confirm_password: confirmPassword };

    const response = await fetch('http://127.0.0.1:8000/api/change-password/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setPasswordChangeStatus("Password updated successfully.");
    } else {
      setPasswordChangeStatus("Error updating password.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout>
      <div>
        <h1>Registrar Profile Page</h1>
        <p>View and update your profile details here.</p>

        {userData && (
          <div>
            <h2>Profile Information</h2>
            <p><strong>First Name:</strong> {userData.first_name}</p>
            <p><strong>Last Name:</strong> {userData.last_name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Registrar ID:</strong> {userData.registrar_id}</p>
          </div>
        )}

        <h2>Change Password</h2>
        <form onSubmit={handlePasswordChange}>
          <div>
            <label>Old Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Change Password</button>
        </form>

        {passwordChangeStatus && <p>{passwordChangeStatus}</p>}
      </div>
    </DashboardLayout>
  );
}

export default RegistrarProfile;






/*function RegistrarProfile() {
  return (
    <DashboardLayout>
      <div>
        <h1>Registrar Profile Page</h1>
        <p>View and update your profile details here.</p>
      </div>
    </DashboardLayout>
  );
}

export default RegistrarProfile;*/
