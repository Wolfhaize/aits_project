import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginSignup } from './Components/Loginsignup/loginsignup';
 import Signup from './Components/Signup/Signup'; 



function App() {
  return (
    
    <Router>
      <Routes>
        <Route path='/signup' element={<Signup/>} />
        <Route path="/" element={<LoginSignup />} />
      </Routes>
    </Router>
    

  
  );
}

export default App;