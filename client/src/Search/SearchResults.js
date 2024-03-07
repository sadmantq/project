import React, { useContext } from "react";
import axios from "axios";
import { useState } from "react";
import './SearchResults.css';
import { Dropdown } from "bootstrap";
import Navbar from "../_components/Navbar";
import CurrentMovieContext from "../context/CurrentMovieContext";
import { useNavigate } from "react-router-dom";

export default function SearchResults()
{

    const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);
    // const [selectedOption, setSelectedOption] = useState('');

    // const handleOptionClick = (option) => {
    //     setSelectedOption(option);
    // };

    const {setCurrentMovie} = useContext(CurrentMovieContext);

    const navigate = useNavigate();

    const [shit,setShit] = useState('');
    const [search,setSearch] = useState('');
    const  [results,setResults] = useState([]);

    const [searchDone, setSearchDone] = useState(false);

    const [selectedOption, setSelectedOption] = useState('name'); // State to manage the selected option

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value); 
    }


    async function handleSubmit()
    {
        try
        {
            if (selectedOption == 'name')
            {
                axios.get(`http://localhost:5000/Search/movieName/${search}`)
                .then(res => setResults(res.data))
                .catch(err => console.log(err));
                
                setSearchDone(true);
            }
            else if (selectedOption == 'genre')
            {
                axios.get(`http://localhost:5000/Search/${search}`)
                .then(res => setResults(res.data))
                .catch(err => console.log(err));

                setSearchDone(true);
            }
        }
        catch(err)
        {
            console.log(err);
        }
    }

    return (
        <>
        <Navbar />        
        <div className="container" style={{marginTop:'100px'}}>
           
            <div className="row">
                <div className="col-md-3">

                <div className="col-md-3" style={{ marginTop: '15px' }}>
            <select className="form-select slct-part" style={{width:'200px'}} value={selectedOption} onChange={handleOptionChange} >
                {/* <option value="">Select an option</option> */}
                <option value="name">Name</option>
                <option value="genre">Genre</option>
                {/* <option value="Something else">Something else here</option> */}
            </select>
            {/* <p>Selected option: {selectedOption}</p> */}
        </div>

                </div>
                <div className="col-md-6">
                    <div className="input-group mt-3">
                        <input type="text" 
                            className="form-control" 
                            placeholder="Search..." 
                            aria-label="Search" 
                            aria-describedby="button-addon2" 
                            value={search}
                            onChange={(e)=>{
                                setSearch(e.target.value)
                                console.log(search);
                            }} 
                        />
                        <div className="input-group-append" onClick={handleSubmit}>
                            <button className="btn btn-outline-secondary" style={{marginLeft:'10px'}} type="button" id="button-addon2">Search</button>
                        </div >
                    </div>
                </div>
            </div>

            
        </div>
        <div className="movie-container">
        {searchDone && results.map(item => (
                    <div className="movie-item" key={item.id} onClick={() => {
                        setCurrentMovie(item.id);
                        navigate(`/movies/${item.id}`);
                    }}>
                        <h6 className="movie-id">ID: {item.id}</h6>
                        <p className="movie-name">{item.name}</p>
                        <p className="movie-year">Year of Release: {item.year}</p>
                        <img className="movie-image" src={item.image} alt="Movie Poster" />
                    </div>
                ))}
        </div>

        </>
   );



}

