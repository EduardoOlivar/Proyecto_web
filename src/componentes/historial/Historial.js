import React, { Component } from 'react'
import { useState, useEffect } from 'react'
import Navbar from '../navbar/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import "../../hojas-de-estilo/historial.css"
import moment from 'moment';
import SearchIcon from '@mui/icons-material/Search';

function Historial({items}) {


    const [search , setSearch] = React.useState('');
    const [selectFiltro, setSelectFiltro] = React.useState('4');
    const [paginaActual, setPaginaActual] = React.useState(0);
    const itemsPorPagina = 4;

    // funcion que busca por nombre y envia los datos al historial filtrados por nombre.
    const BusquedaNombre = () =>{
        // si no han ingresado una busqueda, enviamos la lista completa.
        if( !search)
        {   
            const datosHistorial = items;
            const indexInicio = paginaActual * itemsPorPagina
                if(selectFiltro){
                    FiltroSelect(datosHistorial);
                }
            return datosHistorial.slice(indexInicio, indexInicio + itemsPorPagina)
        }
            // creamos una variable y pasamos la busqueda a minusculas
            const minusculas = search.toLowerCase();
            const filtrado = items.filter(ensayo =>
              ensayo.name.toLowerCase().includes(minusculas)
            )
            
            if(selectFiltro){
                FiltroSelect(filtrado);
            }

            const indexInicio = paginaActual * itemsPorPagina;
            const itemsPagina = filtrado.slice(indexInicio, indexInicio + itemsPorPagina);

            return itemsPagina;
    }

    const FiltroSelect = (ensayo) =>{
        // ordena nombre ascendentemente.
        if (selectFiltro === '1') {
            return ensayo = ensayo.sort((a, b) => a.name.charAt(7).localeCompare(b.name.charAt(7)));
          }
          // ordena puntaje de menor a mayor
          else if (selectFiltro === '2'){
            return ensayo = ensayo.sort((a, b) => a.puntaje - b.puntaje);
          }
          // ordena puntaje de mayor a menor
          else if (selectFiltro === '3') {
            return ensayo = ensayo.sort((a, b) => b.puntaje - a.puntaje);
          }
          //ordena fecha ascendentemente
          else if (selectFiltro === '4') {
            return ensayo = ensayo.sort(
              (a, b) => new Date(b.date) - new Date(a.date)
            );
          }
          //ordena fecha descedentemente
          else if (selectFiltro === '5') {
            return ensayo = ensayo.sort(
              (a, b) => new Date(a.date) - new Date(b.date)
            );
          }
          // ordena las preguntas de menor a mayor
          else if (selectFiltro === '6') {
            return ensayo = ensayo.sort((a, b) => a.questions - b.questions);
          }
          // ordena preguntas de mayor a menor.
          else if (selectFiltro === '7') {
            return ensayo = ensayo.sort((a, b) => b.questions - a.questions);
          }
    }

    //funcion que envia el tamaño de la busqueda ingresada.
    const largoBusqueda = () =>{
        if(!search) return items.length
        
        const minusculas = search.toLocaleLowerCase();
        const filtrado = items.filter(ensayo => ensayo.name.toLowerCase().includes(minusculas))
        return filtrado.length;
    }

    //guardamos el valor del search que pone el usuario.
    const onSearchChange = ({ target }) => {
        setSearch(target.value);
        //cada vez que haya una busqueda se ira automaticamente a la primera pagina.
        setPaginaActual(0);
      };

    // guardamos valor del filtro select.
    const onSelectChange = ({target}) =>{
        setSelectFiltro(target.value);
    }

    //funcion para avanzar de pagina.
    const nextPage = () => {
        const totalPaginas = largoBusqueda();
        if ((paginaActual + 1) * itemsPorPagina < totalPaginas) {
            setPaginaActual(paginaActual + 1);
        }
      }
    
    // funcion para retroceder de pagina.
    const previousPage = () => {
        if (paginaActual > 0) {
            setPaginaActual(paginaActual - 1);
        }
      }



    
    // const fechaFormateada = (fecha) => {
    //     const newFecha = moment(fecha).calendar(null, {
    //         sameDay: '[hoy]',
    //         lastDay: '[ayer]',
    //         lastWeek: '[hace 1 semana] ',
    //         sameElse: 'DD/MM/YYYY'
    //       });
    //     return newFecha;
    // }

    return (
        <>
            <div className='contenedorPrincipal'>
                
                <div className='contenedorNav'>

                    <input 
                    class="form-control busqueda me-2" 
                    type="search" placeholder="Search" 
                    aria-label="Search"
                    onChange={onSearchChange}
                    >
                    </input>

                    <select 
                        class="form-select form-select-sm" 
                        aria-label=".form-select-sm example"
                        onChange={onSelectChange}                        
                    >
                        <option selected value="4" >Filtrar por:</option>
                        <option className='optionFilter' value="1">Nombre</option>
                        <option className='optionFilter' value="2">Puntaje de menor a mayor</option>
                        <option className='optionFilter' value="3">Puntaje de mayor a menor</option>
                        <option className='optionFilter' value="4">Fechas mas recientes</option>
                        <option className='optionFilter' value="5">Fechas mas antiguas</option>
                        <option className='optionFilter' value="6">Preguntas de menor a mayor</option>
                        <option className='optionFilter' value="7">Preguntas de mayor a menor</option>
                    </select>
                </div>
                <div className='contenedorHistorial'>
                    {/* <h2>Historial</h2> */}
                    <div className='label'>
                        <h5>Nombre</h5>
                        <h5>Puntaje</h5>
                        <h5>Personalizado</h5>
                        <h5>Fecha</h5>
                    
                        <h5>N° preguntas</h5>
                        <h5>Acciones</h5>
                    </div>

                    {BusquedaNombre().map((ensayo, index) => (
                        <div className='info' key={index}>
                            <div className=''>{ensayo.name.charAt(7).toUpperCase() + ensayo.name.slice(8)}</div>
                            <div className=''>{ensayo.puntaje}</div>
                            <div className=''>{ensayo.is_custom }</div>
                            <div className=''>{ensayo.date.slice(0,10)}</div>

                            <div className=''>{ensayo.questions}</div>
                            <div className='' style={{display:'flex', justifyContent:'center', alignContent:'center', alignItems:'center'}}><div className='accion'><SearchIcon></SearchIcon>Ver</div></div>
                        </div>))
                    }
                    
                </div>
                <div className='Botones'>
                         <ul class="pagination">
                            <li onClick={previousPage} class="page-item"><a class="page-link" href="#">Retroceder</a></li>
                            <li class="page-item"><a class="page-link" href="#">{paginaActual + 1}</a></li>
                            <li onClick={nextPage} class="page-item"><a class="page-link" href="#">Avanzar</a></li>
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

