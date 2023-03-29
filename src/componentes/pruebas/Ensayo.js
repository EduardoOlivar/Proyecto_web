import React from "react";
import "../../hojas-de-estilo/Pregunta.css";
// import preguntas from "../../ensayoNumeros";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "katex/dist/katex.min.css";
import Box from "@mui/material/Box";
import { red, green } from "@mui/material/colors";
import { getFormatedTime } from "../../helper";
import LinearProgress from "@mui/material/LinearProgress";
import { Typography } from "@mui/material";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import $ from "jquery";
import { InlineMath } from "react-katex";
import Loading from "../menus/Loading";
import Navbar from "../navbar/Navbar";
import HeadEnsayo from "../navbar/HeadEnsayo";
import Cookies from "universal-cookie";
import "katex/dist/katex.min.css";

import AccessTimeIcon from '@mui/icons-material/AccessTimeFilled';


const cookies = new Cookies();
function Ensayo(props) {
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const markCorrectOrNot = (qna, idx, j) => {
    if (qna.answer[idx].right === 1) {
      return { sx: { color: green[500] } };
    } else {
      if (qna.answer[idx].label === respuestaaa[j]) {
        return { sx: { color: red[500] } };
      }
    }
  };
  
  // lo usaremos para una comparativa.
  let largo = props.ensayo.length -1;

  const preguntaCorrectaOrNot = (qna, j) => {
    if (qna.question === tituloPregunta[j]) {
      return { sx: { color: green[500] } };
    } else {
      return { sx: { color: red[500] } };
    }
  };

  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntuación, setPuntuacion] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  //se declara los segundos del examen dependiendo el largo del ensayo.
  const [tiempoRestante, setTiempoRestante] = useState(
    parseInt(localStorage.getItem("tiempoRestante")) || props.ensayo.length * 60 * 2);
  const [areDisabled, setAreDisabled] = useState(false);

  const [respuestaaa, setRespuesta] = useState([]);
  const [tituloPregunta, setTituloPregunta] = useState([]);
  const [loading, setLoading] = useState(false);

  const cambiarEstado = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const [isHidden, setIsHidden] = useState(false);
  function handleClick() {
    
  
   
      setIsHidden(!isHidden);
    };
  
  let timer;

  // lo que hace la funcion, es que cada respuesta de la pregunta actual se ira actualizando y guardando en el setrespuesta.
  // esto quiere decir que cada vez que marques una respuesta se va a sobreescribir en si dependiendo la preguntaActual.
  // con esto generamos que se guarden las respuestas al avanzar o retroceder.
  const handleRespuestaSeleccionada =(respuesta) =>{
    setRespuestaSeleccionado(respuestaPrevia =>({
      ...respuestaPrevia,
      [preguntaActual]:respuesta.label
    }))
  }

  useEffect(() => {
    timer = setInterval(() => {
      if (tiempoRestante > 0) setTiempoRestante((prev) => prev - 1);
      if (tiempoRestante <= 60) $(".tiempo").addClass("text-danger");
      if (tiempoRestante === 0) {
        setAreDisabled(true);
        setIsFinished(true);
      }
    }, [1000]);

    return () => clearInterval(timer);
  }, [tiempoRestante]);
  const url = window.location.pathname; // Obtiene la parte de la URL que sigue después del nombre del servidor y el puerto
  const pruebaName = url.split("/").pop(); // Obtiene la última parte de la URL después de la barra ("/")
  if (pruebaName !== localStorage.getItem("ensayoActivo"))
    localStorage.setItem("tiempoRestante", 0);
  localStorage.setItem("ensayoActivo", pruebaName);

  useEffect(() => {
    localStorage.setItem("tiempoRestante", tiempoRestante.toString());
  }, [tiempoRestante]);

  function handleAnswerSubmit(isCorrect, e, res, tituloP) {  // FUNCION AL MARCAR ALTERNATIVA 
    setRespuesta((current) => {
      const newRespuestas = [...current];
      newRespuestas[preguntaActual] = res;
      return newRespuestas;
    });
 //actualiza el estado del componente agregando un nuevo valor (res) al final de un array (current) existente.
    console.log(respuestaaa)
    setTituloPregunta((current) => {
      const newTitulos = [...current];
      newTitulos[preguntaActual] = isCorrect === 1 ? tituloP : "mala";
      return newTitulos;
    });


  
    //console.log(res);
    //  setPreguntaActual(preguntaActual + 1);

     // setAreDisabled(false);
    
  }
  function finalizarEnsayo(){
  
    cambiarEstado();
    setIsFinished(true);
  }
  function volverAlEnsayo(){
    setRespuesta((current) => {
      const newRespuestas = [...current];
      newRespuestas.pop(); // Eliminar la última respuesta del array
      return newRespuestas;
    });
    setTituloPregunta((current) => {
      const newTitulos = [...current];
      newTitulos.pop(); // Eliminar el último título de pregunta del array
      return newTitulos;
    });
    if (puntuación > 0) {
      setPuntuacion(puntuación - 1); // Disminuir la puntuación en 1 si es mayor a 0
      cookies.set("scoreNumeros", puntuación - 1, { path: "/" });
    }
    if (preguntaActual > 0) setPreguntaActual(preguntaActual - 1); // Disminuir el número de pregunta en 1
  }
  function Terminar(){

  function retrocederPregunta() {
    
    if (puntuación > 0) {
      // setPuntuacion(puntuación - 1); // Disminuir la puntuación en 1 si es mayor a 0
      cookies.set("scoreNumeros", puntuación - 1, { path: "/" });
    }
    if (preguntaActual > 0) setPreguntaActual(preguntaActual - 1); // Disminuir el número de pregunta en 1
  }
  
  function siguientePregunta() {
    if (preguntaActual < props.ensayo.length - 1) {
      // setRespuesta((current) => [...current, "nada"]);
      setPreguntaActual(preguntaActual + 1); // Disminuir el número de pregunta en 1
      // setTituloPregunta((current) => [...current, "mala"]);
    }
  }

  // funcion que termina y envia el examen.
  function Terminar(){

    cambiarEstado();
    setIsFinished(true);
  }

  // declaro una variable para el puntaje
  let puntajeFinal = 0;
  // cuando la funcion terminar se ejecute que haga el conteo de la puntuacion.
  if(setIsFinished){
    for(let puntaje in puntuación){
      if(puntuación[puntaje] === 'Correcto'){
        puntajeFinal +=1;
      }
    }
  }

  /*useEffect(() => {
    const intervalo = setInterval(() => {
      if (tiempoRestante > 0) setTiempoRestante((prev) => prev - 1);
      if (tiempoRestante === 0) setAreDisabled(true);
    }, 1000);

    return () => clearInterval(intervalo);
  }, [tiempoRestante]); */

  if (loading) {
    return <Loading />;
  }

  if (isFinished)
    return (

      // la parte alta al finalizar el examen.
      <div>
        <Navbar />
        <main className="contenedor-principal">
          <div className="resultado">
            <div
              className="mask" /*style="background-color: rgba(0, 0, 0, 0.8);border-radius:7px;"*/
            >
              <div className="d-flex justify-content-center align-items-center h-100">
                <div className="text-white text-center">
                  <h1 className="mb-3">Resultado</h1>
                  <ul className="list-group m-3">
                    <li className="list-group-item">
                      <div className="row" /*style="margin: 0;"*/>
                        <div className="col">
                          <h3>Puntos:</h3>
                        </div>
                        <div className="col">
                          <h3>
                            {puntuación}/{props.ensayo.length}
                          </h3>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
        {/*  */}
          
            <div class="accordion mt-4" id="accordionExample">
              <div>
                {/* son los iconos finales al finalizar el examen. como la respueata, video... */}
                {props.ensayo.map((item, j) => (
                  <Accordion
                    disableGutters
                    key={j}
                    expanded={expanded === j}
                    onChange={handleChange(j)}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandCircleDownIcon
                          {...preguntaCorrectaOrNot(item, j)}
                        />
                      }
                    >
                      <Typography>
                        {j + 1}. <InlineMath math={item.question} />
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {props.ensayo[j].answer.map((respuesta, i) => (
                        <Typography {...markCorrectOrNot(item, i, j)}>
                          <label
                            className="contenedor-alternativa-pregunta-respuesta "
                            disableRipple
                            key={respuesta.label}
                          >
                            <b>{String.fromCharCode(65 + i) + " . "}</b>
                            <InlineMath math={respuesta.label} />
                          </label>
                        </Typography>
                      ))}
                    </AccordionDetails>
                    <section>
                      <iframe
                        className="video-respuesta"
                        id="video03"
                        width="560"
                        height="315"
                        src={item.link_resolution}
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </section>
                  </Accordion>
                ))}
              </div>
            </div>
          </div>
          {/* hasta aqui */}
          


          <button
            onClick={() => (window.location.href = "./" + props.urlEnsayo)}
            type="button"
            className="botonQ btn btn-warning btn-lg m-3"
            id="bot"
          >
            Otro intento
          </button>

          <button
            onClick={() => (window.location.href = "/menu")}
            type="button"
            className="botonQ btn btn-dark btn-lg m-3"
            id="bot"
          >
            Inicio
          </button>
        </main>
      </div>
    );
  

  // de aqui hacia abajo es el examen, preguntas y respuestas.  
  return (
    <div>
      <Navbar usuario={cookies.get("username")} />
      <HeadEnsayo
        title={props.titleEnsayo}
        paragraph={props.paragraphEnsayo}
        color={props.colorEnsayo}
      />
      <div className="contenedor-principal position-relative ">
        <div className="contenedor-pregunta">
          <div className="row">
            <div className="col-md">
              <h2>
                Pregunta {preguntaActual + 1} de {props.ensayo.length}
              </h2>
            </div>
            <div
      className={`timer-container ${isHidden ? 'hide' : ''}`}
      onClick={handleClick}
    >
      {isHidden ? (
        <AccessTimeIcon  fontSize="large" style={{color:"white"}}/>
      ) : (
         <h3 className="tiempo text-center mt-2">
        {getFormatedTime(tiempoRestante)}
      </h3>
      )}
    </div>
           
          </div>
          <Box className="mt-3 mb-3">
            <LinearProgress
              variant="determinate"
              value={((preguntaActual + 1) * 100) / props.ensayo.length}
              color="warning"
              style={{
                boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.2)',
              }}
            />
          </Box>
          <h3 className="enunciado-pregunta mb-3 katex">
            {<InlineMath math={props.ensayo[preguntaActual].question} />}
          </h3>


          {/* las respuestas de la pregunta actual */}
          {props.ensayo[preguntaActual].answer.map((respuesta, idk) => (
            <button
              type="button"
              // si la respuesta.label es igual a la respuesta seleccionada de la pregunta actual, que coloque una classname al que fue seleccionado.
              className={`contenedor-alternativa-pregunta ${respuesta.label === respuestaSeleccionada[preguntaActual] ? 'seleccionada' : ''}`}
              
              disabled={areDisabled}
              disableRipple
              // inlineMath para mostrar forumulas matematicas por katex.
              key={<InlineMath math={respuesta.label} />}
              onClick={(e) =>{
                  handleRespuestaSeleccionada(respuesta)
                  handleAnswerSubmit(
                  respuesta.right,
                  e,
                  respuesta.label,
                  props.ensayo[preguntaActual].question
                )
              }
              }
              
            >
              <b>{String.fromCharCode(65 + idk) + " . "}</b>
              {<InlineMath math={respuesta.label} />}
            </button>
          ))}
          <div className="sumaResta">
            <a class="arrow left" onClick={retrocederPregunta}></a>
            <a class="arrow right" onClick={siguientePregunta}></a>
          </div>
        </div>
           )}
            {preguntaActual === props.ensayo.length && (
    <div  className="contenedor-pregunta" >
      <h2 className="heroTerminar">¿Quiere terminar este ensayo?</h2>
      <div className="contenedor-preguntaVolverTerminar  ">
        <button onClick={volverAlEnsayo} className="btnVolverTerminar btn btn-dark">No, quiero volver</button>
        <button onClick={finalizarEnsayo}className="btnVolverTerminar btn btn-dark">Si, quiero terminar el ensayo</button>
      </div>
    </div>
  );
}

export default Ensayo;
