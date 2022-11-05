import React from 'react'
import "../../static/css/style-landing.css"
import img1 from "../../static/images/phoenix_white.png"
import Typewriter from 'typewriter-effect';

function Main() {
  return (
    <>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  {/* <link rel="stylesheet" href="./style-landing.css" /> */}
  <link rel="icon" href="{% static '/favicon/favicon.png' %}" />
  <meta
    name="description"
    content="Phoenix has always strived for overall development of an individual, from technical to communication skills of a person by conducting domain-specific forums to interpersonal development by working in a team and taking leadership roles."
  />
  <link
    rel="stylesheet"
    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
    integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
    crossOrigin="anonymous"
  />
  <link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
  />
  <title>PHOENIX</title>
  <div id='particles-js'>
  <nav className="navbar-nav ml-auto"></nav>
  <div className="grid">
    <div className="main">
      <img src={img1} />
      <div className="ic">
        <a
          target="_blank"
          href="https://www.facebook.com/nsec.phoenix/"
          className="facebook"
        >
          <i className="fa fa-facebook-f" />
        </a>
        <a target="_blank" href="" className="youtube">
          {" "}
          <i className="fa fa-youtube" />
        </a>
        <a
          target="_blank"
          href="https://www.instagram.com/phoenix_nsec/"
          className="instagram"
        >
          {" "}
          <i className="fa fa-instagram" />
        </a>
      </div>
    </div>
    <div className="text">
      <h1 className="phoenix">
        <div className="typewriter">
        <Typewriter
          options={{
          strings: ["Phoenix", "Robonix", "Eloquense", "Nirmaan", "Cybernix"],
          autoStart: true,
          loop: true,
          //skipAddStyles: true,
          }}
        />
        </div>
      </h1>

      <h3 className="tag">Come,Let's Rise</h3>
      <ul>
        <li>
          <a className="discover" href="/home">
            Explore Us
          </a>
        </li>
      </ul>
      <br />
      <div></div>
    </div>
  </div>
  <div className="icons">
    <a
      target="_blank"
      href="https://www.facebook.com/nsec.phoenix/"
      className="facebook"
    >
      <i className="fa fa-facebook-f" />
      Facebook
    </a>
    <a
      target="_blank"
      href="https://www.youtube.com/channel/UCBy1iIhw34E7YlHQ8tc4rDA"
      className="youtube"
    >
      {" "}
      <i className="fa fa-youtube" />
      Youtube
    </a>
    <a
      target="_blank"
      href="https://www.instagram.com/phoenix_nsec/"
      className="instagram"
    >
      {" "}
      <i className="fa fa-instagram" />
      Instagram
    </a>
    <a
      target="_blank"
      href="https://t.me/phoenix_nsec2020/"
      className="telegram"
    >
      {" "}
      <i className="fa fa-telegram" />
      Telegram
    </a>
  </div>
  {/* <script>{particles.min.js}</script> */}
  {/* Global site tag (gtag.js) - Google Analytics */}
  </div>
</>

  )
}

export default Main