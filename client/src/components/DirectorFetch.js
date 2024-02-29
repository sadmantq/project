import React, { useEffect, useState } from "react";
import axios from "axios";


export default function DirectorFetch() {

    const [directors,setDirectors] = useState([]);

    useEffect(() => {
        try 
        {
            axios.get('http://localhost:5000/directors')
            .then(res => setDirectors(res.data))
            .catch(err => console.log(err));
        } 
        catch (err) 
        {
            console.log(err);
        }
    },[])




    return (
        <div className="container">
            {
                directors.map(item => {
                    return (
                        <div className="director-container">
                            <div className="director-id">{item.director_id}</div>
                            <div className="director-full-name">{item.director_first_name} {item.director_last_name}</div>
                            <div className="director-age">{item.director_age}</div>
                            <div className="director-email">{item.director_email}</div>
                            <div className="director-homecountry">{item.director_country}</div>
                            <div className="director-nationality">{item.director_nationality}</div>
                            <div className="director-awards">{item.director_awards}</div>
                            <div className="director-gender">{item.director_gender}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}