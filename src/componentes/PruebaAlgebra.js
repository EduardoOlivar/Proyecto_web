import React from "react";
import "../hojas-de-estilo/Pregunta.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'katex/dist/katex.min.css';
import axios from 'axios';
import Ensayo from "./Ensayo";


const Apiurl = "http://127.0.0.1:8000/questions_alternative/?subject=Algebra";
function PruebaAlgebra(){
  
 




const [post, setPost] = React.useState(null);
  




  React.useEffect(() => {
    axios.get(Apiurl).then((response) => {
      setPost(response.data);
    });
    
  }, []);
  if (!post) return null;
  
    return(
        <div>
            <Ensayo
            ensayo= {post}
            urlEnsayo="PruebaAlgebra"
            titleEnsayo = "Álgebra y Funciones"
            paragraphEnsayo ="Matemática(M1)"
            colorEnsayo = "heroAlgebra"
            />
        </div>
    ); 
}

export default PruebaAlgebra;