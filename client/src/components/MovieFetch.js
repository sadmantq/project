// import React  from "react";
// import axios from "axios";
// import './MovieFetch.css'

// export default function MovieFetch(){
    
//     const [data,setData] = React.useState([]);

//     React.useEffect(()=>{
//         axios.get("http://localhost:5000/movies")
//         .then(res => setData(res.data))
//     },[])
//    // console.log(data[0].image);

//     return (
//         <div className="container">
//             {data.map(item => {
//                 return (
//                     <div className="individual">
//                        <h6>{item.id}</h6>
//                        <p>{item.name}</p>
//                        <p>The year of release: {item.year}</p>
//                        <img src= {`${item.image}`} alt="image location gay"/>
//                        <p>{item.is_adult}</p>
//                        <p>{item.genre}</p>
//                        <p> Review: {item.description}</p>

//                     </div>
//                 )
//             })}



//         </div>
//     )
// }

// MovieFetch.js
import React from "react";
import axios from "axios";
import './MovieFetch.css';
import { Link, useNavigate } from "react-router-dom";
import LoginContext from "../context/LoginContext";
import { useContext, useState,useEffect } from "react";
import CurrentMovieContext from "../context/CurrentMovieContext";
import SearchBar from "../Search/SearchBar";


export default function MovieFetch(){

    // const {setCurrentMovie} = useContext(CurrentMovieContext);

    
    // const navigate = useNavigate();

    // const {loginInfo} = useContext(LoginContext);
    
    // const [data, setData] = React.useState([]);

    // React.useEffect(() => {
    //      axios.get("http://localhost:5000/movies")
    //         .then(res => setData(res.data));
    // }, []);

   

    // return (
    //     <>
        
    //     <div className="movie-container">
    //         <SearchBar   />
    //         {data.map(item => {
    //             return (
    //                 <>
                    
    //                 <div className="movie-item" key={item.id} onClick={()=>{
    //                     setCurrentMovie(item.id);
    //                     navigate(`/movies/${item.id}`)}}>
    //                     <h6 className="movie-id">ID: {item.id}</h6>
    //                     <p className="movie-name">{item.name}</p>
    //                     <p className="movie-year">Year of Release: {item.year}</p>
    //                     <img className="movie-image" src={item.image} alt="Movie Poster"/>
                        
    //                 </div>
    //                 </>
    //             );
    //         })}
    //     </div>
    //     </>
    // );

    const { setCurrentMovie } = useContext(CurrentMovieContext);
    const { loginInfo } = useContext(LoginContext);
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4); // You can change this value as needed

    useEffect(() => {
        axios.get("http://localhost:5000/movies")
            .then(res => setData(res.data));
    }, []);

    // Logic to get current items based on pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div className="movie-container">
                <SearchBar />
                {currentItems.map(item => (
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
            {/* <nav>
                <ul className="pagination">
                    {data.length > 0 && Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, index) => (
                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => paginate(index + 1)}>{index + 1}</button>
                        </li>
                    ))}
                </ul>
            </nav> */}

< div className="pagination-container" style={{display:'flex', justifyContent:'center'}}>
<nav style={{backgroundColor:'white'}}>
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
