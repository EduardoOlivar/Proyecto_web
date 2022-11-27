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
import FuncionUsuario from './FuncionUsuario';
import crearEnsayo from '../images/crearensayo.png';
import historial from '../images/historial.png';


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
                            score = "error"
                            puntosTotal = "10"
                            estadoBoton = "disabled"
                        />

                        <NombreEnsayo
                            temario = "Geometría"
                            imagen = {geometria}
                            urlEnsayo = "error"
                            score = "error"
                            puntosTotal = "10"
                            estadoBoton = "disabled"
                        />  

                        <NombreEnsayo
                            temario = "Probabilidad y Estadística"
                            imagen = {probabilidad}
                            urlEnsayo = "error"
                            score = "error"
                            puntosTotal = "10"
                            estadoBoton = "disabled"
                        />  
                        
                        <div className="col-md-4 mt-3">
                            <FuncionUsuario
                                funcion = "Crear Ensayo"
                                logo = {crearEnsayo}
                            />
                            <FuncionUsuario
                                funcion = "Revisar Historial"
                                logo = {historial}
                            />
                        </div> 
                               
                    </div>   
                        
                 
            
            </main>
        </div>
        
          
    );
}

export default Menu;