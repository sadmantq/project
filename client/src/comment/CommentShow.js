// import React, { useContext, useEffect, useState } from "react";
// import './CommentShow.css';
// import axios from "axios";
// import CurrentMovieContext from "../context/CurrentMovieContext";
// import './CommentShow.css'
// import ReviewContext from "../context/ReviewContext";
// import UserIdContext from "../context/UserIdContext";

// export default function CommentShow(){

//     //let availableReviews = true;
//     const {reviewCng} = useContext(ReviewContext);
//     const [availableReviews, setAvailableReviews] = useState(true);
//     const [comments,setComments] = React.useState([]);

//     const {userId} = useContext(UserIdContext);

//     const {currentMovie} = useContext(CurrentMovieContext);

//     useEffect(() => {
//         try 
//         {
//             axios.get(`http://localhost:5000/movies/reviews/${currentMovie}`)
//             .then(res => setComments(res.data))
//             .then(data => console.log(data))
//             .then(setAvailableReviews( true ))
//             .catch(err => setAvailableReviews( false ));

//         } 
//         catch (err) 
//         {
//             console.error(err);
//         }
//     },[reviewCng])


//     return (
//         <div className="comments-container">
//             <h3>Reviews:</h3>
//             {availableReviews && comments.map(item => {
//                 return (
//                     <div>
//                     <div className="single-comment-container">
//                         <div className="user-id-container">User ID: {item.user_id}</div>
//                         <div className="review-container">Review: {item.review_statement}</div>
//                     </div>
//                     { item.user_id === userId &&
//                         <div> 
//                             <button>

//                             </button>
//                             <button>

//                             </button>
//                         </div>
//                     }   

//                     </div>
//                 )
//             })}
//             {!availableReviews && <div className="no review">No review found</div>}
//         </div>
//     )
// }



import React, { useContext, useEffect, useState } from "react";
import './CommentShow.css';
import axios from "axios";
import CurrentMovieContext from "../context/CurrentMovieContext";
import './CommentShow.css';
import ReviewContext from "../context/ReviewContext";
import UserIdContext from "../context/UserIdContext";
import { useNavigate } from "react-router-dom";

export default function CommentShow(){

    const {reviewCng} = useContext(ReviewContext);
    const [availableReviews, setAvailableReviews] = useState(false);
    const [comments,setComments] = React.useState([]);

    const {userId} = useContext(UserIdContext);
    const {currentMovie} = useContext(CurrentMovieContext);

    const [dltOwn, setDltOwn] = useState(false);

    const navigate = useNavigate();

    function deleteReview()
    {
        try
        {
            axios.delete(`http://localhost:5000/movies/deleteReviewPost/${currentMovie}/${userId}`)
            .then(res => setDltOwn(!dltOwn))
            .catch(err => console.log(err));
        }
        catch(err)
        {
            console.log(err);
        }
    }

    useEffect(() => {
        try {
            axios.get(`http://localhost:5000/movies/reviews/${currentMovie}`)
            .then(res => {
                setComments(res.data);
                setAvailableReviews(res.data.length > 0);
            })
            .catch(err => console.error(err));
        } 
        catch (err) {
            console.error(err);
        }
    }, [reviewCng, dltOwn]);

    return (
        <div className="comments-container">
            <h3>Reviews:</h3>
            {availableReviews ? (
                comments.map(item => (
                    <div className="card comment-card" key={item.id}>
                        <div className="card-body">
                            <h5 className="card-title">User ID: {item.user_id}</h5>
                            <p className="card-text">Review: {item.review_statement}</p>
                            {item.user_id === userId && (
                                <div className="btn-group" role="group">

                                    <button type="button" className="btn btn-primary mr-2" onClick={()=>navigate('/updateReview')} >
                                        Update
                                    </button>

                                    <button type="button" className="btn btn-danger" onClick={deleteReview}>
                                        Delete
                                    </button>

                                </div>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <div className="no-review">No review found</div>
            )}
        </div>
    )
}
