import React from "react";
import "../../hojas-de-estilo/Pregunta.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "katex/dist/katex.min.css";
import axios from "axios";
import Ensayo from "../Ensayo";

const Apiurl =
  "http://127.0.0.1:8000/questions_alternative/?subject=Probabilidades";

function PruebaProbabilidades() {
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get(Apiurl).then((response) => {
      setPost(response.data);
    });
  }, []);
  if (!post) return null;
  function shuffleArray(array) {
    const newArray = [...array];
    newArray.sort(() => Math.random() - 0.5);
    return newArray;
  }
  for (let i = 0; i < post.length; i++) {
    post[i].answer = shuffleArray(post[i].answer);
  }

  return (
    <div>
      <Ensayo
        ensayo={shuffleArray(post)}
        urlEnsayo="PruebaProbabilidades"
        titleEnsayo="Probabilidad y Estadística"
        paragraphEnsayo="Matemática(M1)"
        colorEnsayo="heroProbabilidades"
      />
    </div>
  );
}

export default PruebaProbabilidades;
