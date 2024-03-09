// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import DirectorIdContext from "../context/DirectorIdContext";
// import { useParams } from "react-router-dom";
// import './DirectorDetails.css'
// import Navbar from "../_components/Navbar";


// export default function DirectorDetails(){

//     //const { dirId } = useParams();

//     const {currentDirector} = useContext(DirectorIdContext);
//     const [thisDirector,setThisDirector] = useState({});

//     useEffect(() => {
//         try 
//         {
//             axios.get(`http://localhost:5000/director/${currentDirector}`)
//             .then(res => setThisDirector(res.data))
//             .catch(err => console.log(err));


//         } 
//         catch (err) 
//         {
//             console.log(err);
//         }
//     },[])

//     console.log(currentDirector);
//     console.log(thisDirector);

//     return (
//         <div>
//                         <Navbar />
//                         <div className="director-container"  >
//                             <div className="director-id">Director ID: {thisDirector.director_id}</div>
//                             <div className="director-full-name">Director Name: {thisDirector.director_name}</div>
//                             <div className="director-email">Director Email: {thisDirector.director_email}</div>
//                             <div className="director-birthdate">Director Date of Birth: {thisDirector.director_birthdate}</div>
//                             <div className="director-homecountry">Director Country: {thisDirector.director_country}</div>
//                             <div className="director-nationality">Director Nationality: {thisDirector.director_nationality}</div>
//                             <div className="director-awards">Number Of Awards: {thisDirector.director_awards}</div>
//                             <div className="director-gender">Gender: {thisDirector.director_gender}</div>
//                         </div>
//         </div>


//     )
// }

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import DirectorIdContext from "../context/DirectorIdContext";
import { useParams } from "react-router-dom";
import './DirectorDetails.css'
import Navbar from "../_components/Navbar";


export default function DirectorDetails(){

    //const { dirId } = useParams();

    const {currentDirector} = useContext(DirectorIdContext);
    const [thisDirector,setThisDirector] = useState({});

    useEffect(() => {
        try 
        {
            axios.get(`http://localhost:5000/director/${currentDirector}`)
            .then(res => setThisDirector(res.data))
            .catch(err => console.log(err));


        } 
        catch (err) 
        {
            console.log(err);
        }
    },[])

    console.log(currentDirector);
    console.log(thisDirector);

    return (
        <div>
            <Navbar />
            <div className="director-container" style={{ fontSize: "24px", padding: "30px" }}>
                <div className="director-id">Director ID: {thisDirector.director_id}</div>
                <div className="director-full-name">Director Name: {thisDirector.director_name}</div>
                <div className="director-email">Director Email: {thisDirector.director_email}</div>
                <div className="director-birthdate">Director Date of Birth: {thisDirector.director_birthdate}</div>
                <div className="director-homecountry">Director Country: {thisDirector.director_country}</div>
                <div className="director-nationality">Director Nationality: {thisDirector.director_nationality}</div>
                <div className="director-awards">Number Of Awards: {thisDirector.director_awards}</div>
                <div className="director-gender">Gender: {thisDirector.director_gender}</div>
            </div>
        </div>
    )
}
