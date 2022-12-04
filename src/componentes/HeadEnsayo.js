import React from "react";
import "../hojas-de-estilo/Pregunta.css";
function HeadEnsayo(props) {
  return (
    <section className={props.color}>
      <h1 className="heroQ_title">{props.title}</h1>
      <p className="hero_paragraph">{props.paragraph}</p>
    </section>
  );
}

export default HeadEnsayo;
