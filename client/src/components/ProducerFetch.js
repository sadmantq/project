import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProducerContext from "../context/ProducerContext";

export default function ProducerFetch() {
    const [producers, setProducers] = useState([]);
    const { currentProducer, setCurrentProducer } = useContext(ProducerContext);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            axios.get(`http://localhost:5000/producers`)
                .then(res => setProducers(res.data))
                .catch(err => console.log(err));
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <div className="container" style={{justifyContent:'center', alignContent:'center'}}>
            {producers.map(item => (
                <div className="producer-item" style={{display:'flex' , justifyContent:'center', border:"solid .6px black"}} key={item.producer_id} onClick={()=> {
                    setCurrentProducer(item.producer_id);
                    navigate(`/producer/${item.producer_id}`);
                }}>
                    <p className="producer-name" style={{marginRight: '20px'}}>{item.producer_id}</p>
                    <p>{item.producer_name}</p>
                </div>
            ))}
        </div>
    );
}
