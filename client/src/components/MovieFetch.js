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
import { useContext } from "react";
import CurrentMovieContext from "../context/CurrentMovieContext";


export default function MovieFetch(){

    const {setCurrentMovie} = useContext(CurrentMovieContext);

    const navigate = useNavigate();

    const {loginInfo} = useContext(LoginContext);
    
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        axios.get("http://localhost:5000/movies")
            .then(res => setData(res.data));
    }, []);

    // const handleLogin = async(e) => {
    //     e.preventDefault();
    //     // Add your login logic here
    //     navigate('/')

    
    // };

    return (
        <>
        
        <div className="movie-container">
            {data.map(item => {
                return (
                    <>
                    {/*<p>The username is : {loginInfo}</p>*/}
                    <div className="movie-item" key={item.id} onClick={()=>{
                        setCurrentMovie(item.id);
                        navigate(`/movies/${item.id}`)}}>
                        <h6 className="movie-id">ID: {item.id}</h6>
                        <p className="movie-name">{item.name}</p>
                        <p className="movie-year">Year of Release: {item.year}</p>
                        <img className="movie-image" src={item.image} alt="Movie Poster"/>
                        {/* <p className="movie-adult">{item.is_adult ? 'Adult' : 'Not Adult'}</p>
                        <p className="movie-genre">Genre: {item.genre}</p>
                        <p className="movie-description">Review: {item.description}</p> */}
                        {/*<Link to ={`/movies/${item.id}`}>Click to see full movie</Link>*/}
                    </div>
                    </>
                );
            })}
        </div>
        </>
    );
}
