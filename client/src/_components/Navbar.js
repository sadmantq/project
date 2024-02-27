import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import './Navbar.css'

export default function Navbar(){
    return (
        <nav>
            <ul>
                <li><Link to="/movies">Home</Link></li>
                <li><Link>About</Link></li>
            </ul>
        </nav>
    )
}