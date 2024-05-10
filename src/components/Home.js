import React from 'react'

export default function Details() {
  return (
    <div>
    <div className="details container">
        <h2 style={{fontSize: "70px"}}>Hello Everyone</h2>
        <h3>I'm Honey</h3>
        <br/>
        <p>I'm a beginner and learning web devlopment. I'm looking for job. This is my Personal Portfolio. Here I have included some of my project that i made during practice. Hopefully you like them.</p>
    </div>
    <style jsx="true">
        {`
        .details {
            padding-top: 50px;
            padding-bottom: 500px;
          }
          
          .details p {
            font-family: 'Rajdhani', sans-serif;
            font-size: 30px;
          }
          
          .details h2,h3{
            font-family: 'Pangolin', cursive;
          }
          @media screen only (max-width: 1700px){
            .details{
              padding-left: 210px;
              padding-right: 300px;
            }
          }
        `}
    </style>
    </div>
  )
}
