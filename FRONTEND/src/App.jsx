import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./css/App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";


// Import Role-based Dashboard Pages
import StudentDashboard from "./pages/dashboards/student/StudentDashboard";
import LecturerDashboard from "./pages/dashboards/lecturer/LecturerDashboard";
import RegistrarDashboard from "./pages/dashboards/registrar/RegistrarDashboard";

// Import other role-specific pages
import StudentIssues from "./pages/dashboards/student/StudentIssues"; // Example for student, similar for others
import StudentNotifications from "./pages/dashboards/student/StudentNotifications";
import StudentProfile from "./pages/dashboards/student/StudentProfile";

import LecturerIssues from "./pages/dashboards/lecturer/LecturerIssues"; // Example for lecturer, similar for others
import LecturerNotifications from "./pages/dashboards/lecturer/LecturerNotifications";
import LecturerProfile from "./pages/dashboards/lecturer/LecturerProfile";

import RegistrarIssues from "./pages/dashboards/registrar/RegistrarIssues"; // Example for registrar, similar for others
import RegistrarNotifications from "./pages/dashboards/registrar/RegistrarNotifications";
import RegistrarProfile from "./pages/dashboards/registrar/RegistrarProfile";
import IssueDetails from "./pages/dashboards/registrar/IssueDetails";

import { RoleProvider } from "./contexts/RoleContext";
import { AuthProvider } from "./contexts/AuthContext"; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div>
      <AuthProvider>
      <RoleProvider>
        <main
          className="main-content"
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
        >
          <Routes>
            <Route
              path="/"
              element={
                <Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              }
            />
            <Route
              path="/login"
              element={
                <Login
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  setName={setName}
                  setEmail={setEmail}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <Signup
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  setName={setName}
                  setEmail={setEmail}
                />
              }
            />

            <Route
              path="forgotPassword"
              exact
              element={<ForgotPassword isLoggedIn={isLoggedIn} />}
            />
            <Route
              path="resetPassword"
              element={<ResetPassword isLoggedIn={isLoggedIn} />}
            />

            {/* Role-based Dashboards */}
            <Route
              path="/dashboards/student/student-dashboard"
              element={<StudentDashboard />}
            />
            <Route
              path="/dashboards/lecturer/lecturer-dashboard"
              element={<LecturerDashboard />}
            />
            <Route
              path="/dashboards/registrar/registrar-dashboard"
              element={<RegistrarDashboard />}
            />

            {/* Role-specific Issues */}
            <Route
              path="/dashboards/student/issues"
              element={<StudentIssues />}
            />
            <Route
              path="/dashboards/lecturer/issues"
              element={<LecturerIssues />}
            />
            <Route
              path="/dashboards/registrar/issues"
              element={<RegistrarIssues />}
            />

            {/* Role-specific Notifications */}
            <Route
              path="/dashboards/student/notifications"
              element={<StudentNotifications />}
            />
            <Route
              path="/dashboards/lecturer/notifications"
              element={<LecturerNotifications />}
            />
            <Route
              path="/dashboards/registrar/notifications"
              element={<RegistrarNotifications />}
            />

            {/* Role-specific Profiles */}
            <Route
              path="/dashboards/student/profile"
              element={<StudentProfile />}
            />
            <Route
              path="/dashboards/lecturer/profile"
              element={<LecturerProfile />}
            />
            <Route
              path="/dashboards/registrar/profile"
              element={<RegistrarProfile />}
            />
            <Route path="/dashboards/registrar/issues/:id" element={<IssueDetails/>}></Route>
            
          </Routes>
        </main>
      </RoleProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
