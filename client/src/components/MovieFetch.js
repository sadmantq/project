
// import React from "react";
// import axios from "axios";
// import './MovieFetch.css';
// import { Link, useNavigate } from "react-router-dom";
// import LoginContext from "../context/LoginContext";
// import { useContext, useState,useEffect } from "react";
// import CurrentMovieContext from "../context/CurrentMovieContext";
// import SearchBar from "../Search/SearchBar";


// export default function MovieFetch(){

    

//     const { setCurrentMovie } = useContext(CurrentMovieContext);
//     const { loginInfo } = useContext(LoginContext);
//     const navigate = useNavigate();
//     const [data, setData] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage] = useState(8); 

//     useEffect(() => {
//         axios.get("http://localhost:5000/movies")
//             .then(res => setData(res.data));
//     }, []);

    
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    
//     const paginate = (pageNumber) => setCurrentPage(pageNumber);

//     return (
//         <>
//             <div className="movie-container">
//                 <SearchBar />
//                 {currentItems.map(item => (
//                     <div className="movie-item" key={item.id} onClick={() => {
//                         setCurrentMovie(item.id);
//                         navigate(`/movies/${item.id}`);
//                     }}>
//                         <h6 className="movie-id">ID: {item.id}</h6>
//                         <p className="movie-name">{item.name}</p>
//                         <p className="movie-year">Year of Release: {item.year}</p>
//                         <div className="movie-image-container">
//                         <img className="movie-image" src={item.image} alt="Movie Poster" />
//                         </div>
//                     </div>
//                 ))}
//             </div>
            

// < div className="pagination-container" style={{display:'flex', justifyContent:'center'}}>
// <nav style={{backgroundColor:'white'}}>
//     <ul className="pagination">
//         <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//             <button className="page-link" onClick={() => paginate(currentPage - 1)}>Previous</button>
//         </li>
//         {data.length > 0 && Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, index) => (
//             <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
//                 <button className="page-link" onClick={() => paginate(index + 1)}>{index + 1}</button>
//             </li>
//         ))}
//         <li className={`page-item ${currentPage === Math.ceil(data.length / itemsPerPage) ? 'disabled' : ''}`}>
//             <button className="page-link" onClick={() => paginate(currentPage + 1)}>Next</button>
//         </li>
//     </ul>
// </nav>
// </div>

//         </>
//     );
// }

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LoginContext from "../context/LoginContext";
import CurrentMovieContext from "../context/CurrentMovieContext";
import SearchBar from "../Search/SearchBar";
import './MovieFetch.css';

export default function MovieFetch() {
    const { setCurrentMovie } = useContext(CurrentMovieContext);
    const { loginInfo } = useContext(LoginContext);
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const [sortBy, setSortBy] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5000/movies")
            .then(res => setData(res.data));
    }, []);

    useEffect(() => {
        if (sortBy === "ascending") {
            setData([...data].sort((a, b) => a.year - b.year));
        } else if (sortBy === "descending") {
            setData([...data].sort((a, b) => b.year - a.year));
        }
    }, [sortBy]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    return (
        <>
            <div className="movie-container" >
                <div className="sort-dropdown" style={{marginRight:'auto', marginTop:"20px", marginLeft:"10px"}}>
                    <select className="form-select" onChange={handleSortChange}>
                        <option value="">Sort By Year</option>
                        <option value="ascending">Sort by Year (Ascending)</option>
                        <option value="descending">Sort by Year (Descending)</option>
                    </select>
                </div>
                <SearchBar />
                {currentItems.map(item => (
                    <div className="movie-item" key={item.id} onClick={() => {
                        setCurrentMovie(item.id);
                        navigate(`/movies/${item.id}`);
                    }}>
                        <h6 className="movie-id">ID: {item.id}</h6>
                        <p className="movie-name">{item.name}</p>
                        <p className="movie-year">Year of Release: {item.year}</p>
                        <div className="movie-image-container">
                            <img className="movie-image" src={item.image} alt="Movie Poster" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="pagination-container" style={{ display: 'flex', justifyContent: 'center' }}>
                <nav style={{ backgroundColor: 'white' }}>
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => paginate(currentPage - 1)}>Previous</button>
                        </li>
                        {data.length > 0 && Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, index) => (
                            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => paginate(index + 1)}>{index + 1}</button>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === Math.ceil(data.length / itemsPerPage) ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => paginate(currentPage + 1)}>Next</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}

