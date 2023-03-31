import React from "react";

import "../../hojas-de-estilo/Pregunta.css";
import preguntas from "../../ensayoNumeros";
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
import replace from 'react-string-replace'; // Importa la biblioteca react-string-replace

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

  const preguntaCorrectaOrNot = (qna, j) => {
    if (qna.question === tituloPregunta[j]) {
      return { sx: { color: green[500] } };
    } else {
      return { sx: { color: red[500] } };
    }
  };
  let largo = props.ensayo.length -1;
  const navigationItems = [...Array(30).keys()];
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntuación, setPuntuacion] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(
    parseInt(localStorage.getItem("tiempoRestante")) ||
      props.ensayo.length * 60 * 2
  );

  const [areDisabled, setAreDisabled] = useState(false);
const [selectedAnswers, setSelectedAnswers] = useState({});

const textoDesdeDB = "Cuanto es [\\frac{1}{2}], y ademas [\\int_{0}^{\\infty} e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}\]";
  const ecuacionRegex = /\[(.*?)\]/g; // Expresión regular para detectar partes de la cadena que contienen ecuaciones





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
  function reiniciarTiempo() {
    let tiempoInicial =  props.ensayo.length * 60 * 2
    setTiempoRestante( tiempoInicial);
    localStorage.setItem("tiempoRestante", tiempoInicial.toString());
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

    setPuntuacion ((current) => ({
      ...current,
      [preguntaActual]:isCorrect === 1 ? "Correcto": "Incorrecta"
    }))
  
    //console.log(res);
    //  setPreguntaActual(preguntaActual + 1);

     // setAreDisabled(false);
    
  }
  function finalizarEnsayo(){
  
    cambiarEstado();
    setIsFinished(true);
    
  }
  function handleClickNav(j){
    setPreguntaActual(j);
  }
  let puntajeFinal = 0;
  // cuando la funcion terminar se ejecute que haga el conteo de la puntuacion.
  if(setIsFinished){
    for(let puntaje in puntuación){
      if(puntuación[puntaje] === 'Correcto'){
        puntajeFinal +=1;
      }
    }
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

    setPreguntaActual(preguntaActual - 1)
 }
  function retrocederPregunta() {

 
    if (puntuación > 0) {
      setPuntuacion(puntuación - 1); // Disminuir la puntuación en 1 si es mayor a 0
      cookies.set("scoreNumeros", puntuación - 1, { path: "/" });
    }
    if (preguntaActual > 0) setPreguntaActual(preguntaActual - 1); // Disminuir el número de pregunta en 1
  }
  function siguientePregunta() {
    if (preguntaActual < props.ensayo.length) {
      //setRespuesta((current) => [...current, "nada"]);
      setPreguntaActual(preguntaActual + 1); // Disminuir el número de pregunta en 1

     // setTituloPregunta((current) => [...current, "mala"]);
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
                          {puntajeFinal}/{props.ensayo.length}
                          </h3>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="accordion mt-4" id="accordionExample">
              <div>
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
                        {j + 1}. {replace((item.question).replace('Â', ''), ecuacionRegex, (match, i) => {
         return <InlineMath key={i} math={match} />;
      })} 
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
                           {replace((respuesta.label).replace('Â', ''), ecuacionRegex, (match, i) => {
         return <InlineMath key={i} math={match} />;
      })} 
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

          <button
            onClick={() => reiniciarTiempo() (window.location.href = "./" + props.urlEnsayo)}
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
  
  return (
    <div>
      <Navbar usuario={cookies.get("username")} />
      <HeadEnsayo
        title={props.titleEnsayo}
        paragraph={props.paragraphEnsayo}
        color={props.colorEnsayo}
      />
      <div className="contenedor-principal position-relative ">
      {preguntaActual  < (props.ensayo.length)  && (
        <div className="contenedor-pregunta">
          <div className="row ">
            <div className="col-md mt-3">
              <h2>
                Pregunta {preguntaActual + 1} de {props.ensayo.length}
              </h2>
            </div>
            <div
      className={`timer-container col-7-md m-3  ${isHidden ? 'hide' : ''}`}
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
          <div>
      {replace((props.ensayo[preguntaActual].question).replace('Â', ''), ecuacionRegex, (match, i) => {
         return <InlineMath key={i} math={match} />;
      })}
    </div>
          </h3>
        
          {props.ensayo[preguntaActual].answer.map((respuesta, idk) => (
            <button
            type="button"
            className={`contenedor-alternativa-pregunta ${respuesta.label === selectedAnswers[preguntaActual] ? 'selected' : ''}`}
            disabled={areDisabled}
            disableRipple
            key={<InlineMath math={respuesta.label} />}
            onClick={(e) => {
              setSelectedAnswers(prevAnswers => ({
                ...prevAnswers,
                [preguntaActual]: respuesta.label
              }));
         
              handleAnswerSubmit(
                respuesta.right,
                e,
                respuesta.label,
                props.ensayo[preguntaActual].question
              );
            }}
          >
            <b>{String.fromCharCode(65 + idk) + " . "}</b>
            {replace((respuesta.label).replace('Â', ''), ecuacionRegex, (match, i) => {
         return <InlineMath key={i} math={match} />;
      })}
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
  )}
      </div>
      <div className="navigation-container">
      <div className="navigation-items">
        {props.ensayo.map((item,j) => (
          <div className= {`navigation-item ${j === preguntaActual ? 'selected' : ''} ${selectedAnswers[j] ? 'answered' : ''} `} key={item}  onClick={() =>handleClickNav(j)}>
            {j+1}
          </div>
        ))}
        <div className="navigation-item" onClick={() =>setPreguntaActual(props.ensayo.length )}>!</div>
      </div>
    </div>
    </div>
  );
}

export default Ensayo;
