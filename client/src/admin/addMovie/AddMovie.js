import React, { useState } from "react";
import axios from 'axios';
import './AddMovie.css';
import { useNavigate } from 'react-router-dom';


export default function AddMovie()
{
    const [name,setName] = useState('');
    const [year,setYear] = useState('');
    const [image,setImage] = useState('');
    const [genre,setGenre] = useState('');
    const [description,setDescription] = useState('');
    const [isAdult,setIsAdult] = useState('');
    const [trailer, setTrailer] = useState('');

    const [movieId,setMovieId] = useState(0);

    const navigate = useNavigate();

    

    async function handleSubmit()
    {
        if(name &&  year && image && genre && description && isAdult)
        {
            try
            {
                // console.log(name)
                // console.log(year)
                // console.log(image)
                // console.log(genre)
                // console.log(description)
                // console.log(isAdult)
                const _body = {
                  name:name,
                  year:year,
                  image:image,
                  genre: genre,
                  description: description,
                  isAdult: isAdult
                };

                const movieInfo = await axios.post(`http://localhost:5000/admin/addMovie`, _body)
                

                
                  await axios.post(`http://localhost:5000/admin/addTrailer/${movieInfo.data.id}/${trailer}`)
                  .then(res => {
                    console.log(res.data)
                    navigate('/admin')
                  })
                  .catch(err => console.log(err));

                  

                
            }
            catch(err)
            {
                console.log(err);
            }
        }
        else
        {
            console.log('ERRR');
        }
    }


    return (
        <div className="whole-page" /*style={{backgroundImage: 'url(https://img.freepik.com/free-photo/movie-background-collage_23-2149876005.jpg?w=1380&t=st=1709488987~exp=1709489587~hmac=da866aa72bc1b8ada73d6510474747b610f418c5ada21d796f4f70133c35ee03)', backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}*/>

          <button className="btn btn-outline-light" onClick={()=>navigate('/admin')}>Back</button>
        <div className="mb-3" style={{ marginLeft: '30%', marginRight: '20%',  width: '40%'}}>
          <label htmlFor="name" className="form-label" style={{marginTop:'6%'}}>Name</label>
          <input type="text" className="form-control" id="name" placeholder="Movie Name..." style={{ height: '45px' }} value={name} onChange={(e)=> setName(e.target.value)} />
    
          <label htmlFor="year" className="form-label">Year of Release</label>
          <input type="text" className="form-control" id="year" placeholder="YYYY..." style={{ height: '45px'}} value={year} onChange={(e) => setYear(e.target.value)} />
    
          <label htmlFor="image" className="form-label">Poster Url</label>
          <input type="text" className="form-control" id="image" placeholder="http://example.com/example1.jpg" style={{ height: '45px' }} value={image} onChange={(e)=> setImage(e.target.value)} />
    
          <label htmlFor="genre" className="form-label">Genre</label>
          <input type="text" className="form-control" id="genre" placeholder="Romance/Comedy/..." style={{ height: '45px' }} value={genre} onChange={(e)=>setGenre(e.target.value)} />
    
          <label htmlFor="trailer" className="form-label">Trailer</label>
          <input type="text" className="form-control" id="trailer" placeholder="Add youtube link..." style={{ height: '45px' }} value={trailer} onChange={(e)=>setTrailer(e.target.value)} />

          <label htmlFor="description" className="form-label">Description Of The Movie</label>
          <input type="text" className="form-control" id="description" placeholder="The movie is ..." style={{ height: '65px' }} value={description} onChange={(e)=>setDescription(e.target.value)}  />
    
            <label id="is_adult">Is it an adult movie?</label>
          <div className="input-container" style={{height:'45px'}}>
          <select id = "is_adult"value={isAdult} onChange={(e) => setIsAdult(e.target.value)}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          </div>

          <button type="button" className="btn btn-outline-light" onClick={()=>handleSubmit()}>Add to Database</button>


        </div>
        </div>
      );       
}