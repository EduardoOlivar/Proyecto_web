import React from "react";
import "../../hojas-de-estilo/Pregunta.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "katex/dist/katex.min.css";
import axios from "axios";
import Ensayo from "./Ensayo";
import { useState, useEffect } from "react";

const Apiurl = "http://127.0.0.1:8000/questions_alternative/?subject=numeros";
function PruebaNumeros() {
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get(Apiurl).then((response) => {
      setPost(response.data);
    });
  }, []);

  if (!post) return null;
  function shuffleArray(array) {
    // Con esto mezclo de forma aleatoria las alternativas del ensayo
    const newArray = [...array];
    newArray.sort(() => Math.random() - 0.5);
    return newArray;
  }
  for (let i = 0; i < post.length; i++) {
    post[i].answer = shuffleArray(post[i].answer);
  }

  console.log(post);
  return (
    <div>
      <Ensayo
        ensayo={shuffleArray(post).slice(0,10)}
        urlEnsayo="PruebaNumeros"
        titleEnsayo="Números"
        paragraphEnsayo="Matemática(M1)"
        colorEnsayo="heroNumeros"
      />
    </div>
  );
}

export default PruebaNumeros;
