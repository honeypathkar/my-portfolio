import React from "react";
import Container from "./Container";
import {work} from "./Project"

export default function Work() {
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
                  source = {element.source}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
