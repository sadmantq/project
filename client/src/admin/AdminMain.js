// import React from "react";
// import axios from "axios";
// import {  useNavigate } from "react-router-dom";
// import __Navbar from "../_components/__Navbar";

// export default function AdminMain()
// {
//     const navigate = useNavigate();
//     return(
//         <div className="container" style={{marginTop:"200px", marginLeft:"200px"}}>
            

//             <button type="button" className="btn btn-primary" style={{margin:"20px"}} onClick={()=> navigate('/admin/addMovie')}>Add a movie</button>
//             <button type="button" className="btn btn-primary" onClick={()=> navigate('/admin/removeMovie')}>Remove a movie</button>
//         </div>
//     )
// }

import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import __Navbar from "../_components/__Navbar";

export default function AdminMain() {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh" }}>
            <button type="button" className="btn btn-primary mb-3" onClick={() => navigate('/admin/addMovie')}>Add a Movie</button>
            <button type="button" className="btn btn-primary mb-3" onClick={() => navigate('/admin/removeMovie')}>Remove a Movie</button>
            <button type="button" className="btn btn-danger" onClick={handleLogout}>Log Out</button>
        </div>
    );
}
