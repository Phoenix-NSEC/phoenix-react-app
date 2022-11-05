import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar flex w-full bg-white text fixed top-0 left-0">
      <div className="icon w-30  py-3 flex justify-center">ICON</div>
      <div className="menu w-70  py-3 flex justify-center">
        <ul className="flex gap-10 font-[500]">
          <NavLink to="home">
            <li className="">Home</li>
          </NavLink>
          <NavLink to="club">
            <li>Club</li>
          </NavLink>
          <NavLink to="events">
            <li>Events</li>
          </NavLink>
          <NavLink to="core">
            <li>Core 2022-2023</li>
          </NavLink>
          <NavLink to="web">
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
