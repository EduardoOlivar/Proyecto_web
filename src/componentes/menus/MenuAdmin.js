import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import mate from '../../images/matematicas.png'
import numeros from '../../images/numeros.png'
import Navbar from '../navbar/Navbar';
import NombreEnsayoAdmin from '../NombreEnsayoAdmin';
import NavbarAdmin from '../navbar/NavbarAdmin';
import algebra from '../../images/algebra.png';
import geometria from '../../images/geometria.png';
import probabilidad from '../../images/probabilidad.png';
import FuncionUsuario from '../FuncionUsuario';
import crearEnsayo from '../../images/crearensayo.png';
import historial from '../../images/historial.png';



const cookies = new Cookies();
function MenuAdmin() {

    return (
      <div >
            <NavbarAdmin
      
            />
            <main class="container  mt-5 mb-3" >
                <div className='row'>
                                    
                        <NombreEnsayoAdmin
                            temario = "Números"
                            imagen = {numeros}
                            urlEnsayo = "PruebaNumeros"
                            urlEnsayoModificar = "ModificarNumeros"
                            urlEnsayoEliminar = "EliminarNumeros"
                            score = "scoreNumeros"
                            puntosTotal = "10"
                        />

                        <NombreEnsayoAdmin
                            temario = "Álgebra y Funciones"
                            imagen = {algebra}
                            urlEnsayo = "PruebaAlgebra"
                            urlEnsayoModificar = "ModificarAlgebra"
                            urlEnsayoEliminar = "EliminarAlgebra"
                            score = "error"
                            puntosTotal = "5"
                          
                        />

                        <NombreEnsayoAdmin
                            temario = "Geometría"
                            imagen = {geometria}
                            urlEnsayo = "PruebaGeometria"
                            urlEnsayoModificar = "ModificarGeometria"
                            urlEnsayoEliminar = "EliminarGeometria"
                            score = "error"
                            puntosTotal = "10"
                            
                        />  

                        <NombreEnsayoAdmin
                            temario = "Probabilidad y Estadística"
                            imagen = {probabilidad}
                            urlEnsayo = "PruebaProbabilidades"
                            urlEnsayoModificar = "ModificarProbabilidades"
                            urlEnsayoEliminar = "EliminarProbabilidades"
                            score = "error"
                            puntosTotal = "5"
                          
                        />  
                        
                       
                               
                    </div>   
                        
                 
            
            </main>
        </div>
          
    );
}

export default MenuAdmin;