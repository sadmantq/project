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
import ReviewContext from "../context/ReviewContext";
import CustomToast from "../funny/CustomToast";
import Toast from 'react-bootstrap/Toast';

export default function _comment() {
    const [movie_Id, setMovie_Id] = useState();
    const [user_Id, setUser_Id] = useState();
    const [review_Statement, setReview_Statement] = useState('');

    const { userId } = useContext(UserIdContext);
    const { currentMovie } = useContext(CurrentMovieContext);

    const {setReviewCng} = useContext(ReviewContext);
    const {reviewCng} = useContext(ReviewContext);

    const [tooMuch, setTooMuch] = useState(false);

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
           await axios.post("http://localhost:5000/movies/reviewPost",{
                movieId: movie_Id,
                userId: user_Id,
                review: review_Statement
            }).then(()=>setTooMuch(false)).catch(()=> setTooMuch(true));
            setReviewCng(!reviewCng);
            setReview_Statement('');
            console.log(Response.data);

        } catch (error) {
            console.error('Error submitting review:', error);
            setTooMuch(true);
            
        }
    };

    const handleChange = (e) => {
        setReview_Statement(e.target.value);
    };

    return (
        <div className="comment-container">
            
            {!tooMuch && <form onSubmit={handleSubmit} className="comment-form">
                <label className="comment-label">
                    <input
                        className="comment-input"
                        type="text"
                        value={review_Statement}
                        onChange={handleChange} 
                        placeholder="Enter your review here..."
                    />
                </label>
                <button type="submit" className="comment-submit" >Submit Review</button>
                {
                    tooMuch && 

                    <div
                    style={{
                        position: 'fixed',
                        top: '20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: 'black',
                        color: 'white',
                        padding: '10px',
                        borderRadius: '5px',
                        zIndex: '9999'
                    }}
                >
                    <span>Only one review per person</span>
                    <button
                        onClick={setTooMuch(false)}
                        style={{
                            marginLeft: '10px',
                            backgroundColor: 'black',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Close
                    </button>
                </div>
                }
                
            </form>}
            {
                    tooMuch && 

                    <div
                    style={{
                        position: 'fixed',
                        top: '20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: 'black',
                        color: 'white',
                        padding: '10px',
                        borderRadius: '5px',
                        zIndex: '9999'
                    }}
                >
                    <span>Only one review per person</span>
                    <button
                        onClick={setTooMuch(false)}
                        style={{
                            marginLeft: '10px',
                            backgroundColor: 'black',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Close
                    </button>
                </div>
                }
        </div>
    );
}
