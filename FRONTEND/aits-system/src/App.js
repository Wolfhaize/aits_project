import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './Components/Login/login';
 import Signup from './Components/Signup/Signup'; 



function App() {
  return (
    
    <Router>
      <Routes>
        <Route path='/signup' element={<Signup/>} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
    

  
  );
}

export default App;