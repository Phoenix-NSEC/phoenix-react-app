import React from "react";
import { Link } from "react-router-dom";
import { BsTelegram,BsFacebook,BsInstagram,BsYoutube } from "react-icons/bs";

function Footer() {
  return (
    <footer className="relative w-full bg-black/50 border-t border-cyan-500/30 py-16 px-4">
      <div className="m-6 ">
        <div className="grid md:grid-cols-3 gap-12">
          {/* About */}
          <div>
            <h3 className="text-2xl font-bold text-cyan-400 mb-4">PHOENIX</h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              Phoenix has always strived for overall development of an individual,
              from technical to communication skills of a person by conducting
              domain-specific forums to interpersonal development by working in a
              team and taking leadership roles. Inculcating competitive spirit
              among college students by organizing events and tech Fests for them
              to display their skills, we do it all.
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-bold text-cyan-400 mb-6">Useful Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/home" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/wings" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm">
                  Wings
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/core" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm">
                  Core 2025-26
                </Link>
              </li>
              <li>
                <Link to="/webteam" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm">
                  Web Team
                </Link>
              </li>
              <li>
                <Link to="/contactus" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-bold text-cyan-400 mb-6">Contact Us</h3>
            <div className="space-y-3 text-sm text-gray-400">
              <p>
                <span className="text-cyan-300">Address:</span> Netaji Subhash Engineering College Technocity, Panchpota, Garia, Kolkata 700152, West Bengal, India
              </p>
              <p>
                <span className="text-cyan-300">Email:</span> info@phoenixnsec.in
              </p>
            </div>
            <div className="mt-6 flex gap-4 social-links">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://t.me/phoenix_nsec2020"
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
              >
                <BsTelegram size={'22px'} />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.facebook.com/nsec.phoenix/"
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
              >
                <BsFacebook size={'22px'} />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/phoenix_nsec/"
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
              >
                <BsInstagram size={'22px'} />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.youtube.com/channel/UCBy1iIhw34E7YlHQ8tc4rDA"
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
              >
                <BsYoutube size={'26px'} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Border and Copyright */}
        <div className="border-t border-cyan-500/30 mt-6 pt-5 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 Phoenix Tech Club. All Rights Reserved | Made with <span className="text-cyan-400">◈</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
