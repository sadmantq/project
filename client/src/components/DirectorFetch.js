// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import CurrentMovieContext from "../context/CurrentMovieContext";
// import { useNavigate } from "react-router-dom";
// import './DirectorFetch.css';
// import DirectorIdContext from "../context/DirectorIdContext";
// import Navbar from "../_components/Navbar";


// export default function DirectorFetch() {

//     const navigate = useNavigate();

//     const {setCurrentDirector} = useContext(DirectorIdContext);

//     const [directors,setDirectors] = useState([]);

//     useEffect(() => {
//         try 
//         {
//             axios.get('http://localhost:5000/directors')
//             .then(res => setDirectors(res.data))
//             .catch(err => console.log(err));
//         } 
//         catch (err) 
//         {
//             console.log(err);
//         }
//     },[])




//     return (
//         <>
//             <Navbar />
//         <div className="container">
//             {

//                 directors.map(item => {
//                     return (
//                         <div className="director-container" onClick={()=>{
//                             console.log(item.director_id);
//                             setCurrentDirector(item.director_id);
//                             navigate(`/director/${item.director_id}`);
//                         }}>
//                             <div className="director-id">{item.director_id}</div>
//                             <div className="director-full-name">{item.director_name}</div>
//                         </div>
//                     )
//                 })
//             }
//         </div>
//         </>
//     )
// }

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DirectorIdContext from "../context/DirectorIdContext";
import Navbar from "../_components/Navbar";
import './DirectorFetch.css';

export default function DirectorFetch() {
    const navigate = useNavigate();
    const { setCurrentDirector } = useContext(DirectorIdContext);
    const [directors, setDirectors] = useState([]);

    useEffect(() => {
        try {
            axios.get('http://localhost:5000/directors')
            .then(res => setDirectors(res.data))
            .catch(err => console.log(err));
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <>
            <Navbar />
            <div className="container">
                {directors.map(item => (
                    <div
                        key={item.director_id}
                        className="director-container"
                        onClick={() => {
                            setCurrentDirector(item.director_id);
                            navigate(`/director/${item.director_id}`);
                        }}
                    >
                        <div className="director-id">{item.director_id}</div>
                        <div className="director-full-name">{item.director_name}</div>
                    </div>
                ))}
            </div>
        </>
    );
}


// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import DirectorIdContext from "../context/DirectorIdContext";
// import Navbar from "../_components/Navbar";
// import './DirectorFetch.css';

// // export default function DirectorFetch() {
// //     const navigate = useNavigate();
// //     const { setCurrentDirector } = useContext(DirectorIdContext);
// //     const [directors, setDirectors] = useState([]);
// //     const [currentPage, setCurrentPage] = useState(1);
// //     const [itemsPerPage] = useState(10); // Number of items per page

// //     useEffect(() => {
// //         try {
// //             axios.get('http://localhost:5000/directors')
// //             .then(res => setDirectors(res.data))
// //             .catch(err => console.log(err));
// //         } catch (err) {
// //             console.log(err);
// //         }
// //     }, []);

// //     // Get current items
// //     const indexOfLastItem = currentPage * itemsPerPage;
// //     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// //     const currentDirectors = directors.slice(indexOfFirstItem, indexOfLastItem);

// //     // Change page
// //     const paginate = pageNumber => setCurrentPage(pageNumber);

// //     return (
// //         <>
// //             <Navbar />
// //             <div className="container">
// //                 {currentDirectors.map(item => (
// //                     <div
// //                         key={item.director_id}
// //                         className="director-container"
// //                         onClick={() => {
// //                             setCurrentDirector(item.director_id);
// //                             navigate(`/director/${item.director_id}`);
// //                         }}
// //                     >
// //                         <div className="director-id">{item.director_id}</div>
// //                         <div className="director-full-name">{item.director_name}</div>
// //                     </div>
// //                 ))}
// //             </div>
// //             <div className="pagination">
// //                 {Array.from({ length: Math.ceil(directors.length / itemsPerPage) }, (_, i) => (
// //                     <button key={i} onClick={() => paginate(i + 1)}>{i + 1}</button>
// //                 ))}
// //             </div>
// //         </>
// //     );
// // }

// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import DirectorIdContext from "../context/DirectorIdContext";
// import Navbar from "../_components/Navbar";
// import './DirectorFetch.css';

// export default function DirectorFetch() {
//     const navigate = useNavigate();
//     const { setCurrentDirector } = useContext(DirectorIdContext);
//     const [directors, setDirectors] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage] = useState(8); // Number of items per page
//     const itemsPerRow = 4; // Number of items per row

//     useEffect(() => {
//         try {
//             axios.get('http://localhost:5000/directors')
//             .then(res => setDirectors(res.data))
//             .catch(err => console.log(err));
//         } catch (err) {
//             console.log(err);
//         }
//     }, []);

//     // Get current items
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentDirectors = directors.slice(indexOfFirstItem, indexOfLastItem);

//     // Navigate to previous page
//     const goToPrevPage = () => {
//         if (currentPage > 1) {
//             setCurrentPage(currentPage - 1);
//         }
//     };

//     // Navigate to next page
//     const goToNextPage = () => {
//         const totalPages = Math.ceil(directors.length / itemsPerPage);
//         if (currentPage < totalPages) {
//             setCurrentPage(currentPage + 1);
//         }
//     };

//     return (
//         <>
//             <Navbar />
//             <div className="container" style={{marginTop:"20px", marginRight:"30px", marginLeft:"30px"}}>
//                 {currentDirectors.map((item, index) => (
//                     (index % itemsPerRow === 0) ? // Check if it's the first item in a row
//                     <div className="row" key={index}>
//                         {currentDirectors.slice(index, index + itemsPerRow).map(director => (
//                             <div
//                                 key={director.director_id}
//                                 className="director-container"
//                                 onClick={() => {
//                                     setCurrentDirector(director.director_id);
//                                     navigate(`/director/${director.director_id}`);
//                                 }}
//                             >
//                                 <div className="director-id">{director.director_id}</div>
//                                 <div className="director-full-name">{director.director_name}</div>
//                             </div>
//                         ))}
//                     </div>
//                     : null
//                 ))}
//             </div>
//             <div className="pagination-container" style={{marginTop:"30px"}}>
//                 <button onClick={goToPrevPage} disabled={currentPage === 1}>Prev</button>
//                 <button onClick={goToNextPage} disabled={currentPage === Math.ceil(directors.length / itemsPerPage)}>Next</button>
//             </div>
//         </>
//     );
// }
