import { useState, useEffect } from 'react';
import DashboardLayout from "../../../layouts/DashboardLayout";

function LecturerNotifications() {
  // State to hold the list of notifications
  const [notifications, setNotifications] = useState([]);

  // WebSocket connection initialization in useEffect
  useEffect(() => {
    // Step 1: Create a WebSocket connection to the server
    // Replace 'ws://localhost:8080' with the URL of your WebSocket server
    const socket = new WebSocket('ws://localhost:8080');

    // Step 2: Listen for incoming WebSocket messages
    socket.onmessage = (event) => {
      // Parse the incoming message, which is expected to be a JSON object
      const message = JSON.parse(event.data);
      
      // Check if the message is a notification
      if (message.type === 'notification') {
        // Step 3: Update the notifications state with the new notification message
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          message.message, // Add new message to the notifications array
        ]);
      }
    };

    // Step 4: Handle WebSocket connection open event (optional)
    socket.onopen = () => {
      console.log("WebSocket connection established!");
    };

    // Step 5: Handle WebSocket connection error event
    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Step 6: Handle WebSocket close event
    socket.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    // Cleanup function to close WebSocket when the component is unmounted
    return () => {
      socket.close(); // Close the WebSocket connection
      console.log("WebSocket connection closed during cleanup.");
    };
  }, []); // Empty dependency array ensures the connection is established only once when the component mounts

  return (
    <DashboardLayout>
      <div>
        <h1>Lecturer Notifications</h1>
        <p>Check your recent notifications here.</p>

        {/* Step 7: Display the notifications */}
        <div className="notifications-section">
          {/* If no notifications, show a placeholder message */}
          {notifications.length === 0 ? (
            <p>No new notifications.</p>
          ) : (
            // Otherwise, render the list of notifications
            <ul className="notification-list">
              {notifications.map((notification, index) => (
                <li key={index} className="notification-item">
                  <p>{notification}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default LecturerNotifications;
