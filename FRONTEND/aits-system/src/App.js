import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginSignup } from './Components/Loginsignup/loginsignup'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
      </Routes>
    </Router>
  );
}

export default App;