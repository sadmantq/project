import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import DirectorIdContext from "../context/DirectorIdContext";
import { useParams } from "react-router-dom";


export default function DirectorDetails(){

    const {directorId} = useParams();

    const {currentDirector} = useContext(DirectorIdContext);
    const [thisDirector,setThisDirector] = useState();

    // useEffect(() => {
    //     try 
    //     {
    //         axios.get(`http://localhost:5000/director/${directorId}`)
    //         .then(res => setThisDirector(res.data))
    //         .catch(err => console.log(err));


    //     } 
    //     catch (err) 
    //     {
    //         console.log(err);
    //     }
    // },[])

    return (
        <h1 style={{color: 'red'}}>{directorId}</h1>


    )
}