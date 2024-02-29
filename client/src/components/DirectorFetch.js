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
                            <></>
                            <></>
                            <></>
                            <></>
                            <></>
                            <></>
                            <></>
                            <></>
                            <></>
                            <></>
                        </div>
                    )
                })
            }
        </div>
    )
}