
// Login.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import CSS file for styling
import axios from "axios";
import { useContext } from 'react';
import LoginContext from '../context/LoginContext';
import UserIdContext from '../context/UserIdContext';

const Login = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  const {setLoginInfo} = useContext(LoginContext);
  const {setUserId} = useContext(UserIdContext);

  const handleLogin = async(e) => {
    e.preventDefault();
    // Add your login logic here

    try {
      const response = await axios.post("http://localhost:5000/login",{
        username: username,
        password: password,
        role: role
      });

      console.log(response.data);
      setUserId(response.data.id);
      
      setLoginInfo(username);


      if (role == "admin")
      {
        navigate('/admin');
      }
      else
      {
        navigate('/movies');
      }
  
    } catch (err) {
      
      console.log(err);  
      navigate('/errorLogin');  
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
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
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            {/* <option value="director">Director</option>
            <option value="producer">Producer</option> */}
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="button-container">
          <button type="submit">Login</button>
        </div>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
