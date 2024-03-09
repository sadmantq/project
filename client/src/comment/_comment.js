

import React, { useContext, useState, useEffect } from "react";
import axios from 'axios';
import UserIdContext from "../context/UserIdContext";
import CurrentMovieContext from "../context/CurrentMovieContext";
import "./_comment.css"
import ReviewContext from "../context/ReviewContext";
import CustomToast from "../funny/CustomToast";

export default function _comment() {
    const [movie_Id, setMovie_Id] = useState();
    const [user_Id, setUser_Id] = useState();
    const [review_Statement, setReview_Statement] = useState('');
    const [tooMuch, setTooMuch] = useState(false);

    const { userId } = useContext(UserIdContext);
    const { currentMovie } = useContext(CurrentMovieContext);
    const { setReviewCng, reviewCng } = useContext(ReviewContext);

    useEffect(() => {
        setUser_Id(userId);
        setMovie_Id(currentMovie);
    }, [userId, currentMovie]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/movies/reviewPost", {
                movieId: movie_Id,
                userId: user_Id,
                review: review_Statement
            });
            setTooMuch(false);
            setReviewCng(!reviewCng);
            setReview_Statement('');
            console.log(response.data);
        } catch (error) {
            console.error('Error submitting review:', error);
            setTooMuch(true);
        }
    };

    const handleChange = (e) => {
        setReview_Statement(e.target.value);
    };

    const handleCloseToast = () => {
        setTooMuch(false);
    };

    return (
        <div className="comment-container">
            {!tooMuch && (
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
            )}
            {tooMuch && <CustomToast onClose={handleCloseToast} />}
        </div>
    );
}
