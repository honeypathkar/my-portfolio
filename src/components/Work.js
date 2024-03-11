import React from "react";
import Container from "./Container";

export default function Work() {
  const work = [
    {
      imageUrl:
        "https://images.unsplash.com/photo-1628678172909-13a7209c7d62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RvcHdhdGNofGVufDB8fDB8fHww&w=1000&q=80",
      url: "https://honeypatkar.github.io/Button-Count/",
      name: "Button Click Counter",
      description:
        "This a practice project made by using Html, css and Javascript",
    },
    {
      imageUrl:
        "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/5wmEECloDc1OMWAMEamsQ8/edb1da18b9ce2e661d227312c7d61805/GettyImages-1203940958.jpg?w=1500&h=680&q=60&fit=fill&f=faces&fm=jpg&fl=progressive&auto=format%2Ccompress&dpr=1&w=1000&h=",
      url: "https://honeypatkar.github.io/My-Resume/",
      name: "Resume",
      description: "This is My Personal Resume",
    },
    {
      imageUrl:
        "https://img.freepik.com/premium-vector/editable-change-font-typography-template-text-effect-style-lettering-vector-illustration-logo_463676-1886.jpg",
      url: "https://text-change.netlify.app/",
      name: "TextChange",
      description:
        "It's a website where you can do insteresting thing with text i made it using React Js during my practice ",
    },
    {
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAFVpH5kUkmB3FcVcAVpCrYQXw_aqDA-6Dn2bJaWnMHH-E4UXwkJ8_Xf7xeFbrZlzEDCI&usqp=CAU",
      url: "https://honeypatkar.github.io/Tic-Tac-Toe/",
      name: "Tic Tac Toe",
      description:
        "It's a very intersting Tic Tac Toe game i made it using React Js",
    },
    {
      imageUrl:
        "https://reactjsexample.com/content/images/2022/01/React-Todo-App.jpg",
      url: "https://honeypatkar.github.io/Todo-App/",
      name: "Todo-List App",
      description: "React Todo-App. Here you can add your daily task. ",
    },
    {
      imageUrl:
        "https://images.indianexpress.com/2023/11/google-weather-featured-1.png",
      url: "https://honeypatkar.github.io/Weather_App/",
      name: "Weather App",
      description:
        "Weather App made using React Js. By this you can get weather of any city you want.",
    },
    {
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQdZirzKH4qlwXg4uzLofj4fl1o3tNka9yQg&usqp=CAU",
      url: "https://moviedb-honey.netlify.com",
      name: "Movie DB",
      description:
        "Movie DB made by using vite + react. It's a app where you can find any movie & series by name or imdb Id. ",
    },
  ];
  return (
    <>
      <div className="container my-3">
        <div className="row box-container">
          {work.map((element) => {
            return (
              <div className="col-md-6" key={element.url}>
                <Container
                  name={element.name}
                  imageUrl={element.imageUrl}
                  url={element.url}
                  description={element.description}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
