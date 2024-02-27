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




function App() {

  const [loginInfo,setLoginInfo] = React.useState();
  const [userId,setUserId] = React.useState();
  const [currentMovie,setCurrentMovie] = React.useState();

  return (
    <>
        <UserIdContext.Provider value = {{userId,setUserId}}>
        <LoginContext.Provider value = {{loginInfo,setLoginInfo}}>
        <CurrentMovieContext.Provider value = {{currentMovie,setCurrentMovie}}>
      <Routes>
        <Route path = '/' element = {<WelcomePage /> }/>

        <Route path= '/login' element = {<Login />} />
        <Route path= '/signup' element = {<Signup />} />
        <Route path = '/movies' element = {<MovieFetch />}  />
        <Route path = '/errorLogin' element= {<ErrorPage />} />
        <Route path = '/movies/:id' element = {<MovieDetails/>}/>
       </Routes>

       </CurrentMovieContext.Provider>
        </LoginContext.Provider>
        </UserIdContext.Provider>
    </>
  );
}

export default App;


