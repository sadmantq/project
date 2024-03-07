import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import YouTube from "react-youtube";
import Navbar from "../_components/Navbar";
import { faBucket } from "@fortawesome/free-solid-svg-icons";
import CurrentMovieContext from "../context/CurrentMovieContext";

export default function Trailer()
{
    const {link} = useParams();

    //the params must match the word u have written at the routes
    //console.log(urlofvid);
    const [trailer,setTrailer] = useState('');
    //setTrailer(link);

    const navigate = useNavigate();
    const {currentMovie} = useContext(CurrentMovieContext);

    const opts = {
        height: '390',
        width: '640',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 0,
        },
      };
    
      // YouTube video ID
      //const videoId = 'H7GtkK44npY';
      const videoId = link;
    
      // Event handler for when the video player is ready
      const onReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
      };
    
      return (
          // <div >
          //   <YouTube videoId={videoId} opts={opts} onReady={onReady} style={{
              //     display: 'flex',
              //     justifyContent: 'center',
              //     alignItems: 'center',
              //     border: '1px solid #ccc',
              //     borderRadius: '8px',
              //     overflow: 'hidden', // Ensures the border radius is applied properly
              //     height:'390px',
              //     width:'640px'
              //   }} />
              // </div>
              
    //     <div style={{backgroundColor:'black'}}>
    //         <Navbar />
    //     <div>
    //     <div
    //     style={{
    //         display: 'flex',
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //         position: 'fixed',
    //         top: '0',
    //         left: '0',
    //         right: '0',
    //         bottom: '0',
    //         backgroundColor: 'black', // optional background color
    //         // height:'390px',
    //         // width:'640px'
    //     }}>
    //     <div
    //       style={{
    //           border: '1px solid #ccc',
    //           borderRadius: '8px',
    //           overflow: 'hidden', // Ensures the border radius is applied properly
    //         }}
    //     >
    //       <YouTube videoId={videoId} opts={opts} onReady={onReady} />
    //     </div>
    //   </div>
    // </div>
    //   </div>

    <div>
    <Navbar style={{ position: 'fixed', top: '0', width: '100%', zIndex: '1' }} />
    
    <div className="trailer-container">
    <button type="button" className="btn btn-outline-light" onClick={() => navigate(`/movies/${currentMovie}`)} style={{marginLeft:'5px',marginTop:'5px'}}>
        Back
    </button>
    <div style={{ paddingTop: '60px' }}> {/* Adjust the top padding based on the navbar height */}
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: '20px', /* Adjust the spacing between navbar and video */
        }}>
            <div style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                overflow: 'hidden', // Ensures the border radius is applied properly
            }}>
                <YouTube videoId={videoId} opts={opts} onReady={onReady} />
            </div>
        </div>
    </div>
    </div>
    </div>

      );
}