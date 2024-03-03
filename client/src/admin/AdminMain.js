import React from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";

export default function AdminMain()
{
    const navigate = useNavigate();
    return(
        <div className="container">
            <button type="button" className="btn btn-primary" onClick={()=> navigate('/admin/addMovie')}>Add a movie</button>
            <button type="button" className="btn btn-primary" onClick={()=> navigate('/admin/removeMovie')}>Remove a movie</button>
        </div>
    )
}