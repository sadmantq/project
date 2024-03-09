import React, { useState, useEffect } from "react";
import axios from "axios";

export default function RemoveMovie()
{
    const [movies,setMovies] = useState([]);
    const [change, setChange] = useState(false);


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
    },[change]);

    

    return (
        <div className="container d-flex flex-wrap justify-content-around">
            {movies.map(item => (
                <div className="movie-item-delete bg-light p-3 rounded mb-3" key={item.id} style={{ maxWidth: '300px' }}>
                    <h6 className="movie-id-delete">ID: {item.id}</h6>
                    <p className="movie-name-delete">{item.name}</p>
                    <p className="movie-year-delete">Year of Release: {item.year}</p>
                    <img className="movie-image-delete img-fluid rounded" src={item.image} alt="Movie Poster" style={{ maxWidth: '100%', height: 'auto' }} />
    
                    <button className="btn btn-danger mt-3" onClick={() => {
                        axios.delete(`http://localhost:5000/deleteMovie/${item.id}`)
                            .then(res => setChange(!change))
                    }}>Delete Movie</button>
                </div>
            ))}
        </div>
    );
    
    
}