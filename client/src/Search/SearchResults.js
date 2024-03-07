import React from "react";
import axios from "axios";
import { useState } from "react";
import './SearchResults.css';
import { Dropdown } from "bootstrap";
import Navbar from "../_components/Navbar";

export default function SearchResults()
{

    const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);
    // const [selectedOption, setSelectedOption] = useState('');

    // const handleOptionClick = (option) => {
    //     setSelectedOption(option);
    // };

    const [shit,setShit] = useState('');
    const [search,setSearch] = useState('');
    const  [results,setResults] = useState([]);


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
            }
            else if (selectedOption == 'genre')
            {
                
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

        </>
   );



}

