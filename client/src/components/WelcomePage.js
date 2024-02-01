// WelcomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="welcome-container">
      <h1>Welcome to Relate Rift</h1>
      <div className="animation-container">
        <div className="background-animation" style={{ top: '20%', left: '20%' }}></div>
        <div className="background-animation" style={{ top: '40%', left: '50%' }}></div>
        <div className="background-animation" style={{ top: '70%', left: '80%' }}></div>
      </div>
      <div className="options-container">
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleSignup}>Sign Up</button>
      </div>
    </div>
  );
};

export default WelcomePage;
