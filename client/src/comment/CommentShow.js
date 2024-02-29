import React, { useContext, useEffect, useState } from "react";
import './CommentShow.css';
import axios from "axios";
import CurrentMovieContext from "../context/CurrentMovieContext";
import './CommentShow.css'
import ReviewContext from "../context/ReviewContext";

export default function CommentShow(){

    //let availableReviews = true;
    const {reviewCng} = useContext(ReviewContext);
    const [availableReviews, setAvailableReviews] = useState(true);
    const [comments,setComments] = React.useState([]);

    const {currentMovie} = useContext(CurrentMovieContext);

    useEffect(() => {
        try 
        {
            axios.get(`http://localhost:5000/movies/reviews/${currentMovie}`)
            .then(res => setComments(res.data))
            .then(data => console.log(data))
            .then(setAvailableReviews( true ))
            .catch(err => setAvailableReviews( false ));

        } 
        catch (err) 
        {
            console.error(err);
        }
    },[reviewCng])


    return (
        <div className="comments-container">
            <h3>Reviews:</h3>
            {availableReviews && comments.map(item => {
                return (
                    <div className="single-comment-container">
                        <div className="user-id-container">User ID: {item.user_id}</div>
                        <div className="review-container">Review: {item.review_statement}</div>
                    </div>
                )
            })}
            {!availableReviews && <div className="no review">No review found</div>}
        </div>
    )
}
