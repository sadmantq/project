import { Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";

import MovieFetch from "./components/MovieFetch";
import ErrorPage from "./components/ErrorPage";
import WelcomePage from "./components/WelcomePage";

function App() {
  return (
    <>
      <Routes>
        <Route path = '/' element = {<WelcomePage /> }/>
        <Route path= '/login' element = {<Login />} />
        <Route path= '/signup' element = {<Signup />} />
        <Route path = '/movies' element = {<MovieFetch />}  />
        <Route path = '/errorLogin' element= {<ErrorPage />} />
       </Routes>
    </>
  );
}

export default App;


