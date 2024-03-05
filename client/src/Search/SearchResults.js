import React from "react";
import axios from "axios";
import { useState } from "react";
import './SearchResults.css';
import { Dropdown } from "bootstrap";

export default function SearchResults()
{

    const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">

                <div className="dropdown col-md-3" style={{marginTop:'15px'}}>
  <                 button className="btn btn-secondary dropdown-toggle funny"  type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown button
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="/">Action</a></li>
                        <li><a className="dropdown-item" href="/">Another action</a></li>
                        <li><a className="dropdown-item" href="/">Something else here</a></li>
                    </ul>
                </div>

                </div>
                <div className="col-md-6">
                    <div className="input-group mt-3">
                        <input type="text" className="form-control" placeholder="Search..." aria-label="Search" aria-describedby="button-addon2" />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" style={{marginLeft:'10px'}} type="button" id="button-addon2">Search</button>
                        </div>
                    </div>
                </div>
            </div>

            
        </div>


   );



}

