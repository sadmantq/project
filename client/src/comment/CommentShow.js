import React, { useContext } from "react";
import './CommentShow.css';
import axios from "axios";
import CurrentMovieContext from "../context/CurrentMovieContext";

export default function CommentShow(){

    const [comments,setComments] = React.useState([]);

    const {currentMovie} = useContext(CurrentMovieContext);

    try {
        axios.get("")
    } catch (err) {
        console.error(err);
    }

    return (
        <div className="comments-container">

        </div>
    )
}
