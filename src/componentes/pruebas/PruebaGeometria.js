import React from "react";
import "../../hojas-de-estilo/Pregunta.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "katex/dist/katex.min.css";
import axios from "axios";
import Ensayo from "./Ensayo";
import { Apiurl } from "../../Services/apirest";


const ApiUrl = Apiurl+"questions_alternative/?subject=Geometria";
function PruebaGeometria() {
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get(ApiUrl).then((response) => {
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
        ensayo={shuffleArray(post).slice(0,10)}
        urlEnsayo="PruebaGeometria"
        titleEnsayo="Geometría"
        paragraphEnsayo="Matemática(M1)"
        colorEnsayo="heroGeometria"
      />
    </div>
  );
}

export default PruebaGeometria;
