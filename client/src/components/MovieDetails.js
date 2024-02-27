// import React from "react";
// import { useParams } from "react-router-dom";
// import { useState } from "react";
// import { useEffect } from "react";
// import axios from "axios";

// export default function MovieDetails(){

//     const {id} = useParams();
    


//     const [movieData,setMovieData] = useState({});
//     useEffect(()=>{
//         axios.get(`http://localhost:5000/movies/${id}`)
//         .then(res => setMovieData(res.data));

//         console.log(movieData);
//     },[])

    
//     return (
//         <div>
//             <img src = {movieData.image}/>
//             <div>{movieData.id}</div>
//             <div>{movieData.name}</div>
//             <div>{movieData.year}</div>
//             <div>{movieData.is_adult}</div>
//             <div>{movieData.genre}</div>
//             <div>{movieData.genre}</div>

//         </div>
//     )
// }

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./MovieDetails.css"; // Import CSS file
import Navbar from "../_components/Navbar";
import _comment  from "../comment/_comment.js";


export default function MovieDetails() {
    const { id } = useParams();
    const [movieData, setMovieData] = useState({});
    
    useEffect(() => {
        axios.get(`http://localhost:5000/movies/${id}`)
            .then(res => {
                setMovieData(res.data)
            .then(data => console.log(data));
            
            })
            .catch(error => {
                console.error('Error fetching movie data:', error);
            });
    }, id); // id as a dependency

    if (!movieData) {
        return <div>Loading...</div>;
    }
    console.log(movieData);
    return (
        <>
        <Navbar />
        <div className="movie-details-container">
            
            <img className="movie-poster" src={movieData.image} alt="Movie Poster" />
            <div className="movie-info">
                <div className-="movie-id">ID: {movieData.id}</div>
                <div className="movie-name">Name: {movieData.name}</div>
                <div className="movie-year">Year: {movieData.year}</div>
                <div className="movie-adult">Adult: {movieData.is_adult}</div>
                <div className="movie-genre">Genre: {movieData.genre}</div>
                <div className="movie-review">Review: {movieData.description}</div>
                
                <_comment />
                
            </div>
        </div>
        </>
    );
}
