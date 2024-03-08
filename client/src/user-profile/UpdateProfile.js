
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import UserIdContext from "../context/UserIdContext";

export default function UpdateProfile() {

    const old_username = useParams();

    const navigate = useNavigate();

    const {userId} = useContext(UserIdContext);
    //const [old_username, setOld_username] = useState('');

    //

    const [formData, setFormData] = useState({
        old_username:old_username,
        username: "",
        password: "",
        type: "", 
        nationality: "",
        gender: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`http://localhost:5000/updateUser`, formData)
        .then(() => navigate('/user'))
        .catch(err => console.log(err));

    };

    return (
        <div className="container mt-4">
            <div className="card p-4" style={{ borderRadius: "15px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                <h5 className="card-title">Update Profile</h5>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" className="form-control" id="username" name="username" value={formData.username} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="type" className="form-label">Type</label>
                        <select className="form-control" id="type" name="type" value={formData.type} onChange={handleChange}>
                            <option value="">Select Type</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="nationality" className="form-label">Nationality</label>
                        <input type="text" className="form-control" id="nationality" name="nationality" value={formData.nationality} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="gender" className="form-label">Gender</label>
                        <input type="text" className="form-control" id="gender" name="gender" value={formData.gender} onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Update Profile</button>
                </form>
            </div>
            <Link to="/user" >
                <button className="btn btn-secondary mt-3">Back to Profile</button>
            </Link>
        </div>
    );
}
