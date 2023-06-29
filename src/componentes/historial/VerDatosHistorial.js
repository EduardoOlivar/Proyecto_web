import React from 'react'
import { useState, useEffect } from 'react';
import { InlineMath } from "react-katex";
import replace from 'react-string-replace'; // Importa la biblioteca react-string-replace
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { Typography } from "@mui/material";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import { red, green } from "@mui/material/colors";
import "../../hojas-de-estilo/Pregunta.css";
function VerDatosHistorial(props) {


    
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };

    const ecuacionRegex = /\[(.*?)\]/g; // Expresión regular para detectar partes de la cadena que contienen ecuaciones
    const [response, setResponse] = React.useState({});
    const [ensayo, setEnsayo] = React.useState([]);
    const [answered, setAnswered] = React.useState();

      /*const preguntaCorrectaOrNot = (qna, j) => {
          if (qna.question === tituloPregunta[j]) {
            return { sx: { color: green[500] } };
          } else {
            return { sx: { color: red[500] } };
          }
        };*/
        
    const markCorrectOrNot = (qna, idx, j) => {

        if (qna.answer[idx].right === 1) {
          return { sx: { color: green[500] } };
        } else {
          if (qna.answer[idx].answer_id === answered[j]) {
            return { sx: { color: red[500] } };
          }
        }
      };
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/custom_essay_view/" + props.datosEnsayo.id+ "/" , {

        })
        .then(res => {
            const datosEnsayo = Object.values(res.data);
            setResponse(res.data); 
            console.log(res.data)   
            setEnsayo(res.data.question)     
            setAnswered(res.data.answered.sort(function(a, b){return a - b}))  
        })
        .catch(error => {
            console.log(error);
        });
      }, []);  
      
      
return (
    <div>
        
          <div className="resultado">
            <div
              className="mask-resultado" /*style="background-color: rgba(0, 0, 0, 0.8);border-radius:7px;"*/
            >
              <div className="d-flex  align-items-center h-100 ">
                <div className="text-white  p-3 w-100">

                   <h1 className="mb-3 text-success " style={{fontSize: "1.8rem"}}><PlaylistAddCheckIcon style={{color: "green", fontSize: "3rem"}}/> Obtuviste {response.score} puntos</h1>
                 
                  <ul className="list-answers">
                    <li>
                        <p>Nombre Ensayo {response.name}</p>
                    </li>
                    <li>
                        <p>Realizado el {props.datosEnsayo.date}</p>
                    </li>
                        <li>    
                            <p >{response.score} respuestas correctas</p>
                        </li>
                        <li>
                        
                            <p >{response.current_questions} ejercicios en total</p>
                        </li>

                  </ul>
                </div>
        
              </div>
              
            </div>

            <div className="accordion mt-4" id="accordionExample">
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
                        //   {...preguntaCorrectaOrNot(item, j)}
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
                     
                            key={respuesta.id}
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
                        src={item.link}
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
      
    </div>
  );
}

export default VerDatosHistorial