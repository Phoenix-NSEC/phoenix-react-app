import React from "react";
import { Link } from "react-router-dom";
import { BsTelegram,BsFacebook,BsInstagram,BsYoutube } from "react-icons/bs";

function Footer() {
  return (
   <footer className="relative w-full bg-black/50 border-t border-cyan-500/30 py-8 px-4">
  <div className="mx-6">
    <div className="grid md:grid-cols-3 gap-8">
      {/* About */}
      <div>
        <h3 className="text-xl font-bold text-cyan-400 mb-3">PHOENIX</h3>
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
        <h3 className="text-base font-bold text-cyan-400 mb-4">Useful Links</h3>
        <ul className="space-y-2">
          {[
            ["Home", "/home"],
            ["Wings", "/wings"],
            ["Events", "/events"],
            ["Gallery", "/gallery"],
            ["Core 2026-27", "/core"],
            ["Web Team", "/webteam"],
            ["Contact Us", "/contactus"],
          ].map(([label, link]) => (
            <li key={label}>
              <Link
                to={link}
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact Us */}
      <div>
        <h3 className="text-base font-bold text-cyan-400 mb-4">Contact Us</h3>
        <div className="space-y-2 text-sm text-gray-400">
          <p>
            <span className="text-cyan-300">Address:</span> Netaji Subhash
            Engineering College Technocity, Panchpota, Garia, Kolkata 700152,
            West Bengal, India
          </p>
          <p>
            <span className="text-cyan-300">Email:</span> mail.phoenixnsec@gmail.com
          </p>
        </div>
        <div className="mt-4 flex gap-3">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://t.me/phoenix_nsec2020"
            className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
          >
            <BsTelegram size={20} />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.facebook.com/nsec.phoenix/"
            className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
          >
            <BsFacebook size={20} />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/phoenix_nsec/"
            className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
          >
            <BsInstagram size={20} />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.youtube.com/channel/UCBy1iIhw34E7YlHQ8tc4rDA"
            className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
          >
            <BsYoutube size={22} />
          </a>
        </div>
      </div>
    </div>

    {/* Bottom Border and Copyright */}
    <div className="border-t border-cyan-500/30 mt-6 pt-3 text-center">
      <p className="text-gray-500 text-xs">
        © 2026 Phoenix Tech Club. All Rights Reserved
      </p>
    </div>
  </div>
</footer>

  );
}

export default Footer;
