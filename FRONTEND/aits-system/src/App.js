
import './App.css';
import { LoginSignup } from './Components/Loginsignup/loginsignup'; // Correct import

import React from 'react';
//import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
//import AdminDashboard from './pages/AdminDashboard';
//import StudentDashboard from './pages/StudentDashboard';
//import Login from './pages/Login';
const App = () => {
  return (
    //<Router>
    //       <Routes>
    //            <Route path="/" element={<Login />} />
    //            <Route path="/admin" element={<AdminDashboard />} />
    //            <Route path="/student" element={<StudentDashboard />} />
    //            {/* Redirect unknown routes to login */}
    //            <Route path="*" element={<Navigate to="/" />} />
    //        </Routes>
    //   </Router>
    <div>
      <LoginSignup />
    </div>
  );
}

export default App; 
