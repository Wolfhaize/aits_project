import React, { useState } from 'react';
import { LoginSignup } from './Components/Loginsignup/loginsignup'; // Ensure the correct import path
import { SignUp } from './Components/Loginsignup/signup'; // Import the SignUp component
import './App.css';

const App = () => {
  // State to toggle between Login and SignUp
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div>
      {isSignUp ? <SignUp /> : <LoginSignup />}
      
      {/* Toggle Button */}
      <button onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Go to Login' : 'Go to Sign Up'}
      </button>
        

    </div>
  );
};

export default App;
