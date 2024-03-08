import { Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { Context } from "react";
import React from "react";
import MovieFetch from "./components/MovieFetch";
import ErrorPage from "./components/ErrorPage";
import WelcomePage from "./components/WelcomePage";
import MovieDetails from "./components/MovieDetails";
import LoginContext from "./context/LoginContext";
import UserIdContext from "./context/UserIdContext";
import Navbar from "./_components/Navbar";
import CurrentMovieContext from "./context/CurrentMovieContext";
import ReviewContext from "./context/ReviewContext";
import DirectorFetch from "./components/DirectorFetch";
import DirectorIdContext from "./context/DirectorIdContext";
import DirectorDetails from "./components/DirectorDetails";
import AboutPage from "./about_page/AboutPage";
import Trailer from "./trailerShow/Trailer";
import SearchResults from "./Search/SearchResults";
import AdminMain from "./admin/AdminMain";
import AddMovie from "./admin/addMovie/AddMovie";
import RemoveMovie from "./admin/removeMovie/RemoveMovie";
import Mywatchlist from "./watchList/Mywatchlist";
import ProducerContext from "./context/ProducerContext";
import ProducerFetch from "./components/ProducerFetch";
import ProducerDetails from "./components/ProducerDetails";




function App() {

  const [loginInfo,setLoginInfo] = React.useState();
  const [userId,setUserId] = React.useState();
  const [currentMovie,setCurrentMovie] = React.useState();
  const [currentDirector,setCurrentDirector] = React.useState();
  const [currentProducer, setCurrentProducer] = React.useState();
  

  const [reviewCng,setReviewCng] = React.useState(true);

  return (
    <>
        <ProducerContext.Provider value = {{currentProducer, setCurrentProducer}}>
        <DirectorIdContext.Provider value = {{currentDirector,setCurrentDirector}}>
        <UserIdContext.Provider value = {{userId,setUserId}}>
        <LoginContext.Provider value = {{loginInfo,setLoginInfo}}>
        <CurrentMovieContext.Provider value = {{currentMovie,setCurrentMovie}}>
        <ReviewContext.Provider value={{reviewCng,setReviewCng}}>
      <Routes>


        <Route path = '/' element = {<WelcomePage /> }/>
        <Route path= '/login' element = {<Login />} />
        <Route path= '/signup' element = {<Signup />} />
        <Route path = '/movies' element = {<MovieFetch />}  />
        <Route path = '/errorLogin' element= {<ErrorPage />} />
        <Route path = '/movies/:id' element = {<MovieDetails/>}/>
        <Route path = '/directorFetch' element = {<DirectorFetch />}/>
        <Route path = '/director/:id' element = {<DirectorDetails/>} />
        <Route path = '/about' element ={<AboutPage/>} />
        <Route path = '/trailer/:link' element = {<Trailer />} />
        <Route path = '/filterSearch' element = {<SearchResults />} />
        <Route path = '/admin' element = {<AdminMain />} />
        <Route path = '/admin/addMovie' element ={<AddMovie />} />
        <Route path = '/admin/removeMovie' element ={<RemoveMovie />} />
        <Route path = '/myWatchlist' element = {<Mywatchlist />} />
        <Route path = '/producerFetch' element = {<ProducerFetch />} />
        <Route path = '/producer/:id' element = {<ProducerDetails />} />


        
       </Routes>

       </ReviewContext.Provider>
       </CurrentMovieContext.Provider>
        </LoginContext.Provider>
        </UserIdContext.Provider>
        </DirectorIdContext.Provider>
        </ProducerContext.Provider>
    </>
  );
}

export default App;


