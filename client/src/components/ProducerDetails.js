import React, {useState,useEffect,useContext} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProducerContext from "../context/ProducerContext";

export default function ProducerDetails()
{
    const {id} = useParams();
    const [producer,setProducer] = useState({});
    //const {currentProducer} = useContext(ProducerContext);

    useEffect(()=>{

        axios.get(`http://localhost:5000/producer/${id}`)
        .then(res => setProducer(res.data))
        .catch(err => console.log(err));

    },[])

    return (
        <div className="container">
            <div>
                the producer id is:  {producer.producer_id}
                the producer name is : {producer.producer_name}
                the producer was born on : {producer.producer_birthdate}
            </div>
        </div>
    )
}