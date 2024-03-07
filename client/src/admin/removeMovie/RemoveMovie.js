import React, { useState, useEffect } from "react";
import axios from "axios";

export default function RemoveMovie()
{
    const [movies,setMovies] = useState([]);

    useEffect(()=>{
        try
        {
            axios.get("http://localhost:5000/movies")
            .then(res => setMovies(res.data));
        }
        catch(err)
        {
            console.log(err);
        }
    },[]);
    
    return  (
        <div className="container" style={{display: 'contents'}}>
            {movies.map(item => (
                    <div className="movie-item" key={item.id}>
                        <h6 className="movie-id">ID: {item.id}</h6>
                        <p className="movie-name">{item.name}</p>
                        <p className="movie-year">Year of Release: {item.year}</p>
                        <img className="movie-image" src={item.image} alt="Movie Poster" />
                    </div>
                ))}
        </div>
    )
}