import React from "react";
import "../../hojas-de-estilo/Pregunta.css";
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
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import axios from "axios";
import regression from 'regression';
import { parse } from "@fortawesome/fontawesome-svg-core";
import StarIcon from '@mui/icons-material/Star';

const UrlSubmitAnswers  = "http://127.0.0.1:8000/submit_answers/";

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
  
  const [preguntaActual, setPreguntaActual] = useState(
    parseInt(localStorage.getItem("preguntaActual"))||0);
  const [puntuación, setPuntuacion] = useState(
    JSON.parse(localStorage.getItem("puntuacion"))||""
  );
  const [isFinished, setIsFinished] = useState(false);
  const [ensayo, setEnsayo] = useState(
    JSON.parse(localStorage.getItem("ensayo")) || props.ensayo
  );
  const [tiempoRestante, setTiempoRestante] = useState(
    parseInt(localStorage.getItem("tiempoRestante")) ||
      props.ensayo.length * 60 * 2
  );
  const [areDisabled, setAreDisabled] = useState(false);
  const [fechaActual, setFechaActual] = useState("")
  const [selectedAnswers, setSelectedAnswers] = useState(
  JSON.parse(localStorage.getItem("selectedAnswers"))||{});

  const textoDesdeDB = "Cuanto es [\\frac{1}{2}], y ademas [\\int_{0}^{\\infty} e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}\]";
  const ecuacionRegex = /\[(.*?)\]/g; // Expresión regular para detectar partes de la cadena que contienen ecuaciones
  const [tiempoUsuario, setTiempoUsuario] = useState(0);



  const [respuestaId, setRespuestaId] = useState([]);
  const [respuestaaa, setRespuesta] = useState(
    JSON.parse(localStorage.getItem("respuesta"))||[]);

  const [tituloPregunta, setTituloPregunta] = useState(
    JSON.parse(localStorage.getItem("tituloPregunta"))||[]);

  const [loading, setLoading] = useState(false);

  const cambiarEstado = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const [isHidden, setIsHidden] = useState(false);
  const a = 16.67;
  const b = 100;

  const calcularPuntaje = (numPreguntas, numRespuestasCorrectas) => {
    const puntaje = 100 + (900 / numPreguntas) * numRespuestasCorrectas;
    return Math.round(puntaje);
  };
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
  useEffect(() =>{
    localStorage.setItem("tituloPregunta", JSON.stringify(tituloPregunta));
  },[tituloPregunta]);
  useEffect(() =>{
    localStorage.setItem("respuesta", JSON.stringify(respuestaaa));
  },[respuestaaa]);
  useEffect(() => {
    localStorage.setItem("tiempoRestante", tiempoRestante.toString());
  }, [tiempoRestante]);
  useEffect(() => {
    localStorage.setItem("preguntaActual", preguntaActual.toString());
  }, [preguntaActual]);
  useEffect(() => {
    localStorage.setItem("ensayo", JSON.stringify(ensayo));
  }, [ensayo]);
  useEffect(() => {
    localStorage.setItem("selectedAnswers", JSON.stringify(selectedAnswers));
  }, [selectedAnswers]);
  useEffect(() => {
    localStorage.setItem("puntuacion", JSON.stringify(puntuación));
  }, [puntuación]);
  useEffect(() => {
    const fecha = new Date();
    setFechaActual(fecha.toLocaleDateString());
  }, []);
  function enviarDatos(respuestasId, essayId, tiempoUsuario) {
    axios.post(UrlSubmitAnswers, {
      answer_ids: respuestasId,
      essay_id: essayId
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }
  
  function handleAnswerSubmit(isCorrect, e, res,id, tituloP) {  // FUNCION AL MARCAR ALTERNATIVA 
    setRespuesta((current) => {
      const newRespuestas = [...current];
      newRespuestas[preguntaActual] = res;
      return newRespuestas;
    });
    
 //actualiza el estado del componente agregando un nuevo valor (res) al final de un array (current) existente.
 setRespuestaId((current) => {
  const newRespuestasId = [...current];
  newRespuestasId[preguntaActual] = id;
  return newRespuestasId;
});
    console.log(respuestaId)
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
  
  async function finalizarEnsayo(){
    setTiempoUsuario(getFormatedTime(props.ensayo.length * 60 * 2 - tiempoRestante));
  
    let tiempoUser=props.ensayo.length * 60 * 2 - tiempoRestante;
    cambiarEstado();
    setIsFinished(true);
    const essayId = parseInt(localStorage.getItem("new_id")) ; // Reemplaza con el ID del ensayo
    console.log(essayId)
    const token = localStorage.getItem("token");
    console.log("hola")
    try {
      const response = await axios.post(UrlSubmitAnswers, {
        answer_ids: respuestaId, // [16,11,null,7,3]
        user_essay_id: essayId,
        time_essay: tiempoUser.toString()
        //question_ids: preguntaId, [1,2,3,4,5]
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    
  }
  function handleClickNav(j){
    setPreguntaActual(j);
  }
  let puntajeFinal = 0;
  let errores=0;
  let puntajePAES = 0;
  // cuando la funcion terminar se ejecute que haga el conteo de la puntuacion.
  if(setIsFinished){
    for(let puntaje in puntuación){
      if(puntuación[puntaje] === 'Correcto'){
        puntajeFinal +=1;
      }else if(puntuación[puntaje] === 'Incorrecta'){
        errores +=1;
      }
    }
    puntajePAES= (puntajeFinal * 1000) / props.ensayo.length;

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
        
        <main className="contenedor-principal min-vh-100">
          <div className="resultado">
            <div
              className="mask-resultado" /*style="background-color: rgba(0, 0, 0, 0.8);border-radius:7px;"*/
            >
              <div className="d-flex  align-items-center h-100 ">
                <div className="text-white  p-3 w-100">

                   <h1 className="mb-3 text-success " style={{fontSize: "1.8rem"}}><PlaylistAddCheckIcon style={{color: "green", fontSize: "3rem"}}/> Obtuviste {calcularPuntaje(props.ensayo.length, puntajeFinal)} puntos</h1>
                 
                  <ul className="list-answers">
                    <li>
                        <p>Realizado el {fechaActual}</p>
                    </li>
                    <li>    
                      <p >{puntajeFinal} respuestas correctas</p>
                    </li>
                    <li>
                    
                      <p >{props.ensayo.length} ejercicios en total</p>
                    </li>
                    <li>
                     
                      <p>Tardaste {tiempoUsuario} en terminar el ensayo</p>
                    </li>
                  </ul>
                  <div className="d-flex justify-content-end widht-100 ">
                  <button
                    onClick={() => (window.location.href = "/menu",localStorage.removeItem("ensayo"),localStorage.removeItem("puntajeFinal"),localStorage.removeItem("puntuacion"),localStorage.removeItem("puntajeFinal"),localStorage.removeItem("puntajeFinal"),localStorage.removeItem("puntajeFinal"),localStorage.removeItem("puntajeFinal"),localStorage.removeItem("puntajeFinal"),localStorage.removeItem("selectedAnswers"),localStorage.removeItem("preguntaActual"),localStorage.removeItem("respuesta"),localStorage.removeItem("tituloPregunta"), localStorage.removeItem("tiempoRestante") )}
                    type="button"
                    className="botonQ btn btn-outline-dark btn-lg m-2"
                    id="bot"
                  >
                    Continuar
                  </button>
                  <button
                    onClick={() => reiniciarTiempo() (window.location.href = "./" + props.urlEnsayo,localStorage.removeItem("ensayo"),localStorage.removeItem("puntajeFinal"),localStorage.removeItem("puntuacion"),localStorage.removeItem("puntajeFinal"),localStorage.removeItem("puntajeFinal"),localStorage.removeItem("puntajeFinal"),localStorage.removeItem("puntajeFinal"),localStorage.removeItem("puntajeFinal"),localStorage.removeItem("selectedAnswers"),localStorage.removeItem("preguntaActual"),localStorage.removeItem("respuesta"),localStorage.removeItem("tituloPregunta"), localStorage.removeItem("tiempoRestante")) }
                    type="button"
                    className="botonQ btn btn-warning btn-lg m-2 "
                    id="bot"
                  >
                    Reintentar
                  </button>

                  
                  </div>
                </div>
              </div>
            </div>

            <div class="accordion mt-4" id="accordionExample">
              <div>
                {ensayo.map((item, j) => (
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
                      {ensayo[j].answer.map((respuesta, i) => (
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

          
        </main>
      </div>
    );
  
  return (
    <div>
      <Navbar usuario={cookies.get("username")} />
      {/*
      <HeadEnsayo
        title={props.titleEnsayo}
        paragraph={props.paragraphEnsayo}
        color={props.colorEnsayo}
      />
  */}
      
      <div className="contenedor-principal position-relative ">
      <h3  className="titleEnsayo" style={{color:"#4e5457", fontWeight:"500",marginTop:"2rem"}}>{props.titleEnsayo}</h3>
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
          <h3 className="enunciado-pregunta  ">
          <div>
      {replace((ensayo[preguntaActual].question).replace('Â', ''), ecuacionRegex, (match, i) => {
         return <InlineMath key={i} math={match} />;
      })}
    </div>
          </h3>
          {ensayo[preguntaActual].answer.map((respuesta, idk) => (
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
                respuesta.id,
                ensayo[preguntaActual].question
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
        <button onClick={volverAlEnsayo} className="btnVolverTerminar btn btn-lg btn-warning">No, quiero volver</button>
        <button onClick={finalizarEnsayo}className="btnVolverTerminar btn btn-lg btn-dark">Si, quiero terminar el ensayo</button>
      </div>
    </div>
  )}
  <div className="navigation-container">
      <div className="navigation-items">
        {ensayo.map((item,j) => (
          <div className= {`navigation-item ${j === preguntaActual ? 'selected-nav' : ''} ${selectedAnswers[j] ? 'answered' : ''} `} key={item}  onClick={() =>handleClickNav(j)}>
            {j+1}
          </div>
        ))}
        <div className={`navigation-item ${ensayo.length === preguntaActual ? 'selected-nav' : ''}`}  onClick={() =>setPreguntaActual(ensayo.length )} ><StarIcon className="starIcon"/></div>
      </div>
    </div>
      </div>
      
    </div>
  );
}

export default Ensayo;
