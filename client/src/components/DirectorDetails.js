import axios from "axios";
import React, { useEffect } from "react";

export default function DirectorDetails(){

    const [director,setDirector] = React.useState();
    
    useEffect(()=>{
        try {
            axios.get("http://localhost:5000/directors")
            .then(res => setDirector(res.data))
            .then(data => console.log(data));

        } catch (err) {
            console.error(err);
        }   
    }

    ,[])

    return (
        <>
            <h1>  </h1>
        </>
    )
}