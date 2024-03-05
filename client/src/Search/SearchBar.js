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

   

    const handleChange = (e) => {

        setSearch(e.target.value);
    }
    
    useEffect(() => {

        if (search != ''){
        try
        {
            axios.get(`http://localhost:5000/Search/movieName/${search}`)
              .then(res => setResult(res.data))
              .then(data => console.log(data))
            //   .catch(err => console.log(err));
    
            setResultShow(true);
    
        }
        catch(err)
        {
            console.error(err);
        }
    }
        else{
            setResultShow(false);
        }

    },[search])
    
    return(
        <>
        <div className="search-bar-container" >

                <button type="button" className="btn btn btn-outline-light btn-sm" style={{height:'36px',marginRight:'10px', marginLeft:'10px'}} 
                    onClick={() => {
                        navigate('/filterSearch');
                    }}
                >
                    Filter Search
                </button>
                <input 
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={handleChange}
                    className="search-input"
                />
                <button className='search-button' >
                    <FontAwesomeIcon icon={faSearch} />
                </button>

                <button className="btn btn-outline-light" style={{marginLeft: 'auto', marginRight:'10px'}} onClick = {() => navigate('/login')}>
                    Log out
                </button>
           
        </div>
                        {/* <p className="movie-adult">{item.is_adult ? 'Adult' : 'Not Adult'}</p>
                        <p className="movie-genre">Genre: {item.genre}</p>
                        <p className="movie-description">Review: {item.description}</p> */}
                        {/*<Link to ={`/movies/${item.id}`}>Click to see full movie</Link>*/}
        {resultShow && <div className="search-result-container" style={{backgroundColor: 'whitesmoke'}}>
            {resultShow && result.map(item => {
                return(
                    <>
                       <div className="w-25 h-25 p-3 hover-effect"  key={item.id} onClick={()=>{
                            setCurrentMovie(item.id);
                            navigate(`/movies/${item.id}`)}}>
                                {/* <p>{item.name}</p> */}
                            <img className="_movie-image" src={item.image} alt="Movie Poster" />
                        </div> 
                    </>
                )
            })}
        </div>}
        </>
    )
}