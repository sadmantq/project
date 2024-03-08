import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import DirectorIdContext from "../context/DirectorIdContext";
import { useParams } from "react-router-dom";
import './DirectorDetails.css'
import Navbar from "../_components/Navbar";


export default function DirectorDetails(){

    //const { dirId } = useParams();

    const {currentDirector} = useContext(DirectorIdContext);
    const [thisDirector,setThisDirector] = useState({});

    useEffect(() => {
        try 
        {
            axios.get(`http://localhost:5000/director/${currentDirector}`)
            .then(res => setThisDirector(res.data))
            .catch(err => console.log(err));


        } 
        catch (err) 
        {
            console.log(err);
        }
    },[])

    console.log(currentDirector);
    console.log(thisDirector);

    return (
        <>
                        <Navbar />
                        <div className="director-container"  >
                            <div className="director-id">{thisDirector.director_id}</div>
                            <div className="director-full-name">{thisDirector.director_name}</div>
                            <div className="director-email">{thisDirector.director_email}</div>
                            <div className="director-birthdate">{thisDirector.director_birthdate}</div>
                            <div className="director-homecountry">{thisDirector.director_country}</div>
                            <div className="director-nationality">{thisDirector.director_nationality}</div>
                            <div className="director-awards">{thisDirector.director_awards}</div>
                            <div className="director-gender">{thisDirector.director_gender}</div>
                        </div>
        </>


    )
}