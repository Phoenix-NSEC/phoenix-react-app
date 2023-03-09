import React,{useState,useEffect} from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import logo from "../static/img/logo1.png";
import {HiMenuAlt1,HiX} from "react-icons/hi";
function Navbar() {
  const [navState,setNaState]= useState(false)
  const navigate = useNavigate()
  const handleNav = ()=>{
    setNaState(!navState)
  }
  const location = useLocation()

  useEffect(() => {
        setNaState(false) 
  },[location]) 
  return (
    <div className="navbar flex  z-50 w-full bg-white text fixed top-0 left-0">
      <div className="absolute md:hidden top-50 left-3 z-[1000]" onClick={handleNav}>
       {!navState ?<HiMenuAlt1 className="h-[30px] w-[30px]" />: <HiX className="h-[30px] w-[30px] text-white bg-red-500"/>}
      </div>
      <div className="icon md:w-30 w-full justify-center   py:2 md:py-3 flex  " onClick={()=>navigate("/home")}>
        <img src={logo} alt="" width="100px" />
      </div>
      <div className={`menu  flex justify-center fixed top-0 left-0 w-screen md:w-70 h-full md:h-auto md:relative bg-white/40 backdrop-blur-[8px] md:bg-transparent md:block ${!navState?'hidden':'flex'}`}>
        <ul className="flex flex-col justify-center items-center md:flex-row  gap-10 font-[500]  py-3 text-[1.4rem] md:text-[.5rem] lg:text-[.9rem]">
          <NavLink to="home">
            <li className="text-center">Home</li>
          </NavLink>
          <NavLink to="wings">
            <li className="text-center">Wings</li>
          </NavLink>
          <NavLink to="events">
            <li className="text-center">Events</li>
          </NavLink>
          <NavLink to="core">
            <li className="text-center">Core Team</li>
          </NavLink>
          <NavLink to="webteam">
            <li className="text-center">Web Team</li>
          </NavLink>
          <NavLink to="contactus">
            <li className="text-center">Contact Us</li>
          </NavLink>
          <Link to="register">
            <li className="text-center bg-red-500  px-4 py-2 text-white hover:bg-red-500/80 font-bold">
              Join Us
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
