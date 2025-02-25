import React, { useState } from 'react';
import './signup.css';

export const SignUp = () => {
  // State to track which user type is selected
  const [userType, setUserType] = useState('student'); // Default to student
  
  // Handle user type change
  const handleUserTypeChange = (type) => {
    setUserType(type);
  };

  return (
    <div className='form-container'>
      <h2>Sign Up for AITS</h2>
      
      {/* User Type Selection */}
      <div className='user-type-tabs'>
        <button 
          className={userType === 'student' ? 'active' : ''}
          onClick={() => handleUserTypeChange('student')}
        >
          Student
        </button>
        <button 
          className={userType === 'Lecturer' ? 'active' : ''}
          onClick={() => handleUserTypeChange('teacher')}
        >
          Lecturer
        </button>
        <button 
          className={userType === 'Academic Registrar' ? 'active' : ''}
          onClick={() => handleUserTypeChange('admin')}
        >
          Academic Registrar
        </button>
      </div>
      
      {/* Student Form Fields */}
      {userType === 'student' && (
        <form>
          <input type="text" placeholder='Full Name' />
          <input type="email" placeholder='Email Address' />
          <input type="text" placeholder='Student Number' />
          <input type="text" placeholder='Course/Program' />
          <input type="password" placeholder='Password' />
          <input type="password" placeholder='Confirm Password' />
          
          <button type="submit" className='login-button'>Sign Up</button>
          
          <div className="signup-link">
            Already have an account? <a href="/login">Login</a>
          </div>
        </form>
      )}
      
      {/* Teacher Form Fields */}
      {userType === 'Lecturer' && (
        <form>
          <input type="text" placeholder='Full Name' />
          <input type="email" placeholder='Email Address' />
          <input type="text" placeholder='Faculty ID' />
          <input type="text" placeholder='Department' />
          <input type="password" placeholder='Password' />
          <input type="password" placeholder='Confirm Password' />
          
          <button type="submit" className='login-button'>Sign Up</button>
          
          <div className="signup-link">
            Already have an account? <a href="/login">Login</a>
          </div>
        </form>
      )}
      
      {/* Admin Form Fields */}
      {userType === 'Academic Registrar' && (
        <form>
          <input type="text" placeholder='Full Name' />
          <input type="email" placeholder='Email Address' />
          <input type="text" placeholder='Admin ID' />
          <input type="password" placeholder='Password' />
          <input type="password" placeholder='Confirm Password' />
          
          <button type="submit" className='login-button'>Sign Up</button>
          
          <div className="signup-link">
            Already have an account? <a href="/login">Login</a>
          </div>
        </form>
      )}
    </div>
  );
};