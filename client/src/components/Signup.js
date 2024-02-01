

// Signup.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css'; // Import CSS file for styling
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [type, settype] = useState('user');

  const handleSignup = async(e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/signup',{
        username: username,
        password: password,
        type: type
      })

      navigate('/login');

    } catch (err) {
      console.log(err);
      navigate('/errorLogin');
    }
    // Add your signup logic here
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSignup}>
        <h2>Sign Up</h2>
        <div className="input-container">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-container">
          <select value={type} onChange={(e) => settype(e.target.value)}>
            <option value="user">User</option>
            <option value="director">Director</option>
            <option value="producer">Producer</option>
          </select>
        </div>
        <div className="button-container">
          <button type="submit">Sign Up</button>
        </div>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
