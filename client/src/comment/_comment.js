// import React,{useContext, useState} from "react";
// import axios from 'axios';
// import UserIdContext from "../context/UserIdContext";
// import CurrentMovieContext from "../context/CurrentMovieContext";

// export default function _comment()
// {

//     const [movie_Id,setMovie_Id] = useState();
//     const [user_Id,setUser_Id] = useState();
//     const [review_Statement,setReview_Statement] = useState();

//     const {userId} = useContext(UserIdContext);
//     const {currentMovie} = useContext(CurrentMovieContext);

//     setUser_Id(userId);
//     setMovie_Id(currentMovie);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
            
//         } catch (error) {
            
//         }
//     }

//     const handleChange = (e) => {
//         setReview_Statement(e.target.value);
//     }


//     return(

//         <div className="comment-container">
//             <h1>Submit a comment</h1>
//             <form onSubmit={handleSubmit} className="comment-form">
//                 <label className="comment-label">
//                     Comment:
//                     <input
//                         className="comment-input"
//                         type="text"
//                         value={review_Statement}
//                         onChange={handleChange} 
//                         placeholder="Enter your review here..."
//                     />
//                 </label>
//                 <button type="submit" className="comment-submit">Submit Review</button>
//             </form>
//         </div>
//     )
// }

import React, { useContext, useState, useEffect } from "react";
import axios from 'axios';
import UserIdContext from "../context/UserIdContext";
import CurrentMovieContext from "../context/CurrentMovieContext";
import "./_comment.css"

export default function _comment() {
    const [movie_Id, setMovie_Id] = useState();
    const [user_Id, setUser_Id] = useState();
    const [review_Statement, setReview_Statement] = useState('');

    const { userId } = useContext(UserIdContext);
    const { currentMovie } = useContext(CurrentMovieContext);

    useEffect(() => {
        setUser_Id(userId);
        setMovie_Id(currentMovie);
    }, [userId, currentMovie]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(movie_Id);
            console.log(user_Id);
            console.log(review_Statement);
            // Your Axios request for submitting the review goes here
            const Response = await axios.post("http://localhost:5000/movies/reviewPost",{
                movieId: movie_Id,
                userId: user_Id,
                review: review_Statement
            })

            console.log(Response.data);
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    const handleChange = (e) => {
        setReview_Statement(e.target.value);
    };

    return (
        <div className="comment-container">
            
            <form onSubmit={handleSubmit} className="comment-form">
                <label className="comment-label">
                    <input
                        className="comment-input"
                        type="text"
                        value={review_Statement}
                        onChange={handleChange} 
                        placeholder="Enter your review here..."
                    />
                </label>
                <button type="submit" className="comment-submit">Submit Review</button>
            </form>
        </div>
    );
}
