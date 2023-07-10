import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Apiurl } from '../../Services/apirest';
import replace from 'react-string-replace'; // Importa la biblioteca react-string-replace
import { InlineMath } from "react-katex";

const AñadirPreguntas = () => {
    const urlCreateQuestion = Apiurl + "questions/create/";
    const urlCreateAnswer = Apiurl + "answers/create/";
    const [showPopup, setShowPopup] = useState(false);
    const [question, setQuestion] = useState("");
    const [subject, setSubject] = useState("");
    const [linkResolution, setLinkResolution] = useState("");
    const [answer1, setAnswer1] = useState({ label: "", right: "" });
    const [answer2, setAnswer2] = useState({ label: "", right: "" });
    const [answer3, setAnswer3] = useState({ label: "", right: "" });
    const [answer4, setAnswer4] = useState({ label: "", right: "" });
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formError, setFormError] = useState(false);


    const ecuacionRegex = /\[(.*?)\]/g; // Expresión regular para detectar partes de la cadena que contienen ecuaciones

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!question || !subject || !linkResolution || !answer1.label || !answer2.label || !answer3.label || !answer4.label || !answer1.right || !answer2.right || !answer3.right || !answer4.right) {
            setFormError(true); // Establecer el estado de formError a true si algún campo está vacío
            setTimeout(() => {
                setFormError(false);
              }, 2000); // Desaparecer el mensaje después de 2 segundos
            return; // Si falta algún campo, no se envía el formulario
          }
      
          setFormError(false); // Establecer el estado de formError a false antes de enviar el formulario
        const questionData = { question, subject, link_resolution: linkResolution };
        const response = await axios.post(urlCreateQuestion, questionData);
        const questionId = response.data.id;

        const answers = [answer1, answer2, answer3, answer4];
        answers.forEach(async (answer) => {
            const answerData = { ...answer, questions: questionId };
            await axios.post(urlCreateAnswer, answerData);
        });
        setFormSubmitted(true); // Establecer el estado de formSubmitted a true después de enviar el formulario
        setTimeout(() => {
            setFormSubmitted(false);
          }, 2000); // Desaparecer el mensaje después de 2 segundos
    };
    const handleClosePopup = () => {
        setShowPopup(false);
      };

    return (
        <>
        <div className='contenedorPrincipal'>
            
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-2" >
                    <label htmlFor="question" className='mb-2'>Pregunta:</label>
                    <textarea className="form-control" id="question" name="question" value={question} onChange={(e) => setQuestion(e.target.value)}></textarea>
                </div>

                <div className="form-group mb-2" >
                    <label htmlFor="subject"  className='mb-2'>Categoría:</label>
                    <select className="form-control" id="subject" name="subject" value={subject} onChange={(e) => setSubject(e.target.value)}>
                        <option value="">Seleccione una categoría</option>
                        <option value="numeros">Números</option>
                        <option value="algebra">Álgebra</option>
                        <option value="probabilidades">Probabilidades</option>
                        <option value="geometria">Geometría</option>
                    </select>
                </div>

                <div className="form-group mb-2">
                    <label htmlFor="linkResolution"  className='mb-2'>Enlace de video resolución:</label>
                    <input type="search" className="form-control" id="linkResolution" name="linkResolution" value={linkResolution} onChange={(e) => setLinkResolution(e.target.value)} />
                </div>

                <div className="form-group mt-4">
               
                    <div className="row">
                        <div className="col-1 " style={{display:"grid", placeContent:"center",fontSize:"20px", fontWeight:"bold"}}>A</div>
                        <div className="col">
                            <input type="search" className="form-control" name="label" value={answer1.label} onChange={(e) => setAnswer1({ ...answer1, label: e.target.value })} />
                        </div>
                        <div className="col">
                            <select className="form-control" name="right" value={answer1.right} onChange={(e) => setAnswer1({ ...answer1, right: e.target.value })}>
                                <option value="">Seleccione</option>
                                <option value="1">Verdadera</option>
                                <option value="0">Falsa</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="form-group mt-3">
              
                    <div className="row">
                        <div className="col-1" style={{display:"grid", placeContent:"center",fontSize:"20px", fontWeight:"bold"}}>B</div>
                        <div className="col">
                            <input type="search" className="form-control" name="label" value={answer2.label} onChange={(e) => setAnswer2({ ...answer2, label: e.target.value })} />
                        </div>
                        <div className="col">
                            <select className="form-control" name="right" value={answer2.right} onChange={(e) => setAnswer2({ ...answer2, right: e.target.value })}>
                                <option value="">Seleccione</option>
                                <option value="1">Verdadera</option>
                                <option value="0">Falsa</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="form-group mt-3">
            
                    <div className="row">
                        <div className="col-1" style={{display:"grid", placeContent:"center",fontSize:"20px", fontWeight:"bold"}}>C</div>
                        <div className="col">
                            <input type="search" className="form-control" name="label" value={answer3.label} onChange={(e) => setAnswer3({ ...answer3, label: e.target.value })} />
                        </div>
                        <div className="col">
                            <select className="form-control" name="right" value={answer3.right} onChange={(e) => setAnswer3({ ...answer3, right: e.target.value })}>
                                <option value="">Seleccione</option>
                                <option value="1">Verdadera</option>
                                <option value="0">Falsa</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="form-group mt-3">
          
                    <div className="row">
                        <div className="col-1" style={{display:"grid", placeContent:"center",fontSize:"20px", fontWeight:"bold"}}>D</div>
                        <div className="col">
                            <input type="search" className="form-control" name="label" value={answer4.label} onChange={(e) => setAnswer4({ ...answer4, label: e.target.value })} />
                        </div>
                        <div className="col">
                            <select className="form-control" name="right" value={answer4.right} onChange={(e) => setAnswer4({ ...answer4, right: e.target.value })}>
                                <option value="">Seleccione</option>
                                <option value="1">Verdadera</option>
                                <option value="0">Falsa</option>
                            </select>
                        </div>
                    </div>
                </div>
                {formError && (
                <div className="alert alert-danger mt-4" role="alert">
                    Todos los campos son necesarios.
                </div>
                )}
                {formSubmitted && (
                    <div className="alert alert-success mt-4" role="alert">
                    ¡El formulario se ha enviado correctamente!
                    </div>
                )}
                <button type="submit" className="btn  btn-warning mb-2 p-2 mt-4  ">Añadir Pregunta</button>
                <button type="button" onClick={()=>{setShowPopup(true)}} className="btn  btn-dark mb-2 p-2 mt-4 " style={{marginLeft:"1rem"}}>Visualizar</button>
            </form>
            
        </div>

        {showPopup && (
            <div className='popup'>
             
        
      <div className="contenedor-principal position-relative " style={{width:"900px"}}>     
        <div className="contenedor-pregunta">
            <div className="row ">
                <div className="col-md-11 mt-3">
                    <h3>
                        Pregunta 1 de 10
                    </h3>
                </div>    
            </div>
          <h3 className="enunciado-pregunta  ">
          <div>
      {replace(question, ecuacionRegex, (match, i) => {
         return <InlineMath key={i} math={match} />;
      })}
    </div>
          </h3>
         
            <button type="button" className="contenedor-alternativa-pregunta">
                <b>{"A. "}</b>
                {replace(answer1.label, ecuacionRegex, (match, i) => {
                    return <InlineMath  math={match} />;
                })}
            </button>
            <button type="button" className="contenedor-alternativa-pregunta">
                <b>{"B. "}</b>
                {replace(answer2.label, ecuacionRegex, (match, i) => {
                    return <InlineMath  math={match} />;
                })}
            </button>
            <button type="button" className="contenedor-alternativa-pregunta">
                <b>{"C. "}</b>
                {replace(answer3.label, ecuacionRegex, (match, i) => {
                    return <InlineMath  math={match} />;
                })}
            </button>
            <button type="button" className="contenedor-alternativa-pregunta">
                <b>{"D. "}</b>
                {replace(answer4.label, ecuacionRegex, (match, i) => {
                    return <InlineMath  math={match} />;
                })}
            </button>
      
            <div className="sumaResta">
                <a className="arrow left" ></a>
                <a className="arrow right"></a>
            </div>
            <button onClick={()=>{setShowPopup(false)}} className="btn  btn-dark mb-2 p-2 mt-4 " style={{marginLeft:"1rem"}}>Cerrar</button>
            </div>
                      
                        </div>
                        
                    </div>
                    
  
        )}

        </>

    );
};

export default AñadirPreguntas;