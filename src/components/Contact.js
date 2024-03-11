import React from "react";
import logo1 from "./images/25231-removebg-preview.png";
import logo2 from "./images/image-removebg-preview.png";
import logo3 from "./images/image__1_-removebg-preview.png";
import logo4 from "./images/image__2_-removebg-preview.png";
import logo5 from "./images/image__3_-removebg-preview.png";
import logo6 from "./images/marker-glyph-black-icon-png_293085__1_-removebg-preview.png";
export default function Contact() {
  return (
    <div className="box container">
      <h2 className="phone">Contact With Me....</h2>
      <br />
      <h3>Details:</h3>
      <ul>
        <li>Name: Honey Pathkar</li>
        <li>
          <img
            src={logo6}
            width="30"
            height="30"
            alt="location"
          />{" "}
          Baran, Rajasthan (325205)
        </li>
      </ul>
      <br />
      <h3>Contact Details:</h3>
      <ul>
        <li>
          <img src={logo2} width="50" height="20" alt="phone" />
          +917976909686
        </li>
        <li>
          <img src={logo3} width="50" height="30" alt="email" />
        </li>
        <ul>
          <li>
            <a href="mailto: honeypatkar70@gmail.com" target='_blank'
          rel='noreferrer'>
              honeypatkar70@gmail.com
            </a>
          </li>
          <li>
            <a href="mailto: honeypatwa358@gmail.com" target='_blank'
          rel='noreferrer'>
              honeypatwa358@gmail.com
            </a>
          </li>
        </ul>
      </ul>
      <br />
      <div className="social">
        <h3>Social Profiles:</h3>
        <a
          href="https://instagram.com/honey_patwa_01?igshid=ZDc40DBmNjImNQ=="
          alt="instagram"
          target='_blank'
          rel='noreferrer'
        >
          <img src={logo4} width="40" height="40" alt="instagram" className="mx-2"/>
        </a>
        <a
          href="https://www.facebook.com/honey.patkar.98
    ?mibextid=ZbWKWL"
          alt="facebook"
          target='_blank'
          rel='noreferrer'
        >
          <img src={logo5} width="40" height="40" alt="facebook" className="mx-2" />
        </a>
        <a href="https://github.com/honeypatkar" target='_blank'
          rel='noreferrer'>
          <img
            src={logo1}
            alt="github"
            width="40"
            height="40"
            className="mx-2"
          />
        </a>
      </div>
      <style jsx="true">
        {`
        .phone {
            font-family: 'Pangolin', cursive;
            font-size: 30px;
          }
          .box {
            padding-top: 50px;
            padding-bottom: 300px;
            padding-left: 20px;
            padding-right: 225px;
            }
        `}
      </style>
    </div>
  );
}
