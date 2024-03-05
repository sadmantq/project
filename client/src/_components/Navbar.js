import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import './Navbar.css'

export default function Navbar(){
    return (
        <nav style={{position:'sticky', top:'0'}}>
            <ul>
                <li><Link to="/movies" style={{color: 'black', textDecoration:'none'}} className="link-text">Home</Link></li>
                <li><Link to = '/about' style={{color: 'black', textDecoration:'none'}} className="link-text">About</Link></li>
                <li><Link to = '/directorFetch' style={{color: 'black', textDecoration:'none'}} className="link-text">Directors</Link></li>
                <li><Link to = '/login' style={{color: 'black', textDecoration:'none'}} className="link-text">Log Out</Link></li>
            </ul>
        </nav>
    )
}


