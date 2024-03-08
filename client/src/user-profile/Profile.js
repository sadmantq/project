// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import UserIdContext from "../context/UserIdContext";

// export default function Profile()
// {
//     const {userId} = useContext(UserIdContext);
//     const [info, setInfo] = useState({});

//     useEffect(() => {
//         axios.get(`http://localhost:5000/nameFromId/${userId}`)
//         .then(res => setInfo(res.data))
//         .catch(err => console.log(err));
//     }, [])

//     return (
//         <div className="container">
//             <div >{info.username}</div>
//             <div>{info.password}</div>
//             <div>{info.type}</div>
//             <div>{info.nationality}</div>
//             <div>{info.gender}</div>
//             <div>{info.date_of_birth}</div>
//         </div>
//     )
// }

// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import UserIdContext from "../context/UserIdContext";
// import Navbar from "../_components/Navbar";

// export default function Profile() {
//     const { userId } = useContext(UserIdContext);
//     const [info, setInfo] = useState({});

//     useEffect(() => {
//         axios.get(`http://localhost:5000/nameFromId/${userId}`)
//             .then(res => setInfo(res.data))
//             .catch(err => console.log(err));
//     }, []);

//     return (
//         <div>
//             <Navbar />
//         <div className="container mt-4">
//             <div className="card p-4" style={{ borderRadius: "15px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
//                 <h5 className="card-title">Profile Information</h5>
//                 <div className="card-text">
//                     <p><strong>Username:</strong> {info.username}</p>
//                     <p><strong>Password:</strong> {info.password}</p>
//                     <p><strong>Type:</strong> {info.type}</p>
//                     <p><strong>Nationality:</strong> {info.nationality}</p>
//                     <p><strong>Gender:</strong> {info.gender}</p>
//                     <p><strong>Date of Birth:</strong> {info.date_of_birth}</p>
//                 </div>
//             </div>
//         </div>

//         </div>
//     );
// }


import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserIdContext from "../context/UserIdContext";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../_components/Navbar";

export default function Profile() {
    const { userId } = useContext(UserIdContext);
    const [info, setInfo] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/nameFromId/${userId}`)
            .then(res => setInfo(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <Navbar />
        <div className="container mt-4">
            <div className="card p-4" style={{ borderRadius: "15px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                <h5 className="card-title">Profile Information</h5>
                <div className="card-text">
                    <p><strong>Username:</strong> {info.username}</p>
                    <p><strong>Password:</strong> {info.password}</p>
                    <p><strong>Type:</strong> {info.type}</p>
                    <p><strong>Nationality:</strong> {info.nationality}</p>
                    <p><strong>Gender:</strong> {info.gender}</p>
                    <p><strong>Date of Birth:</strong> {info.date_of_birth}</p>
                </div>
            </div>
            
                <button className="btn btn-primary mt-3 transform-button" onClick={()=> navigate(`/updateUser/${info.username}`)}>
                    Update Info
                </button>
            
        </div>
        </div>
    );
}
