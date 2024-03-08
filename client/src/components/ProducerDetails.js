// import React, {useState,useEffect,useContext} from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import ProducerContext from "../context/ProducerContext";

// export default function ProducerDetails()
// {
//     const {id} = useParams();
//     const [producer,setProducer] = useState({});
//     //const {currentProducer} = useContext(ProducerContext);

//     useEffect(()=>{

//         axios.get(`http://localhost:5000/producer/${id}`)
//         .then(res => setProducer(res.data))
//         .catch(err => console.log(err));

//     },[])

//     return (
//         <div className="container">
//             <div> {producer.producer_id} </div>
//             <div>{producer.producer_name}</div>
//             <div>{producer.producer_nationality}</div>
//             <div>{producer.producer_gender}</div>
//             <div>{producer.producer_email}</div>
//             <div>{producer.producer_country}</div>
//             <div>{producer.producer_birthdate}</div>
//             <div>{producer.producer_awards}</div>
//         </div>
//     )
// }



import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../_components/Navbar";
import './ProducerDetails.css';
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";





export default function ProducerDetails() {
    const { id } = useParams();
    const [producer, setProducer] = useState({});

    const navigate = useNavigate();

   

    useEffect(() => {
        axios.get(`http://localhost:5000/producer/${id}`)
            .then(res => setProducer(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <Navbar />
            
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{producer.producer_name}</h5>
                    <p className="card-text"><strong>ID:</strong> {producer.producer_id}</p>
                    <p className="card-text"><strong>Nationality:</strong> {producer.producer_nationality}</p>
                    <p className="card-text"><strong>Gender:</strong> {producer.producer_gender}</p>
                    <p className="card-text"><strong>Email:</strong> {producer.producer_email}</p>
                    <p className="card-text"><strong>Country:</strong> {producer.producer_country}</p>
                    <p className="card-text"><strong>Birthdate:</strong> {producer.producer_birthdate}</p>
                    <p className="card-text"><strong>Awards:</strong> {producer.producer_awards}</p>
                </div>
            </div>
        </div>
        </div>
    );
}
