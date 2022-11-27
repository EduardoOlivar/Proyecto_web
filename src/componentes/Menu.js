import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import mate from '../images/matematicas.png'
import numeros from '../images/numeros.png'
import Navbar from './Navbar';
import NombreEnsayo from './NombreEnsayo';
import algebra from '../images/algebra.png';
import geometria from '../images/geometria.png';
import probabilidad from '../images/probabilidad.png';


const cookies = new Cookies();
function Menu() {

    return (
        <div >
            <Navbar
      
            />
            <main class="container  mt-5 mb-3" >
                <div className='row'>
                    
                        <NombreEnsayo
                            temario = "Eje general"
                            imagen = {mate}
                            urlEnsayo = "Pregunta"
                            score = "scoreGeneral"
                            puntosTotal = "5"
                        />
                    
                    
                        <NombreEnsayo
                            temario = "Números"
                            imagen = {numeros}
                            urlEnsayo = "EnsayoNumeros"
                            score = "scoreNumeros"
                            puntosTotal = "10"
                        />

                        <NombreEnsayo
                            temario = "Álgebra y Funciones"
                            imagen = {algebra}
                            urlEnsayo = "error"
                            score = "0"
                            puntosTotal = "10"
                            estadoBoton = "disabled"
                        />

                        <NombreEnsayo
                            temario = "Geometría"
                            imagen = {geometria}
                            urlEnsayo = "error"
                            score = "0"
                            puntosTotal = "10"
                            estadoBoton = "disabled"
                        />  

                        <NombreEnsayo
                            temario = "Probabilidad y Estadística"
                            imagen = {probabilidad}
                            urlEnsayo = "error"
                            score = "0"
                            puntosTotal = "10"
                            estadoBoton = "disabled"
                        />  
                   
                </div>    
            
            </main>
        </div>
          
    );
}

export default Menu;