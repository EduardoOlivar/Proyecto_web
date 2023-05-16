import React, { Component } from 'react'
import { useState, useEffect } from 'react'
import Navbar from '../navbar/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import "../../hojas-de-estilo/historial.css"


function Historial(props) {

    return (

        <>

            <div className='contenedorPrincipal'>
                
                <div className='contenedorNav'>
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                    <h5>FILTROS...</h5>
                </div>
                <div className='contenedorHistorial'>
                    {/* <h2>Historial</h2> */}
                    <div className='label'>
                        <h5>Nombre</h5>
                        <h5>Tema</h5>
                        <h5>Personalizado</h5>
                        <h5>Fecha</h5>
                        <h5>Tiempo</h5>
                        <h5>N° preguntas</h5>
                        <h5>Acciones</h5>
                    </div>

                    {props.items.map((ensayo, index) => (
                        <div className='info' key={index}>
                            <div className=''>{ensayo.nombre}</div>
                            <div className=''>{ensayo.tema}</div>
                            <div className=''>{ensayo.personalizado ? 'SI' : 'NO'}</div>
                            <div className=''>{ensayo.fecha}</div>
                            <div className=''>{ensayo.tiempo}</div>
                            <div className=''>{ensayo.preguntas}</div>
                            <div className=''>{ensayo.tiempo}</div>
                        </div>))
                    }
                    
                </div>
                <div className='Botones'>
                         <ul class="pagination">
                            <li onClick={props.prev} class="page-item"><a class="page-link" href="#">Retroceder</a></li>
                            <li class="page-item"><a class="page-link" href="#">{props.paginaActual + 1}</a></li>
                            <li onClick={props.next} class="page-item"><a class="page-link" href="#">Avanzar</a></li>
                        </ul>
                    </div>
            </div>
        </>
    )
}

export default Historial;


//rfce
 {/* {Ensayos.map((ensayo, index) => (
                    <div className='info' key={index}>
                        <div className='informacion'>{ensayo.nombre}</div>
                        <div className='informacion'>{ensayo.nombre}</div>
                        <div className='informacion'>{ensayo.nombre}</div>
                         </div>))} */}

{/* <div className='informacion'>
                    <div >
                        <h5>Nombre</h5>
                        <div className='info'>
                            {Ensayos.map((ensayo, index)=>(
                                <div key={index}>
                                    {ensayo.nombre}
                                </div>
                            ))} 
                        </div>
                    </div>
                    <div >
                        <h5>Tema</h5>
                        <div className='info'>
                            {Ensayos.map((ensayo, index)=>(
                                <div key={index}>
                                    {ensayo.tema}
                                </div>
                            ))} 
                        </div>
                           
                    </div>
                    <div >
                        <h5>Personalizado</h5> 
                        <div className='info'>
                            {Ensayos.map((ensayo, index)=>(
                            <div key={index}>
                                {ensayo.personalizado}
                            </div>
                            ))} 
                        </div> 
                                           
                    </div>
                    <div >
                        <h5>Fecha</h5>
                        <div className='info'>
                            {Ensayos.map((ensayo, index)=>(
                                <div key={index}>
                                    {ensayo.fecha}
                                </div>
                            ))}  
                        </div> 
                                      
                    </div>
                    <div >
                        <h5>Tiempo</h5>
                        <div className='info'>
                            {Ensayos.map((ensayo, index)=>(
                                <div key={index}>
                                    {ensayo.tiempo}
                                </div>
                            ))} 
                        </div>
                                             
                    </div>
                    <div >
                        <h5>Puntaje</h5>
                        <div className='info'>
                            {Ensayos.map((ensayo, index)=>(
                                <div key={index}>
                                    {ensayo.puntaje}
                                </div>
                            ))} 
                        </div>
                                         
                    </div>
                    <div >
                        <h5>N° preguntas</h5>
                        <div className='info'>
                            {Ensayos.map((ensayo, index)=>(
                                <div key={index}>
                                    {ensayo.preguntas}
                                </div>
                            ))}  
                        </div>
                                           
                    </div>
                    <div >
                        <h5>Acciones</h5>                     
                    </div>
                </div> */}

