import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { HiMenuAlt1, HiX } from "react-icons/hi";
import logo from "../static/img/logo2.png";
function Navbar() {
  const [navState, setNaState] = useState(false);
  const navigate = useNavigate();
  const handleNav = () => {
    setNaState(!navState);
  };
  const location = useLocation();

  useEffect(() => {
    setNaState(false);
  }, [location]);
  return (
    <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md border-b border-cyan-500/30 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* <div className="flex justify-center md:justify-center items-center h-16"> */}
        <div className="relative flex items-center h-16">
          {/* --- Logo --- */}
          <div
            className="absolute left-4 flex items-center cursor-pointer"
            onClick={() => navigate("/home")}
          >
            <img src={logo} alt="" width="100px" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            <NavLink
              to="home"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-cyan-400"
                    : "text-gray-300 hover:text-cyan-400"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="wings"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-cyan-400"
                    : "text-gray-300 hover:text-cyan-400"
                }`
              }
            >
              Wings
            </NavLink>
            <NavLink
              to="events"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-cyan-400"
                    : "text-gray-300 hover:text-cyan-400"
                }`
              }
            >
              Events
            </NavLink>
            <NavLink
              to="gallery"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-cyan-400"
                    : "text-gray-300 hover:text-cyan-400"
                }`
              }
            >
              Gallery
            </NavLink>
            <NavLink
              to="core"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-cyan-400"
                    : "text-gray-300 hover:text-cyan-400"
                }`
              }
            >
              Core Team
            </NavLink>
            <NavLink
              to="webteam"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-cyan-400"
                    : "text-gray-300 hover:text-cyan-400"
                }`
              }
            >
              Web Team
            </NavLink>
            <NavLink
              to="contactus"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-cyan-400"
                    : "text-gray-300 hover:text-cyan-400"
                }`
              }
            >
              Contact Us
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-cyan-400 absolute right-4 top-1/2 -translate-y-1/2"
            onClick={handleNav}
          >
            {!navState ? (
              <HiMenuAlt1 className="h-6 w-6" />
            ) : (
              <HiX className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {navState && (
          <div className="md:hidden pb-4 border-t border-cyan-500/30">
            <NavLink
              to="home"
              className={({ isActive }) =>
                `block text-gray-300 hover:text-cyan-400 py-2 text-sm transition-colors ${
                  isActive ? "text-cyan-400" : ""
                }`
              }
              onClick={handleNav}
            >
              Home
            </NavLink>
            <NavLink
              to="wings"
              className={({ isActive }) =>
                `block text-gray-300 hover:text-cyan-400 py-2 text-sm transition-colors ${
                  isActive ? "text-cyan-400" : ""
                }`
              }
              onClick={handleNav}
            >
              Wings
            </NavLink>
            <NavLink
              to="events"
              className={({ isActive }) =>
                `block text-gray-300 hover:text-cyan-400 py-2 text-sm transition-colors ${
                  isActive ? "text-cyan-400" : ""
                }`
              }
              onClick={handleNav}
            >
              Events
            </NavLink>
            <NavLink
              to="gallery"
              className={({ isActive }) =>
                `block text-gray-300 hover:text-cyan-400 py-2 text-sm transition-colors ${
                  isActive ? "text-cyan-400" : ""
                }`
              }
              onClick={handleNav}
            >
              Gallery
            </NavLink>
            <NavLink
              to="core"
              className={({ isActive }) =>
                `block text-gray-300 hover:text-cyan-400 py-2 text-sm transition-colors ${
                  isActive ? "text-cyan-400" : ""
                }`
              }
              onClick={handleNav}
            >
              Core Team
            </NavLink>
            <NavLink
              to="webteam"
              className={({ isActive }) =>
                `block text-gray-300 hover:text-cyan-400 py-2 text-sm transition-colors ${
                  isActive ? "text-cyan-400" : ""
                }`
              }
              onClick={handleNav}
            >
              Web Team
            </NavLink>
            <NavLink
              to="contactus"
              className={({ isActive }) =>
                `block text-gray-300 hover:text-cyan-400 py-2 text-sm transition-colors ${
                  isActive ? "text-cyan-400" : ""
                }`
              }
              onClick={handleNav}
            >
              Contact Us
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
