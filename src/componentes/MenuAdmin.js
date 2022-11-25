import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import mate from '../images/matematicas.png'
import NavbarAdmin from './NavbarAdmin';


const cookies = new Cookies();
function MenuAdmin() {

    return (
        <main>
            <NavbarAdmin

            />
        <div class="container mt-5 mb-5 accordion" id="accordionExample">
            <div class="accordion-item ">
              <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button collapsed" type="" data-bs-toggle="" data-bs-target="" aria-expanded="true" aria-controls="">
                  Agregar preguntas
                </button>
              </h2>
              <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" >
                <div class="accordion-body">
                    <div class="form-group">
                        <label for="exampleFormControlSelect1">Seleccionar categoría.</label>
                        <select class="form-control" id="exampleFormControlSelect1">
                            <option>Geometría</option>        
                            <option>Algebra</option>        
                            <option>Probabilidad</option>        
                            <option>Numeros</option>      
                        </select>

                        <label for="enunciado">Ingresar enunciado del ejercicio.</label>
                        <input class="form-control" type="text"id="enunciado" placeholder="Enunciado"/>

                        <label for="respuesta correcta">Ingresar respuesta correcta.</label>
                        <input class="form-control" type="text"id="respuesta correcta" placeholder="Respuesta correcta"/>

                        <label for="respuesta incorrecta 1">Ingresar respuesta incorrecta 1.</label>
                        <input class="form-control" type="text"id="respuesta incorrecta 1" placeholder="Respuesta incorrecta 1"/>

                        <label for="respuesta incorrecta 2">Ingresar respuesta incorrecta 2.</label>
                        <input class="form-control" type="text"id="respuesta incorrecta 2" placeholder="Respuesta incorrecta 2"/>

                        <label for="respuesta incorrecta 3">Ingresar respuesta incorrecta 3.</label>
                        <input class="form-control" type="text"id="respuesta incorrecta 3" placeholder="Respuesta incorrecta 3"/>

                        <label for="respuesta incorrecta 3">Ingresar enlace a video explicativo.</label>
                        <input class="form-control" type="link"id="respuesta incorrecta 3" placeholder="Enlace"/>
                        
                        <button type="submit" class="btn btn-primary">Agregar</button>
                    </div>
                </div>
              </div>
            </div>
            <div class="accordion-item mt-3">
              <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed" type="" data-bs-toggle="" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  Eliminar preguntas
                </button>
              </h2>
              <div id="collapseTwo" class="accordion-collapse collapse show" aria-labelledby="headingTwo" >
                <div class="accordion-body">
                    <div class="form-group">
                        <label for="exampleFormControlSelect1">Seleccionar categoría.</label>
                        <select class="form-control" id="exampleFormControlSelect1">
                            <option>Geometría</option>        
                            <option>Algebra</option>        
                            <option>Probabilidad</option>        
                            <option>Numeros</option>      
                        </select>

                        <label for="enunciado">Ingresar enunciado del ejercicio.</label>
                        <input class="form-control" type="text"id="enunciado" placeholder="Enunciado"/>
                        
                        <button type="submit" class="btn btn-primary">Eliminar</button>
                    </div>
                </div>
              </div>
            </div>
            
        </div>
    </main>
          
    );
}

export default MenuAdmin;