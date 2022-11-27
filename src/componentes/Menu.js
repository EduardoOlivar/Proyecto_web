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
                        
                            <div className="col-md-4 mt-3">
                                <div className='row  '>
                                <div className="card p-3 mb-2">
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex flex-row align-items-center">
                                            <div className="iconMenu"> <img className='logoMenu' src="" alt="" /> </div>
                                            <div className="ms-2 c-details ">
                                                <h3 className="mb-0 ">Crear Ensayo</h3> 
                                            </div>
                                        </div>
                                    </div>        
                                </div>
                                </div>
                                <div className='row mt-5 '>
                                <div className="card p-3 mb-2">
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex flex-row align-items-center">
                                            <div className="iconMenu"> <img className='logoMenu' src="" alt="" /> </div>
                                            <div className="ms-2 c-details">
                                                <h3 className="mb-0">Revisar Historial</h3> 
                                            </div>
                                        </div>
                                    </div>        
                                </div>
                                </div>
                            </div> 
                               
                        </div>   
                        
                 
            
            </main>
        </div>
        
          
    );
}

export default Menu;