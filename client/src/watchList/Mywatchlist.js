import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserIdContext from "../context/UserIdContext";
import { useNavigate } from "react-router-dom";
import './Mywatchlist.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../_components/Navbar";

export default function Mywatchlist()
{
    const {userId} = useContext(UserIdContext);
    const [movies, setMovies] = useState([]);

    const [rerend, setRerend] = useState(false);

    const [funny, setFunny] = useState(false);

    const [setup,setSetup] = useState(true);

    const navigate = useNavigate();

   

    useEffect(() => {
        
        try
        {   
            
             axios.get(`http://localhost:5000/fetchUserWatchlist/${userId}`)
            .then(res => setMovies(res.data))
            .catch(()=>setFunny(true));
            

            //throw new Error('dg');

            //setRerend(!rerend);
        }
        catch(err)
        {
            console.log(err);
        }

    }, [rerend])

    

    return (
        <div>

            <Navbar />
        <div className="container" style={{display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center'}}>
            {!funny && movies.map(item => (
                    < div className="movie-item" key={item.id}>
                        <div className="top-right" style={{display:'flex'}}>
                            <h6 className="movie-id">ID: {item.id}</h6>
                            
                                <FontAwesomeIcon icon={faCircleXmark} style={{marginLeft:'auto', color:'red'}} className="cross" onClick={async() => {
                                    await axios.delete(`http://localhost:5000/removeFromWatchlist/${userId}/${item.id}`);
                                    setRerend(!rerend);
                                }} />
                
                        </div>
                        <p className="movie-name">{item.name}</p>
                        <p className="movie-year">Year of Release: {item.year}</p>
                        <img className="movie-image" src={item.image} alt="Movie Poster" />
                    </div>
                ))}

            {funny && <div className="error-container">
                Your Watchlist is Empty TwT 
            </div>}
        </div>
        </div>
    )
}