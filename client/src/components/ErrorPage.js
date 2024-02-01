// ErrorPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ErrorPage.css'; // Import CSS file for styling

// ErrorPage component
export default function ErrorPage() {
  const navigate = useNavigate();

  // Function to handle navigation back to the login page
  const handleBack = () => {
    navigate('/login');
  };

  return (
    <div className="error-container">
      <h1 className="error-heading">Invalid Information</h1>
      <button className="error-button" onClick={handleBack}>Back</button>
    </div>
  );
}
