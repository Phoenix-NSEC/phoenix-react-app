import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";

import Landing from "./pages/Main/Landing";
import Events from "./pages/Events/Events";
import Clubs from "./pages/Clubs/Clubs";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contactus/Contact";
import Coreteam from "./pages/Coreteam/Coreteam";
import Gallary from "./pages/Imagegallary/Gallary";
import Blogs from "./pages/Blogs/Blogs";
import Webteam from "./pages/Webteam/Webteam";
import Layout from "./pages/layout";
import Member from "./pages/member/Member";
import MemberRegistration from "./pages/Registration/Registration";

function App() {
  return (
    <Routes>
      <Route index path="" element={<Landing />} />
      <Route path="/" element={<Layout />}>
        <Route index path="home" element={<Home />} />
        <Route path="events" element={<Events />} />
        <Route path="wings" element={<Clubs />} />
        <Route path="contactus" element={<Contact />} />
        <Route path="core" element={<Coreteam />} />
        <Route path="gallary" element={<Gallary />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="webteam" element={<Webteam />} />
        <Route path="member" element={<Navigate to="/home" />} />
        <Route path="member/:MemId" element={<Member />} />

        <Route path="register" element={<MemberRegistration />} />
      </Route>
    </Routes>
  );
}

export default App;
