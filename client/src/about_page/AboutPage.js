// import React from "react";
// import Navbar from "../_components/Navbar";
// import './AboutPage.css';

// export default function AboutPage() {
//     return (
//         <>
//             <Navbar />
//             <div className="container mt-4">
//                 <div className="row">
//                     <div className="col-md-8">
//                         <h2>About RelateRift</h2>
//                         <p>Welcome to RelateRift - your ultimate destination for movie reviews, ratings, and recommendations! At RelateRift, we're passionate about movies and bringing you the best insights into the world of cinema.</p>
//                         <p>Our platform is designed to help movie enthusiasts like you discover new films, explore different genres, and share your thoughts and opinions with our community of users.</p>
//                         <p>Whether you're looking for in-depth reviews, trivia, or simply want to engage in discussions about your favorite movies, RelateRift has got you covered!</p>
//                         <p>Join us on an exciting cinematic journey where every film has a story, and every opinion matters.</p>
//                         <p>Stay tuned for the latest updates, exclusive content, and much more!</p>
//                     </div>
//                     <div className="col-md-4">
//                         <h3>Our Mission</h3>
//                         <p>At RelateRift, our mission is to create a vibrant community of movie lovers where individuals can connect, share, and celebrate their passion for cinema.</p>
//                         <h3>Contact Us</h3>
//                         <p>If you have any questions, feedback, or suggestions, feel free to reach out to us at <a href="https://www.facebook.com/profile.php?id=100076158625333">contact@relaterift.com</a>. We'd love to hear from you!</p>
//                     </div>
//                 </div>
//                 <div className="row mt-4">
//                     <div className="col-md-12 text-center">
//                         <p>Ready to explore the world of cinema?</p>
//                         <a href="/movies" className="btn btn-primary btn-lg">Explore Now</a>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }


// import React from "react";
// import Navbar from "../_components/Navbar";
// import './AboutPage.css';
// import { Carousel } from "react-bootstrap";

// export default function AboutPage() {
//     return (
//         <>
//             <Navbar />
//             <div className="container mt-4">
//                 <h2 className="text-center mb-4">About RelateRift</h2>
                
//                 <Carousel>
//                     <Carousel.Item>
//                         <img
//                             className="d-block w-100"
//                             src="https://via.placeholder.com/800x400"
//                             alt="First slide"
//                         />
//                         <Carousel.Caption>
//                             <h3>Welcome to RelateRift</h3>
//                             <p>Discover a world of movies and reviews.</p>
//                         </Carousel.Caption>
//                     </Carousel.Item>
//                     <Carousel.Item>
//                         <img
//                             className="d-block w-100"
//                             src="https://via.placeholder.com/800x400"
//                             alt="Second slide"
//                         />

//                         <Carousel.Caption>
//                             <h3>Join Our Community</h3>
//                             <p>Connect with movie enthusiasts worldwide.</p>
//                         </Carousel.Caption>
//                     </Carousel.Item>
//                     <Carousel.Item>
//                         <img
//                             className="d-block w-100"
//                             src="https://via.placeholder.com/800x400"
//                             alt="Third slide"
//                         />

//                         <Carousel.Caption>
//                             <h3>Explore & Engage</h3>
//                             <p>Discover new films and share your opinions.</p>
//                         </Carousel.Caption>
//                     </Carousel.Item>
//                 </Carousel>

//                 <div className="row mt-4">
//                     <div className="col-md-8">
//                         <h3>Our Mission</h3>
//                         <p>At RelateRift, our mission is to create a vibrant community of movie lovers where individuals can connect, share, and celebrate their passion for cinema.</p>
//                     </div>
//                     <div className="col-md-4">
//                         <h3>Contact Us</h3>
//                         <p>If you have any questions, feedback, or suggestions, feel free to reach out to us at <a href="mailto:contact@relaterift.com">contact@relaterift.com</a>. We'd love to hear from you!</p>
//                     </div>
//                 </div>
//                 <div className="row mt-4">
//                     <div className="col-md-12 text-center">
//                         <p>Ready to explore the world of cinema?</p>
//                         <a href="/explore" className="btn btn-primary btn-lg">Explore Now</a>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }


import React from "react";
import Navbar from "../_components/Navbar";
import './AboutPage.css';

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-8">
                        <h2 className="about-heading">About RelateRift</h2>
                        <p>Welcome to RelateRift - your ultimate destination for movie reviews, ratings, and recommendations! At RelateRift, I'm passionate about movies and bringing you the best insights into the world of cinema.</p>
                        <p>My platform is designed to help movie enthusiasts like you discover new films, explore different genres, and share your thoughts and opinions with our community of users.</p>
                        <p>Whether you're looking for in-depth reviews, trivia, or simply want to engage in discussions about your favorite movies, My RelateRift has got you covered!</p>
                        <p>Join me on an exciting cinematic journey where every film has a story, and every opinion matters.</p>
                        <p>Stay tuned for the latest updates, exclusive content, and much more!</p>
                    </div>
                    <div className="col-md-4">
                        <div className="mission-section">
                            <h3>My Mission</h3>
                            <p>At RelateRift, my mission is to create a vibrant community of movie lovers where individuals can connect, share, and celebrate their passion for cinema.</p>
                        </div>
                        <div className="contact-section mt-4">
                            <h3>Contact Me</h3>
                            <p>If you have any questions, feedback, or suggestions, feel free to reach out to me at <a href="https://www.facebook.com/profile.php?id=100076158625333">contact@relaterift.com</a>. I'd love to hear from you!</p>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-md-12 text-center">
                        <p>Ready to explore the world of cinema?</p>
                        <a href="/movies" className="btn btn-primary btn-lg">Explore Now</a>
                    </div>
                </div>
            </div>
        </>
    )
}
