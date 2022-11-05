import { Routes, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";


import Landing from "./components/Main/Landing";
import Events from "./components/Events/Events";
import Clubs from "./components/Clubs/Clubs";
import Home from "./components/Home/Home";
import Contact from "./components/Contactus/Contact";
import Coreteam from "./components/Coreteam/Coreteam";
import Gallary from "./components/Imagegallary/Gallary";
import Blogs from "./components/Blogs/Blogs";
import Webteam from "./components/Webteam/Webteam";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />}/>
      <Route path="/home" element={<Home />}/>
      <Route path="/events" element={<Events />}/>
      <Route path="/clubs" element={<Clubs />}/>
      <Route path="/contact" element={<Contact />}/>
      <Route path="/core" element={<Coreteam />}/>
      <Route path="/gallary" element={<Gallary />}/>
      <Route path="/blogs" element={<Blogs />}/>
      <Route path="/webteam" element={<Webteam />}/>

    </Routes>
  );
}

export default App;
