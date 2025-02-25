
import React from 'react'
import './loginsignup.css'

export const LoginSignup = () => {
  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>Login form for AITS</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'></div>
      <div className="inputs">
        <input type="text" placeholder='Username' />
      </div>
      <div className='inputs'></div>
      <div className="inputs">
        <input type="Password" placeholder='password' />
      </div>
      
      <div className="sumbit-container">
      <div className="forgot-password">Forgot Password? <span>Click here</span></div>
        <div className='submit'><button>Login</button></div>
        <div className="signup-text">
            Don't have an account? <a href="/signup">Sign Up</a>
        </div>
     
        

      </div>
    </div>


  )
}
