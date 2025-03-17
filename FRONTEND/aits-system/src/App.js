import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/login';
import Signup from './pages/Signup'; 



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