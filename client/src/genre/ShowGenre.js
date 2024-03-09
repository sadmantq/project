import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../_components/Navbar';


function ShowGenre() {
    const [genres, setGenres] = useState([]);

    useEffect(() => { 
        try
        {
            axios.get('http://localhost:5000/getGenreCount')
            .then(res => setGenres(res.data))
            .catch(err => console.log(err));
        }
        catch(err)
        {
            console.log(err);
        }
    }, []);

    return (
        <div>
            <Navbar />
        <div className="container">
            <h2 className="text-center mt-3">Genre Counts</h2>
            <table className="table table-striped mt-3">
                <thead className="thead-dark">
                    <tr>
                        <th>Genre ID</th>
                        <th>Genre Name</th>
                        <th>Movie Count</th>
                    </tr>
                </thead>
                <tbody>
                    {genres.map(genre => (
                        <tr key={genre.id}>
                            <td>{genre.id}</td>
                            <td>{genre.name}</td>
                            <td>{genre.movie_count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
}

export default ShowGenre;
