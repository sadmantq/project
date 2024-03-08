import React, { useContext, useState } from 'react';
import UserIdContext from '../context/UserIdContext';
import CurrentMovieContext from '../context/CurrentMovieContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function UpdateReview() {

    const navigate = useNavigate();

    const [review, setReview] = useState('');

    const handleChange = (event) => {
        setReview(event.target.value);
    };

    const {userId} = useContext(UserIdContext);
    const {currentMovie} = useContext(CurrentMovieContext);

    const handleSubmit = () => {
        
        console.log('Updated Review:', review);
        
        axios.post(`http://localhost:5000/updateReview/${currentMovie}/${userId}/${review}`)
        .then(() => navigate(`/movies/${currentMovie}`))
        .catch(err => console.log(err));


        setReview('');
    };

    return (
        <div>
            <button className='btn btn-link'  onClick={() => navigate(`/movies/${currentMovie}`)}>
                <FontAwesomeIcon icon = {faAngleLeft} />
                Back
            </button>
        <div className="container mt-4">
            <h2 className="mb-3">Update Review</h2>
            <textarea
                className="form-control mb-3"
                rows="4"
                placeholder="Enter your updated review here..."
                value={review}
                onChange={handleChange}
            ></textarea>
            <button className="btn btn-primary" onClick={handleSubmit}>Update Review</button>
        </div>
        </div>
    );
}

export default UpdateReview;
