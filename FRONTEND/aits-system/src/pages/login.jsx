import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { Link } from "react-router-dom";


import './login.css';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const navigate = useNavigate(); 

  
  const handleLogin = async () => {
      try {
      
        const isValidLogin = username === 'correctUser' && password === 'correctPass'; 
    
        if (isValidLogin) {
          console.log('Login successful'); 
          navigate('/dashboard'); 
        } else {
          throw new Error('Invalid username or password');
        }
      } catch (error) {
        setError('Invalid username or password');
      }
    };
    
    

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>Login form for AITS</div>
        <div className='underline'></div>
      </div>

      <div className="inputs">
        <input 
          type="text" 
          placeholder='Username' 
          value={username}
          onChange={(e) => setUsername(e.target.value)} 
        />
      </div>

      <div className="inputs">
        <input 
          type="password" 
          placeholder='Password' 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
        />
      </div>

      {error && <p className="error-message">{error}</p>} {/* Show error if login fails */}

      <div className="submit-container">
        <div className="forgot-password">
          Forgot Password? <span>Click here</span>
        </div>
        <div className='submit'>
          <button onClick={handleLogin}>Login</button> {/* Call handleLogin on click */}
        </div>
        <div className="signup-text">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};