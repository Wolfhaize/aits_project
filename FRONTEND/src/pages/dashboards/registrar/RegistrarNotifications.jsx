import { useEffect, useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";

function RegistrarNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [status, setStatus] = useState("Connecting...");

  useEffect(() => {
    // Connect to Django WebSocket server
    const socket = new WebSocket("ws://localhost:8000/ws/notifications/");

    // WebSocket connected
    socket.onopen = () => {
      console.log("WebSocket Connected!");
      setStatus("Connected ✅");
    };

    // WebSocket receives a message
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setNotifications((prev) => [data.message, ...prev]);
    };

    // WebSocket error handling
    socket.onerror = (error) => {
      console.error("WebSocket Error:", error);
      setStatus("Connection Failed ❌");
    };

    // WebSocket disconnected
    socket.onclose = () => {
      console.warn("WebSocket Disconnected!");
      setStatus("Disconnected 🔴");
    };

    // Cleanup WebSocket when the component unmounts
    return () => socket.close();
  }, []);

  return (
    <DashboardLayout>
      <div>
        <h1>Registrar Notifications</h1>
        <p>Status: {status}</p>
        <ul>
          {notifications.length === 0 ? (
            <p>No new notifications.</p>
          ) : (
            notifications.map((notif, index) => (
              <li key={index} className="bg-gray-200 p-2 my-2 rounded">
                {notif}
              </li>
            ))
          )}
        </ul>
      </div>
    </DashboardLayout>
  );
}

export default RegistrarNotifications;
