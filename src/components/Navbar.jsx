import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../static/img/logo1.png"
function Navbar() {
  return (
    <div className="navbar flex z-50 w-full bg-white text fixed top-0 left-0">
      <div className="icon w-30  py-3 flex justify-center">
        <img src={logo} alt=""  width="100px" />
      </div>
      <div className="menu w-70  py-3 flex justify-center">
        <ul className="flex gap-10 font-[500]">
          <NavLink to="home">
            <li className="">Home</li>
          </NavLink>
          <NavLink to="clubs">
            <li>Club</li>
          </NavLink>
          <NavLink to="events">
            <li>Events</li>
          </NavLink>
          <NavLink to="core">
            <li>Core 2022-2023</li>
          </NavLink>
          <NavLink to="webteam">
            <li>Web Team</li>
          </NavLink>
          <NavLink to="contactus">
            <li>Contact Us</li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
