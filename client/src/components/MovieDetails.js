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

import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./MovieDetails.css"; // Import CSS file
import Navbar from "../_components/Navbar";
import _comment  from "../comment/_comment.js";
import CommentShow from "../comment/CommentShow.js";
import UserIdContext from "../context/UserIdContext.js";


export default function MovieDetails() {
    const { id } = useParams();
    const {userId} = useContext(UserIdContext);

    const [trailer,setTrailer] = useState({});

    const [movieData, setMovieData] = useState({});
    const [likeClicked,setLikeClicked] = useState(false);
    const [dislikeClicked,setDislikeClicked] = useState(false);
    const [watchlistClicked,setWatchlistClicked] = useState(false);

    const navigate = useNavigate();
    
    useEffect(() => {
        axios.get(`http://localhost:5000/movies/${id}`)
            .then(res => {
                setMovieData(res.data)
            .then(data => console.log(data));
            
            })
            .catch(error => {
                console.error('Error fetching movie data:', error);
            });
        
        axios.get(`http://localhost:5000/checkLike/${id}/${userId}`)
        .then(res => setLikeClicked(true))
        .catch(err => setLikeClicked(false));

        axios.get(`http://localhost:5000/checkDislike/${id}/${userId}`)
        .then(res => setDislikeClicked(true))
        .catch(err => setDislikeClicked(false));

        axios.get(`http://localhost:5000/checkWatchlist/${id}/${userId}`)
        .then(res => setWatchlistClicked(true))
        .catch(err => setWatchlistClicked(false));

        axios.get(`http://localhost:5000/getTrailer/${id}`)
        .then(res => setTrailer(res.data))
        .catch(err => console.log(err));


    }, id); // id as a dependency

    async function handleLike()
    {
        //const response = await axios.get(`http://localhost:5000/checkLike/${id}/${userId}`);
        //if (response.status == 400 )
        {   try
            {
                const responseFinal = await axios.post(`http://localhost:5000/like/${id}/${userId}`);
                setLikeClicked(!likeClicked);
            }
            catch(err)
            {
                console.log(err);
            }
        }
    }

    async function handleUnlike()
    {
        // const response = await axios.get(`http://localhost:5000/checkLike/${id}/${userId}`);
        // if (response.status == 200)
        {
            try
            {
                const responseFinal = await axios.delete(`http://localhost:5000/removeLike/${id}/${userId}`);
                setLikeClicked(!likeClicked);
            }
            catch(err)
            {
                console.log(err);
            }
        }
    }

    async function handleDislike()
    {
        {
            try
            {
                const responseFinal = await axios.post(`http://localhost:5000/dislike/${id}/${userId}`);
                setDislikeClicked(!dislikeClicked);
            }
            catch(err)
            {
                console.log(err);
            }
        }
    }

    async function handleUndislike()
    {
        {
            try
            {
                const responseFinal = await axios.delete(`http://localhost:5000/removeDislike/${id}/${userId}`);
                setDislikeClicked(!dislikeClicked);
            }
            catch(err)
            {
                console.log(err);
            }
        }
    }

    async function handleWatchlist()
    {
        {
            try
            {
                const responseFinal = await axios.post(`http://localhost:5000/addToWatchlist/${id}/${userId}`);
                setWatchlistClicked(!watchlistClicked);
            }
            catch(err)
            {
                console.log(err);
            }
        }
    }

    async function handleUnwatchlist()
    {
        {
            try
            {
                const responseFinal = await axios.delete(`http://localhost:5000/removeFromWatchlist/${userId}/${id}`);
                setWatchlistClicked(!watchlistClicked);
            }
            catch(err)
            {
                console.log(err);
            }
        }
    }

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

                <button type="button" className="btn btn-outline-info" style={{marginBottom:'9px'}} onClick={() => navigate(`/trailer/${trailer.movie_trailer}`)}>see trailer</button>

                <div className="d-flex flex-row mb-3 column-gap-3">
                <div className="like-button">
                    <button type ="button" className={`btn ${likeClicked? 'btn-primary' : 'btn-secondary' }`} onClick={() => {
                        if (likeClicked == false)
                        {
                            handleLike();
                            if (dislikeClicked)
                            {
                                handleUndislike();
                            }
                        }
                        else
                        {
                            handleUnlike();
                        }    
                        // setLikeClicked(!likeClicked)
                        //handleLike();

                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
                            <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
                        </svg>
                    </button>
                </div>
                <div className="dislike-button">
                    <button type="button" className={`btn ${dislikeClicked? `btn-danger` : `btn-secondary`}`} onClick={() => {
                        if (!dislikeClicked)
                        {
                            handleDislike();
                            if (likeClicked)
                            {
                                handleUnlike();
                            }
                            // handleUnlike();
                        }
                        else
                        {
                            handleUndislike();
                            
                        }
                        // setDislikeClicked(!dislikeClicked);
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-hand-thumbs-down-fill" viewBox="0 0 16 16">
                            <path d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.38 1.38 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51q.205.03.443.051c.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.9 1.9 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2 2 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.2 3.2 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.8 4.8 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591"/>
                        </svg>
                    </button>
                </div>
                <div className="watch-button">
                    <button type="button" className={`btn ${watchlistClicked? `btn-warning`: `btn-secondary`}`} onClick={() => {
                        if (!watchlistClicked)
                        {
                            handleWatchlist();
                        }
                        else
                        {
                            handleUnwatchlist();
                        }
                        // setWatchlistClicked(!watchlistClicked);
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-plus-square-fill" viewBox="0 0 16 16">
                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0"/>
                        </svg>
                    </button>
                </div>
                </div>

                {/* <button type="button" class="btn btn-outline-info" onClick={navigate(`/trailer/${'H7GtkK44npY'}`)}>see trailer</button> */}
                
                <_comment />
                <CommentShow />
                
            </div>
        </div>
        </>
    );
}
