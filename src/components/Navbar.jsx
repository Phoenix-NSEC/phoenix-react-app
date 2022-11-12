import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../static/img/logo1.png"
function Navbar() {
  return (
    <div className="navbar flex  z-50 w-full bg-white text fixed top-0 left-0">
      <div className="icon md:w-30 w-full justify-center   py:2 md:py-3 flex  ">
        <img src={logo} alt=""  width="100px" />
      </div>
      <div className="menu  flex justify-center fixed top-0 left-0 w-screen md:w-70 h-full md:h-auto md:relative bg-white/50 md:bg-transparent hidden md:block">
        <ul className="flex flex-col justify-center items-center md:flex-row  gap-10 font-[500]  py-3">
          <NavLink to="home">
            <li className="text-center">Home</li>
          </NavLink>
          <NavLink to="clubs">
            <li className="text-center">Club</li>
          </NavLink>
          <NavLink to="events">
            <li className="text-center">Events</li>
          </NavLink>
          <NavLink to="core">
            <li className="text-center">Core 2022-2023</li>
          </NavLink>
          <NavLink to="webteam">
            <li className="text-center">Web Team</li>
          </NavLink>
          <NavLink to="contactus">
            <li className="text-center">Contact Us</li>
          </NavLink>
          <NavLink to="contactus">
            <li className="text-center bg-red-500  px-4 py-2 text-white hover:bg-red-500/80 font-bold">Join Us</li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
