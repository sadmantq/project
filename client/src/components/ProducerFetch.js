// // // import React, { useState, useEffect, useContext } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import axios from "axios";
// // // import ProducerContext from "../context/ProducerContext";

// // // export default function ProducerFetch() {
// // //     const [producers, setProducers] = useState([]);
// // //     const { currentProducer, setCurrentProducer } = useContext(ProducerContext);
// // //     const navigate = useNavigate();

// // //     useEffect(() => {
// // //         try {
// // //             axios.get(`http://localhost:5000/producers`)
// // //                 .then(res => setProducers(res.data))
// // //                 .catch(err => console.log(err));
// // //         } catch (err) {
// // //             console.log(err);
// // //         }
// // //     }, []);

// // //     return (
// // //         <div className="container" style={{justifyContent:'center', alignContent:'center'}}>
// // //             {producers.map(item => (
// // //                 <div className="producer-item" style={{display:'flex' , justifyContent:'center', border:"solid .6px black"}} key={item.producer_id} onClick={()=> {
// // //                     setCurrentProducer(item.producer_id);
// // //                     navigate(`/producer/${item.producer_id}`);
// // //                 }}>
// // //                     <p className="producer-name" style={{marginRight: '20px'}}>{item.producer_id}</p>
// // //                     <p>{item.producer_name}</p>
// // //                 </div>
// // //             ))}
// // //         </div>
// // //     );
// // // }


// // import React, { useState, useEffect, useContext } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import ProducerContext from "../context/ProducerContext";
// // import Navbar from "../_components/Navbar";

// // export default function ProducerFetch() {
// //     const [producers, setProducers] = useState([]);
// //     const { currentProducer, setCurrentProducer } = useContext(ProducerContext);
// //     const navigate = useNavigate();

// //     useEffect(() => {
// //         try {
// //             axios.get(`http://localhost:5000/producers`)
// //                 .then(res => setProducers(res.data))
// //                 .catch(err => console.log(err));
// //         } catch (err) {
// //             console.log(err);
// //         }
// //     }, []);

// //     return (
// //         <div>
// //             <Navbar />
// //         <div className="container" style={{marginTop:"20px"}}>
// //             <div className="row">
// //                 {producers.map(item => (
// //                     <div
// //                         key={item.producer_id}
// //                         className="col-md-4 mb-4 _hovering"
// //                         style={{
// //                             backgroundColor: "#f8f9fa",
// //                             borderRadius: "10px",
// //                             boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
// //                             cursor: "pointer",
// //                             padding: "20px",
// //                             transition: "transform 0.3s ease",
// //                             textAlign: "center",
                            
// //                         }}
// //                         onClick={() => {
// //                             setCurrentProducer(item.producer_id);
// //                             navigate(`/producer/${item.producer_id}`);
// //                         }}
// //                     >
// //                         <h5 style={{ color: "#343a40", marginBottom: "15px" }}>{item.producer_name}</h5>
// //                         <p style={{ color: "#6c757d", marginBottom: "0" }}>Producer ID: {item.producer_id}</p>
// //                     </div>
// //                 ))}
// //             </div>
// //         </div>
// //         </div>
// //     );
// // }


// import React, { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import ProducerContext from "../context/ProducerContext";
// import './ProducerFetch.css';

// export default function ProducerFetch() {
//     const [producers, setProducers] = useState([]);
//     const { currentProducer, setCurrentProducer } = useContext(ProducerContext);
//     const navigate = useNavigate();

//     useEffect(() => {
//         try {
//             axios.get(`http://localhost:5000/producers`)
//                 .then(res => setProducers(res.data))
//                 .catch(err => console.log(err));
//         } catch (err) {
//             console.log(err);
//         }
//     }, []);

//     return (
//         <div className="container">
//             <div className="row">
//                 {producers.map(item => (
//                     <div
//                         key={item.producer_id}
//                         className="col-md-4 mb-4"
//                         style={{
//                             backgroundColor: "#f8f9fa",
//                             borderRadius: "10px",
//                             boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                             cursor: "pointer",
//                             padding: "20px",
//                             textAlign: "center",
//                             transition: "transform 0.3s ease",
//                             ":hover": { // Apply transform scale effect on hover
//                                 transform: "scale(1.1)",
//                             },
//                         }}
//                         onClick={() => {
//                             setCurrentProducer(item.producer_id);
//                             navigate(`/producer/${item.producer_id}`);
//                         }}
//                     >
//                         <h5 style={{ color: "#343a40", marginBottom: "15px" }}>{item.producer_name}</h5>
//                         <p style={{ color: "#6c757d", marginBottom: "0" }}>Producer ID: {item.producer_id}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }


import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProducerContext from "../context/ProducerContext";
import "./ProducerFetch.css"; // Import CSS file for styling
import Navbar from "../_components/Navbar";

export default function ProducerFetch() {
    const [producers, setProducers] = useState([]);
    const { currentProducer, setCurrentProducer } = useContext(ProducerContext);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            axios.get(`http://localhost:5000/producers`)
                .then(res => setProducers(res.data))
                .catch(err => console.log(err));
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <div>
            <Navbar />
        <div className="container">
            <div className="row">
                {producers.map(item => (
                    <div
                        key={item.producer_id}
                        className="col-md-4 mb-4 producer-card" // Add producer-card class
                        onClick={() => {
                            setCurrentProducer(item.producer_id);
                            navigate(`/producer/${item.producer_id}`);
                        }}
                    >
                        <h5 className="producer-name">{item.producer_name}</h5>
                        <p className="producer-id">Producer ID: {item.producer_id}</p>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
}
