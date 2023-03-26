import React from "react";
import "../../hojas-de-estilo/Pregunta.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "katex/dist/katex.min.css";
import axios from "axios";
import Ensayo from "./Ensayo";

const Apiurl = "http://127.0.0.1:8000/questions_alternative/?subject=Geometria";
function PruebaGeometria() {
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
        urlEnsayo="PruebaGeometria"
        titleEnsayo="Geometría"
        paragraphEnsayo="Matemática(M1)"
        colorEnsayo="heroGeometria"
      />
    </div>
  );
}

export default PruebaGeometria;
