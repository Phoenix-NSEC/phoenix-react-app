import React from "react";
import { Link } from "react-router-dom";
import { BsTelegram,BsFacebook,BsInstagram,BsYoutube } from "react-icons/bs";

function Footer() {
  return (
    <div className="text-white font-[500] text-sm pt-3">
      <div className="bg-[#00428A] top p-4 grid-col-12 lg:flex base:flex-col md:flex">
        <div className="col-lg-4 col-md-3 footer-info">
          <h3 className="font-[1000] text-3xl text-left py-2">Phoenix</h3>
          <p className="lg:text-justify base:text-justify md:text-left">
            Phoenix has always strived for overall development of an individual,
            from technical to communication skills of a person by conducting
            domain-specific forums to interpersonal development by working in a
            team and taking leadership roles. Inculcating competitive spirit
            among college students by organizing events and tech Fests for them
            to display their skills, we do it all.
          </p>
        </div>

        <div className="col-lg-2 col-md-2 text-left footer-links">
          <h4 className="font-[700] text-xl py-2">Useful Links</h4>
          <ul>
            <li className="py-1">
              <Link className="hover:text-slate-50" to="/home">
                Home
              </Link>
            </li>
            <li className="py-1">
              <Link className="hover:text-slate-50" to="/clubs">
                Clubs
              </Link>
            </li>
            <li className="py-1">
              <Link className="hover:text-slate-50" to="/events">
                Events
              </Link>
            </li>
            <li className="py-1">
              <Link className="hover:text-slate-50" to="/core">
                Core 2022-23
              </Link>
            </li>
            <li className="py-1">
              <Link className="hover:text-slate-50" to="/webteam">
                Web team
              </Link>
            </li>
            <li className="py-1">
              <Link className="hover:text-slate-50" to="/contactus">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-lg-3 col-md-3 leading-relaxed footer-contact">
          <h4 className="font-[700] text-xl py-2">Contact Us</h4>
          <p>
            Netaji Subhash Engineering College, Garia, Panchpota, Kolkata, West
            Bengal, 700152
            <br />
            <strong>Email: info@phoenixnsec.in</strong>
            <br />
          </p>
          <div className="mt-2 flex social-links">
            <a
              target="_blank"
              href="https://t.me/phoenix_nsec2020"
              className="mx-1 telegram"
            >
              <BsTelegram size={'22px'} />
            </a>
            <a
              target="_blank"
              href="https://www.facebook.com/nsec.phoenix/"
              className="mx-1 facebook"
            >
              <BsFacebook size={'22px'} />
            </a>
            <a
              target="_blank"
              href="https://www.instagram.com/phoenix_nsec/"
              className="mx-1 instagram"
            >
              <BsInstagram size={'22px'} />
            </a>
            <a
              target="_blank"
              href="https://www.youtube.com/channel/UCBy1iIhw34E7YlHQ8tc4rDA"
              className="mx-1 youtube"
            >
              <BsYoutube size={'26px'} />
            </a>
          </div>
        </div>

        <div className="col-lg-3 col-md-3 footer-newsletter">
          <h4 className="font-[700] text-xl py-2">Feedback</h4>
          <p>
            We would love to have feedbacks from anyone who want to suggest any
            improvements in our work.
          </p>
          <form action="/review" method="POST" className="py-3">
            <input
              type="text"
              name="review"
              required
              className="bg-[#1545B3] px-2 py-1 rounded shadow-xl"
            />{" "}
            <br />
            <button
              type="submit"
              value="Submit"
              className="mt-2 px-4 py-1 rounded font-[600] text-base bg-[#2563EB] text-slate-50 hover:bg-white hover:text-[#2563EB]"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <p className="text-[.8rem] md:text-[1rem] bg-[#013a77] p-3 text-center">
        &copy; Copyright Phoenix 2021-22. All Rights Reserved
      </p>
    </div>
  );
}

export default Footer;
