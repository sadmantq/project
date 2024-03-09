import {React, useState, useContext, useEffect} from "react";
import axios from "axios";
import './SearchBar.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import CurrentMovieContext from "../context/CurrentMovieContext";
import { useAsyncError, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar() 
{
    const [search,setSearch] = useState('');
    const [result,setResult] = useState([]);

    const [resultShow,setResultShow] = useState(false);

    const {setCurrentMovie} = useContext(CurrentMovieContext);
    const navigate = useNavigate();


    const [searchType, setSearchType] = useState('searchAsc');

   

    const handleChange = (e) => {

        setSearch(e.target.value);
    }


    const handleSearchChange = (e) => {
        setSearchType(e.target.value);
    }
    
    
    useEffect(() => {

        if (search != ''){
        try
        {

            axios.get(`http://localhost:5000/${searchType}/${search}`)
            .then ( res => setResult(res.data) )
            .then ( data => console.log(data));
    
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

                

                <select className="search-select form-select" style={{width:"200px", marginLeft: "20px", marginRight:"10px"}} onChange={handleSearchChange}>
                        <option value="searchAsc">Search by Name (Ascending)</option>
                        <option value="searchDesc">Search by Name (Descending)</option>
                        <option value="searchGenreAsc">Search by Genre (Ascending)</option>
                        <option value="searchGenreDesc">Search by Genre (Descending)</option>
                        <option value="searchYearAsc">Search by Year (Ascending)</option>
                        <option value="searchYearDesc">Search by Year (Descending)</option>
                </select>

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
                
                
                <>
                <button className="btn btn-outline-light" style={{marginLeft:'600px' ,marginRight:'15px'}} onClick={()=>navigate('/user')}>
                    <FontAwesomeIcon icon = {faUser} />

                   
                </button>

                <button className="btn btn-outline-light" style={{ marginRight:'10px'}} onClick = {() => navigate('/myWatchlist')}>
                    Watchlist
                </button>

                <button className="btn btn-outline-light" style={{marginLeft: 'auto', marginRight:'10px'}} onClick = {() => navigate('/login')}>
                    Log out
                </button>
                </>
           
        </div>
                        
        {resultShow && <div className="search-result-container" /*style={{backgroundColor: 'whitesmoke'}}*/>
            {resultShow && result.map(item => {
                return(
                    <>
                       <div className="__movie-item" style={{color:'black'}} key={item.id} onClick={()=>{
                            setCurrentMovie(item.id);
                            navigate(`/movies/${item.id}`)}}>
                            <p className="__movie-name">Name: {item.name}</p>
                            <p>Genre: {item.genre}</p>
                            <p>Year of Release: {item.year}</p>
                            {/* <img className="_movie-image" src={item.image} alt="Movie Poster" /> */}
                        </div> 
                    </>
                )
            })}
        </div>}
        </>
    )
}

