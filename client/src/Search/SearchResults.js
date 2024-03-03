import React from "react";
import axios from "axios";
import { useState } from "react";

export default function SearchResults()
{
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <div className="dropdown mt-3">
                        <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {selectedOption || 'Select Option'}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <button className={`dropdown-item ${selectedOption === 'Name' ? 'active' : ''}`} onClick={() => handleOptionClick('Name')}>Name</button>
                            <button className={`dropdown-item ${selectedOption === 'Genre' ? 'active' : ''}`} onClick={() => handleOptionClick('Genre')}>Genre</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="input-group mt-3">
                        <input type="text" className="form-control" placeholder="Search..." aria-label="Search" aria-describedby="button-addon2" />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}