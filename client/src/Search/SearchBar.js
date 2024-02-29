import {React, useState, useContext, useEffect} from "react";
import axios from "axios";
import './SearchBar.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import CurrentMovieContext from "../context/CurrentMovieContext";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function SearchBar() 
{
    const [search,setSearch] = useState('');
    const [result,setResult] = useState([]);

    const [resultShow,setResultShow] = useState(false);

    const {setCurrentMovie} = useContext(CurrentMovieContext);
    const navigate = useNavigate();

   

    const handleChange = async(e) => {
        setSearch(e.target.value);
        try
        {
            const response = await axios.get('http://localhost:5000/Search/movieName',{
                search: search
            }).then(res => setResult(res.data))
              .then(data => console.log(data))
              .catch(err => console.log(err));

            setResultShow(true);

        }
        catch(err)
        {
            console.error(err);
        }
    }
    
    return(
        <>
        <div className="search-bar-container" >

                <button type="button" className="btn btn btn-outline-light btn-sm" style={{height:'36px',marginRight:'10px'}}>
                    Filter Search
                </button>
                <input 
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={handleChange}
                    className="search-input"
                />
                <button className='search-button'>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
           
        </div>
                        {/* <p className="movie-adult">{item.is_adult ? 'Adult' : 'Not Adult'}</p>
                        <p className="movie-genre">Genre: {item.genre}</p>
                        <p className="movie-description">Review: {item.description}</p> */}
                        {/*<Link to ={`/movies/${item.id}`}>Click to see full movie</Link>*/}
        {<div className="search-result-container">
            {resultShow && result.map(item => {
                return(
                    <>
                       <div className="movie-item" key={item.id} onClick={()=>{
                            setCurrentMovie(item.id);
                            navigate(`/movies/${item.id}`)}}>
                            <h6 className="movie-id">ID: {item.id}</h6>
                            <p className="movie-name">{item.name}</p>
                            <p className="movie-year">Year of Release: {item.year}</p>
                            <img className="movie-image" src={item.image} alt="Movie Poster"/>
                        </div> 
                    </>
                )
            })}
        </div>}
        </>
    )
}