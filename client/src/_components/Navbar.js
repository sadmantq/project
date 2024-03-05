import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import './Navbar.css'

export default function Navbar(){
    return (
        <nav>
            <ul>
                <li><Link to="/movies">Home</Link></li>
                <li><Link to = '/about'>About</Link></li>
                <li><Link to = '/directorFetch'>Directors</Link></li>
                <li><Link to = '/login'>Log Out</Link></li>
            </ul>
        </nav>
    )
}


