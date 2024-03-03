import React from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export default function AdminMain()
{
    return(
        <div className="container">
            <button type="button" className="btn btn-primary" onClick={()=> Navigate('/admin/addMovie')}>Add a movie</button>
            <button type="button" className="btn btn-primary" onClick={()=> Navigate('/admin/removeMovie')}>Remove a movie</button>
        </div>
    )
}