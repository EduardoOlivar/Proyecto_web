import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../navbar/Navbar";
import "../../hojas-de-estilo/crearEnsayo.css";

import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "katex/dist/katex.min.css";
import axios from "axios";
import Ensayo from "../pruebas/Ensayo";
import NombreEnsayo from "./NombreEnsayo";
import Swal from "sweetalert2";


const Apiurl = `http://127.0.0.1:8000/questions_alternative/?subject=`;

function CrearEnsayo() {
 

  
  // guardara todas las preguntas y respuestas de los llamados a las bd.
  const [post, setPost] = React.useState([]);
  // el ensayoSelected sera solo el/los tema que fue seleccionado por el usuario.
  const [ensayoSelected, setensayoSelected] = React.useState({});

  // esta constante sera solo para saber si elegio los temas y finalizar la funcion.
  const [isFinished, setisFinished] = React.useState(false);

  const [nombreEnsayo, setnombreEnsayo] = React.useState("");
  const [tiempoEnsayo, setTiempoEnsayo] = React.useState(0);
  const [focusTiempo, setFocusTiempo] = React.useState(false);
  const [inputFocus, setinputFocus] = React.useState(false);

  if (!post) return null;

  //funcion para desordenar las preguntas.
  function shuffleArray(array) {
    const newArray = [...array];
    newArray.sort(() => Math.random() - 0.5);
    return newArray;
  }

  // desordenamos las respuestas del array.
  for (let i = 0; i < post.length; i++) {
    post[i].answer = shuffleArray(post[i].answer);
  }

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

  function llamadoApi() {

    const ensayosSeleccionados = [];
    const promesas = [];
    let checkBoxSeleccionados = 0;
    let largo = Object.keys(ensayoSelected).length;

    if (!validarNombreEnsayo() || tiempoEnsayo === 0 || largo === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debe rellenar todos los datos',
      })
    } else {
      // recorremos el ensayoSelected
      for (let i in ensayoSelected) {
        // revisamos si el checkbox es true, con esto sabemos cual fue marcada y cual no.
        if (ensayoSelected[i].checked === true) {
          // inicializamos la la url agregando name al final que sera (numeros,geometria...)
            const ensayoUrl = `${Apiurl}${ensayoSelected[i].name}`;
            checkBoxSeleccionados++; 
          // almacenamos las promesas en un arreglo, el cual son los datos de la api, aun no cargados.
          //las promesas pueden tener tres estados: pendiente (pending), resuelta (fulfilled) y rechazada (rejected).
          promesas.push(axios.get(ensayoUrl));
        }
      }

      // si al menos tenemos un checkbox seleccionado que rellene el post y mande la informacion al ensayo.
      if(checkBoxSeleccionados > 0){
            // esperamos a que todas las promesas se resuelvan y concatenamos los datos, para asi poder concadenar
            Promise.all(promesas)
                .then((responses) => {
                for (let i = 0; i < responses.length; i++) {
                    // agregamos toda la informacion de la api.
                    ensayosSeleccionados.push(responses[i].data);
                }
                // concatenamos todos los datos del arreglo para que quede como 1 arreglo.
                setPost([].concat(...ensayosSeleccionados)); 
                Swal.fire({
                    icon: 'success',
                    title: 'Genial!!',
                    text: 'Ensayo creado correctamente!',
                    // timer:2000,
                    customClass:{
                        contenido:'contenidoSwal',
                    },
                });

                // const Toast = Swal.mixin({
                //     toast: true,
                //     // position: 'top-end',
                //     showConfirmButton: false,
                //     timer: 2000,
                //     timerProgressBar: true,
                //     didOpen: (toast) => {
                //       toast.addEventListener('mouseenter', Swal.stopTimer)
                //       toast.addEventListener('mouseleave', Swal.resumeTimer)
                //     }
                //   })
                  
                //   Toast.fire({
                //     icon: 'success',
                //     title: 'Ensayo creado correctamente!'
                //   })

                setTimeout(function() {
                            setisFinished(true);
                }, 2000); // 2000 milisegundos = 2 segundos
                    
                    
                })
                .catch((error) => {
                console.log(error);
                setisFinished(false);
                });
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Debe seleccionar al menos una categoria',
            })
        }
    }

      
  }

  // tendre que crear otro componente que reciba los datos.
  if (isFinished)
    return (
      <div>
      
        <Ensayo
          ensayo={shuffleArray(post)}
          urlEnsayo="CrearEnsayo"
          titleEnsayo={nombreEnsayo}
          paragraphEnsayo="Matemática(M1)"
          colorEnsayo="heroGeometria"
        />
      </div>
    );

  return (
    <div>
       <Navbar/> 
      
      
        <div className="Contenedor">
          <div className="contenedorFormulario">
          <h2 className="tituloForm">Ensayo personalizado!</h2>
            <div className="formulario1">
                  <form className="form">
                      <label for="nombreEnsayo" className="form-label">
                          Nombre del ensayo
                      </label>
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
              

                  
            <div className="Contenedor1">
  <p>Elige un tipo de categoria para su ensayo.</p>
  <div className="formCheck">
    <div class="checkbox-container">
      <input
        class="form-check-input"
        type="checkbox"
        id="1"
        onChange={handleCheckBoxChange}
        name="numeros"
        value={"Numeros"}
      ></input>
      <label class="form-check-label" for="1">
        Numeros
      </label>
    </div>
    <div class="checkbox-container">
      <input
        class="form-check-input"
        type="checkbox"
        id="2"
        onChange={handleCheckBoxChange}
        name="Algebra"
        value={"Algebra"}
      ></input>
      <label class="form-check-label" for="2">
        Algebra y funciones
      </label>
    </div>
    <div class="checkbox-container">
      <input
        class="form-check-input"
        type="checkbox"
        id="3"
        onChange={handleCheckBoxChange}
        name="Geometria"
        value={"Geometria"}
      ></input>
      <label class="form-check-label" for="3">
        Geometria
      </label>
    </div>
    <div class="checkbox-container">
      <input
        class="form-check-input"
        type="checkbox"
        id="4"
        onChange={handleCheckBoxChange}
        name="Probabilidades"
        value={"Probabilidades"}
      ></input>
      <label class="form-check-label" for="4">
        Probabilidades y Estadistica
      </label>
    </div>
  </div>
</div>


              <div className="select">
                <select 
                    class={`form-select ${tiempoEnsayo === 0 && focusTiempo ? 'is-invalid' :''} ${tiempoEnsayo > 0 && focusTiempo ? 'is-valid' : ''}`} 
                    onChange={(e) => setTiempoEnsayo(parseInt(e.target.value))}
                    onFocus= {()=> setFocusTiempo(true)}>
                      <option value="0" selected>Seleccionar minutos</option>
                      <option value="25">25 minutos</option>
                      <option value="45">45 minutos</option>
                      <option value="60">60 minutos</option>
                      <option value="90">90 minutos</option>
                </select>
                {tiempoEnsayo === 0 && focusTiempo && (<div className="invalid-feedback d-block">Agrege los minutos deseados</div>)}
                {/* {tiempoEnsayo > 0  && focusTiempo && (<div className="valid-feedback d-block"> parece correcto</div>)} */}
              </div>
              

              <div className="boton" >
                  <button className="btn btn-secondary" onClick={llamadoApi}>
                      Crear Ensayo
                  </button>
              </div>
            </div>
        </div>
       
        
   
        
    </div>
  );
}

export default CrearEnsayo;
