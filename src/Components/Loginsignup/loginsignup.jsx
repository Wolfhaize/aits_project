
import React from 'react'
import './loginsignup.css'

export const LoginSignup = () => {
  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>Sign Up</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'></div>
      <div className="inputs">
        <input type="text" placeholder='Username' />
      </div>
      <div className='inputs'></div>
      <div className="inputs">
        <input type="Email" placeholder='Email' />
      </div>
      <div className='inputs'></div>
      <div className="inputs">
        <input type="Password" placeholder='password' />
      </div>
      
      <div className="sumbit-container">
      <div className="forgot-password">Forgot Password? <span>Click here</span></div>
        <div className="submit">Sign Up</div>
        <div className="submit">Login</div>
      
        

      </div>
    </div>


  )
}
