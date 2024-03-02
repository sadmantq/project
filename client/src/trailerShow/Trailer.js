import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import Navbar from "../_components/Navbar";

export default function Trailer()
{
    const {link} = useParams();

    //the params must match the word u have written at the routes
    //console.log(urlofvid);
    const [trailer,setTrailer] = useState('');
    //setTrailer(link);

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

        <>
        <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            backgroundColor: 'black', // optional background color
        }}>
        <div
          style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              overflow: 'hidden', // Ensures the border radius is applied properly
            }}
        >
          <YouTube videoId={videoId} opts={opts} onReady={onReady} />
        </div>
      </div>
        
      </>
      );
}