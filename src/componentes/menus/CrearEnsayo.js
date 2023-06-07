import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../navbar/Navbar";
import "../../hojas-de-estilo/crearEnsayo.css";
import FormContext from "../FormContext";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "katex/dist/katex.min.css";
import axios from "axios";
import Ensayo from "../pruebas/Ensayo";
import NombreEnsayo from "./NombreEnsayo";
import Swal from "sweetalert2";
import ListIcon from '@mui/icons-material/List';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { json } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Apiurl = `http://127.0.0.1:8000/questions_alternative/?subject=`;

function CrearEnsayo() {
 

  
  // guardara todas las preguntas y respuestas de los llamados a las bd.
  const [post, setPost] = React.useState([]);
  // el ensayoSelected sera solo el/los tema que fue seleccionado por el usuario.
  const [ensayoSelected, setensayoSelected] = React.useState({});

  // esta constante sera solo para saber si elegio los temas y finalizar la funcion.


  const [nombreEnsayo, setnombreEnsayo] = React.useState("");
  const [tiempoEnsayo, setTiempoEnsayo] = React.useState(0);
  const [focusTiempo, setFocusTiempo] = React.useState(false);
  const [inputFocus, setinputFocus] = React.useState(false);
  const [isCheck, setIsCheck] = React.useState(false);
  const [cantidadPreguntas, setCantidadPreguntas] = React.useState('');
  const [formData, setFormData] = React.useState(JSON.parse(localStorage.getItem('formData'))||{});


  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  },[formData]);
  if (!post) return null;


  function validarNombreEnsayo() {
    const nombre = nombreEnsayo.trim(); // Obtiene el valor y elimina espacios en blanco al principio y al final
  
    const patron = /^[a-zA-Z -]{10,20}$/; // Expresión para validar el nombre, que sea solo caracteres y de largo entre 10 y 20
  
    if (!patron.test(nombre)) {
      return false; // El nombre no cumple con los requisitos
    }
    return true; // El nombre cumple con los requisitos
  }
  
  function handleCheckBoxChange(e) {
    //declaramos una constante objecto que contenga la id y checked del evento.
    // {id , checked,name} va a extraer la informacion del evento.target que seria el checkbox.
    
    const { id, checked, name } = e.target;

    // seteamos los datos en el ensayoSelected.
    setensayoSelected((current) => ({
      ...current,
      [id]: { name, checked },
    }));
  }
  const handleCantidadPreguntasChange = (e) => {
    setCantidadPreguntas(e.target.value);
    console.log(cantidadPreguntas);
     // Clear the selection of the other options
     const checkboxes = document.querySelectorAll('.cantidadPreguntasInput');
     checkboxes.forEach((checkbox) => {
       if (checkbox.id !== e.target.id) {
         checkbox.checked = false;
       }
     });
  } 
  const mostrarData = (e) => {
    e.preventDefault();
    setFormData({ cantidadPreguntas, ensayoSelected });
  
    // Verificar si la información ya está guardada en el almacenamiento local
    const formData = JSON.parse(localStorage.getItem('formData'));
    if (formData && formData.cantidadPreguntas) {
      // La información ya está disponible, redirigir a la URL deseada
      window.location.href = "/Menu/EnsayoCustom";
    } else {
      // La información aún no está disponible, establecer una bandera y esperar
      localStorage.setItem('dataReady', 'false');
      // Aquí puedes mostrar algún indicador de carga para informar al usuario que la información se está procesando
  
      // Una vez que la información se haya guardado, establecer la bandera en true y redirigir
      localStorage.setItem('dataReady', 'true');
      window.location.href = "/Menu/EnsayoCustom";
    }
  };
  
  return (
    <FormContext.Provider value={formData}>
    <div>
      
      
     
        <div className="Contenedor">
          
          <div className="contenedorFormulario">
          <div className="row" >
          
            <div className="col " style={{borderRightStyle:"dashed", borderRightWidth:"1px", borderRightColor:"#a7a7a7"}}>
              <p className="sub-title">Configurar</p>
              <div className="d-flex justify-content-center flex-column align-items-center text-align-start">
              
                  <div className="cantidadPreguntas-container">
                    <p><ArrowForwardIcon className="arrow-forward-icon"/>Cantidad de preguntas y tiempo</p>
                  <div className="formCheck">
                    <div className="checkbox-container">
                      <input
                        className="form-check-input cantidadPreguntasInput"
                        type="radio"
                        id="20"
                        onChange={handleCantidadPreguntasChange}
                        name="20preguntas"
                        value={"20"}
                      ></input>
                      <label className="form-check-label" htmlFor="20">
                      <ListIcon style={{color:"#a7a7a7", marginLeft:"10px", width:"30px", height:"30px", display:"flex",alignSelf:"center"}}/>
                      <div className="cantidadPreguntas">
                        
                        <label className="form-check-label" htmlFor="20">
                          20</label>
                          <label className="form-check-label" htmlFor="20">
                          Preguntas</label>
                      </div>
                      <div className="separator"></div>
                      <AccessTimeIcon style={{color:"#a7a7a7", marginLeft:"10px", width:"30px", height:"30px",display:"flex",alignSelf:"center"}}/>
                      <div className="cantidadPreguntas">
                        
                        <label className="form-check-label" htmlFor="20">
                          40</label>
                          <label className="form-check-label" htmlFor="20">
                          Minutos</label>
                      </div>
                      </label>
                    </div>

                    <div className="checkbox-container">
                      <input
                        className="form-check-input cantidadPreguntasInput"
                        type="radio"
                        id="16"
                        onChange={handleCantidadPreguntasChange}
                        name="16preguntas"
                        value={"16"}
                      ></input>
                      <label className="form-check-label" htmlFor="16">
                      <ListIcon style={{color:"#a7a7a7", marginLeft:"10px", width:"30px", height:"30px", display:"flex",alignSelf:"center"}}/>
                      <div className="cantidadPreguntas">
                        
                        <label className="form-check-label" htmlFor="16">
                          16</label>
                          <label className="form-check-label" htmlFor="16">
                          Preguntas</label>
                      </div>
                      <div className="separator"></div>
                      <AccessTimeIcon style={{color:"#a7a7a7", marginLeft:"10px", width:"30px", height:"30px",display:"flex",alignSelf:"center"}}/>
                      <div className="cantidadPreguntas">
                        
                        <label className="form-check-label" htmlFor="16">
                          32</label>
                          <label className="form-check-label" htmlFor="16">
                          Minutos</label>
                      </div>
                      </label>
                    </div>
                    <div className="checkbox-container">
                      <input
                        className="form-check-input cantidadPreguntasInput"
                        type="radio"
                        id="12"
                        onChange={handleCantidadPreguntasChange}
                        name="12preguntas"
                        value={"12"}
                      ></input>
                      <label className="form-check-label" htmlFor="12">
                      <ListIcon style={{color:"#a7a7a7", marginLeft:"10px", width:"30px", height:"30px", display:"flex",alignSelf:"center"}}/>
                      <div className="cantidadPreguntas">
                        
                        <label className="form-check-label" htmlFor="12">
                          12</label>
                          <label className="form-check-label" htmlFor="12">
                          Preguntas</label>
                      </div>
                      <div className="separator"></div>
                      <AccessTimeIcon style={{color:"#a7a7a7", marginLeft:"10px", width:"30px", height:"30px",display:"flex",alignSelf:"center"}}/>
                      <div className="cantidadPreguntas">
                        
                        <label className="form-check-label" htmlFor="12">
                          24</label>
                          <label className="form-check-label" htmlFor="12">
                          Minutos</label>
                      </div>
                      </label>
                      
                    </div>
              
                    
                    
                  </div>
                  
                <div className="formulario1">

                        <form className="form">
                            <p htmlFor="nombreEnsayo" className="mt-2">
                                Nombre del ensayo
                            </p>
                            <input
                                className={`form-control ${ inputFocus && !validarNombreEnsayo() ? 'is-invalid' : ''} ${validarNombreEnsayo() && inputFocus ? 'is-valid' : ''}`}
                                id="nombreEnsayo"
                                onChange={(e) => setnombreEnsayo(e.target.value)}
                                onFocus={() => setinputFocus(true)}
                            ></input>
                            { !validarNombreEnsayo() && inputFocus && (
                            <div className="invalid-feedback d-block">
                              El nombre del ensayo debe tener entre 10 y 20 caracteres y solo puede contener letras, espacios y guiones.
                              </div>)}
                                  
                        </form>
                  </div>
                  
                  </div>
                  
              </div>                
              </div>
              
             <div className="col ">   
              <p className="sub-title">Personalizar</p>
              <div className="d-flex justify-content-center flex-column align-items-center">               
                <div className="Contenedor1">
                  <p><ArrowForwardIcon className="arrow-forward-icon"/>Elige eje PAES</p>
                  <div className="formCheck">
                    <div className="checkbox-container checkbox-categoria">
                      <input
                        className="form-check-input categoria"
                        type="checkbox"
                        id="1"
                        onChange={handleCheckBoxChange}
                        name="numeros"
                        value={"Numeros"}
                      ></input>
                      <label className="form-check-label" htmlFor="1">
                        Numeros
                      </label>
                    </div>
                    <div className="checkbox-container checkbox-categoria">
                      <input
                        className="form-check-input categoria"
                        type="checkbox"
                        id="2"
                        onChange={handleCheckBoxChange}
                        name="Algebra"
                        value={"Algebra"}
                      ></input>
                      <label className="form-check-label" htmlFor="2">
                        Algebra y funciones
                      </label>
                    </div>
                    <div className="checkbox-container checkbox-categoria d-f">
                      <input
                        className="form-check-input categoria"
                        type="checkbox"
                        id="3"
                        onChange={handleCheckBoxChange}
                        name="Geometria"
                        value={"Geometria"}
                      
                      ></input>
                      <label className="form-check-label" htmlFor="3">
                        Geometria
                      </label>
                    </div>
                    <div className="checkbox-container checkbox-categoria">
                      <input
                        className="form-check-input categoria"
                        type="checkbox"
                        id="4"
                        onChange={handleCheckBoxChange}
                        name="Probabilidades"
                        value={"Probabilidades"}
                      ></input>
                      <label className="form-check-label" htmlFor="4">
                        Probabilidades y Estadistica
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>    
                           
                        
              
              

             
          </div>
          <div className="row d-flex align-items-end justify-content-end">
            <button className="botonQ btn btn-outline-dark m-1 " onClick={mostrarData} style={{width:"20%", height:"50px"}}> 
                      Realizar
            </button>  
            <button className="botonQ btn btn-warning m-1 " style={{width:"20%", height:"50px"}}> 
                      Guardar
            </button>  
          </div>  
        </div>
      </div>
       
        
   
        
    </div>
    </FormContext.Provider>
  );
}

export default CrearEnsayo;
