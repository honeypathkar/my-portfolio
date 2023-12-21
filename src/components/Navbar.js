import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 logo">
            <h1 className="logo">
              <Link to="/">H</Link>
            </h1>
          </div>
          <div className="col-md-6 information text-right">
            <h1>Hello I'm Honey</h1>
            <h5>A Web Designer</h5>
          </div>
          <div className="row nav">
            <div className="col-md-4 text-center">
              <Link to="/">Home</Link>
            </div>
            <div className="col-md-4 text-center">
              <Link to="/work">Work</Link>
            </div>
            <div className="col-md-4 text-center">
              <Link to="/contact">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <style jsx="true">
        {`
            .logo {
                font-size: 80px;
                font-family: 'Permanent Marker', cursive;
                color: #4f4f4f;
              }
              .nav{
                background-color: black;
                display: -ms-grid;
                display: flex;
                place-items: center;
              }
              .nav div a{
                padding: 5px;
                text-decoration: none;
                color: white;
                -webkit-transition: 0.4s ease-out;
                -o-transition: 0.4s ease-out;
                transition: 0.4s ease-out;
                font-size: 18px;
              }
              .nav div a:hover{
                background-color: #4d4d4d;
                color: white;
              }
              .logo a{
                color: black;
                text-decoration: none;
              }
              .information {
                text-align: right;
                font-family: 'Rajdhani', sans-serif;
              }
        `}
    </style>
    </>
  );
}
