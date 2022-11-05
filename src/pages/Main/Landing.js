import React from 'react'

import Typewriter from 'typewriter-effect';

function Main() {
  return (
    <>
  <div id='particles-js'>
  <nav className="navbar-nav ml-auto"></nav>
  <div className="grid">
    <div className="main">
      {/* <img src={img1} /> */}
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

  </div>
</>

  )
}

export default Main