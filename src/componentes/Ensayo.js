import React from "react";
import "../hojas-de-estilo/Pregunta.css";
import preguntas from "../ensayoNumeros";
import { useState, useEffect  } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'katex/dist/katex.min.css';
import Box from "@mui/material/Box";
import { red, green } from '@mui/material/colors';
import { getFormatedTime } from '../helper'
import LinearProgress from "@mui/material/LinearProgress";
import { Typography } from '@mui/material'
import { Accordion, AccordionDetails, AccordionSummary} from '@mui/material';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import $ from 'jquery';
import { InlineMath} from 'react-katex';
import Loading from "./Loading";
import Navbar from "./Navbar";
import HeadEnsayo from "./HeadEnsayo";
import Cookies from 'universal-cookie';




const cookies = new Cookies();
function Ensayo(props){

 


  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
};
const markCorrectOrNot = (qna, idx,j) => {
  if (qna.answer[idx].right === 1) {
      return { sx: { color: green[500] } }
  }else{
    if(qna.answer[idx].label === respuestaaa[j]){
      return { sx: { color: red[500] } }
    }
  }
}

const preguntaCorrectaOrNot = (qna,j) =>{
  if (qna.question === tituloPregunta[j]){
    return { sx: { color: green[500] } }
  }
  else{
  return { sx: { color: red[500] } }
  }
}


 
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntuación, setPuntuacion] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState((preguntas.length)*60*2);
  const [areDisabled, setAreDisabled] = useState(false);

  const [respuestaaa, setRespuesta] = useState([]);
  const [tituloPregunta, setTituloPregunta] = useState([]);
  const [loading, setLoading] = useState(false);
  

  const cambiarEstado=()=>{
    setLoading(true);
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }
  
 
  let timer; 





  

  useEffect(() => {
  
    timer = setInterval(() => {
     if (tiempoRestante > 0) setTiempoRestante((prev) => prev - 1);
     if(tiempoRestante<=60) $(".tiempo").addClass("text-danger");
     if (tiempoRestante === 0){
      setAreDisabled(true);
      setIsFinished(true);
     } 
   }, [1000]);
   
   return () => clearInterval(timer);
 }, [tiempoRestante]);
    

  


  function handleAnswerSubmit( isCorrect, e,res,tituloP) {
        
      setRespuesta(current => [...current, res]);
      
      if (isCorrect===1){ 
        setTituloPregunta(current => [...current, tituloP]);
        setPuntuacion(puntuación + 1);
        cookies.set('scoreNumeros',puntuación + 1 , { path: '/' });
      }
        else{
          setTituloPregunta(current => [...current, "mala"]);
        }
      if (preguntaActual === props.ensayo.length - 1) {
        cambiarEstado();
        setIsFinished(true);
      } else {
        setPreguntaActual(preguntaActual + 1);
        
       
        setAreDisabled(false);
  
      }
   

    
    
  }
  /*useEffect(() => {
    const intervalo = setInterval(() => {
      if (tiempoRestante > 0) setTiempoRestante((prev) => prev - 1);
      if (tiempoRestante === 0) setAreDisabled(true);
    }, 1000);

    return () => clearInterval(intervalo);
  }, [tiempoRestante]); */
 
  if(loading){
    return(
      <Loading
        
      />
    )
  }
  
  
  if(isFinished) return(
    <div>
    <Navbar/>
    <main className="contenedor-principal" >
      <div className="resultado">
      
            <div className="mask" /*style="background-color: rgba(0, 0, 0, 0.8);border-radius:7px;"*/>
              <div className="d-flex justify-content-center align-items-center h-100" >
                <div className="text-white text-center">
                  <h1 className="mb-3">Resultado</h1>
                  <ul className="list-group m-3">
                    <li  className="list-group-item">
                      <div className="row" /*style="margin: 0;"*/>
                        <div className="col"><h3>Puntos:</h3></div>
                        <div className="col"><h3>{puntuación}/{props.ensayo.length}</h3></div>
                      </div>
                    </li>
                    
                  </ul>
                  
                </div>
              </div>
            </div> 
            
            <div class="accordion mt-4" id="accordionExample">
 
      
            <div>
            {
                props.ensayo.map((item,j)=>(
              <Accordion
                disableGutters
                key={j}
                expanded={expanded === j}
                onChange={handleChange(j)}>
                <AccordionSummary expandIcon={<ExpandCircleDownIcon
                  {...preguntaCorrectaOrNot(item,j)}/>}
                >
                  <Typography>{j+1}. <InlineMath math={item.question}/></Typography>
                </AccordionSummary>
                <AccordionDetails >
                  {props.ensayo[j].answer.map((respuesta,i) => (
                    <Typography {...markCorrectOrNot(item, i,j)}>
                      <label  className="contenedor-alternativa-pregunta-respuesta "  disableRipple key={respuesta.label}  >
                        <b>{String.fromCharCode(65+i) +  " . "}</b><InlineMath math={respuesta.label}/>
                      </label>
                    </Typography>
                  ))}
                </AccordionDetails>
                <section>
                <iframe className="video-respuesta" id="video03" width="560" height="315" src={item.link_resolution} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </section>
              </Accordion>))
              }

            </div>
   
  
</div>

      </div>    
      
      
                <button onClick={() => (window.location.href = "./" + props.urlEnsayo)} type="button" className="botonQ btn btn-warning btn-lg m-3" id="bot">Otro intento</button>
       
      
                <button onClick={() => (window.location.href = "/menu")} type="button" className="botonQ btn btn-dark btn-lg m-3" id="bot">Inicio</button>
       
      
                
                
      </main>
      </div>
  );
  
  return(
    <div>
    
    <Navbar
      usuario={cookies.get('username')}
    />
    <HeadEnsayo
      title = {props.titleEnsayo}
      paragraph = {props.paragraphEnsayo}
      color = {props.colorEnsayo}
    
    />
    <div className="contenedor-principal position-relative ">
        <div className="contenedor-pregunta">
          <div className="row">
            <div className="col-md">
              <h2>Pregunta {preguntaActual + 1} de {props.ensayo.length}</h2>
              
            </div>
            
            
           
            <div className="align-items-center  col-md-2 ">
              <h3 className="tiempo text-center ">{getFormatedTime(tiempoRestante)}</h3>
            </div>
            
          </div>       
          <Box className="mt-3 mb-3">
                <LinearProgress  variant="determinate" />
          </Box>
          <h3 className="enunciado-pregunta mb-3">{<InlineMath  math={props.ensayo[preguntaActual].question}/> }</h3>
          
          {props.ensayo[preguntaActual].answer.map((respuesta,idk) => (
            <button type="button" className="contenedor-alternativa-pregunta  " disabled={areDisabled} disableRipple key={<InlineMath  math={respuesta.label}/>} onClick={(e) => handleAnswerSubmit(respuesta.right, e,respuesta.label,props.ensayo[preguntaActual].question)}>
              <b>{String.fromCharCode(65+idk) + " . "}</b>{<InlineMath math={respuesta.label}/>}
            </button>
          ))}
          <div >
          <button className="btn btn-outline-dark" 
              onClick={() => {
                setAreDisabled(false);
                if (preguntaActual === props.ensayo.length - 1) {
                  setIsFinished(true);
                } else {
                  setPreguntaActual(preguntaActual + 1);
                }
              }}
            >
              Omitir
            </button>
            </div>
        </div>
        
       
    </div>
    </div>
    
  );

  
}

export default Ensayo;