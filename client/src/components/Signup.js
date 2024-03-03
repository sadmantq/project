

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
  const [nationality,setNationality] = useState('');
  const [gender,setGender] = useState('Male');
  const [date_of_birth,setDate_of_birth] = useState('');

  const handleSignup = async(e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/signup',{
        username: username,
        password: password,
        type: type,
        nationality:nationality,
        gender:gender,
        date_of_birth:date_of_birth
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
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className='input-container'>
          <input
            type="text"
            placeholder="Nationality"
            value={nationality}
            onChange={(e)=>setNationality(e.target.value)} 
          />
        </div>
        <div className='input-container'>
          <select value={gender} onChange={(e)=>setGender(e.target.value)}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Undisclosed">Undisclosed</option>
          </select>
        </div>
        <div className='input-container'>
          <input 
            type="text"
            placeholder='Year of Birth'
            value={date_of_birth}
            onChange={(e)=>setDate_of_birth(e.target.value)}
          />
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
