import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginSignup } from './Components/Loginsignup/loginsignup';
import Signup from './Components/Signup/Signup'; 



function App() {
  return (
    <div className = 'App'>
      <Signup />
    </div>

    /*
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
      </Routes>
    </Router>
    */

  
  );
}

export default App;