import React, { Component } from 'react'
import { useState, useEffect } from 'react'
import Navbar from '../navbar/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import "../../hojas-de-estilo/historial.css"
import moment from 'moment';
import SearchIcon from '@mui/icons-material/Search';
import { StraightenTwoTone } from '@mui/icons-material';
import VerDatosHistorial from './VerDatosHistorial';

function Historial({items}) {


    const [search , setSearch] = React.useState('');
    const [selectFiltro, setSelectFiltro] = React.useState('4');
    const [paginaActual, setPaginaActual] = React.useState(0);
    const [filtrarPor, setFiltrarPor] = React.useState(true);
    const [focusFiltrar, setFocusFiltrar] = React.useState(false)
    const itemsPorPagina = 4;
    const [idVermas, setIdVerMas] = React.useState({})
    const [verMasConfirmado, setVerMasConfirmado] = React.useState(false);


    const verMas = (id, name, puntaje, date, cantidadPreguntas) =>{
        setIdVerMas(
            {   
                id: id,
                nombre:name,
                puntaje:puntaje,
                date:date,
                cantidadPreguntas: cantidadPreguntas
            }
        )
        setVerMasConfirmado(true);
    }

    function removeAccents(str) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      }

    // funcion que busca por nombre y envia los datos al historial filtrados por nombre.
    const BusquedaNombre = () =>{
        // si no han ingresado una busqueda, enviamos la lista completa.
        if( !search)
        {   
            const datosHistorial = items;
            const indexInicio = paginaActual * itemsPorPagina
            // setBusquedaVacia(false)
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
            // setBusquedaVacia(false);

            const indexInicio = paginaActual * itemsPorPagina;
            const itemsPagina = filtrado.slice(indexInicio, indexInicio + itemsPorPagina);

            return itemsPagina;
    }

    const FiltroSelect = (ensayo) =>{

        // const filtradoSinTilde = ensayo.map(ensayo => ({
        //     ...ensayo,
        //     name:removeAccents(ensayo.name)
        // })) 
        // ordena nombre ascendentemente.
       
          // ordena puntaje de menor a mayor
            if (selectFiltro === '2'){
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
            return ensayo = ensayo.sort((a, b) => a.current_questions - b.current_questions);
          }
          // ordena preguntas de mayor a menor.
          else if (selectFiltro === '7') {
            return ensayo = ensayo.sort((a, b) => b.current_questions - a.current_questions);
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
        if(target.value !=''){
            setFiltrarPor(false)
        }else{
            setFiltrarPor(true)
        }
    }

    const handleFocus = () =>{
        setFocusFiltrar(true)
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


    
    const fechaFormateada = (fecha) => {
        const newFecha = moment(fecha).calendar(null, {
            sameDay: '[hoy]',
            lastDay: '[ayer]',
            lastWeek: '[hace 1 semana] ',
            sameElse: 'DD/MM/YYYY'
          });
        return newFecha;
    }
    // console.log(busquedaVacia)

    if(verMasConfirmado){
        return(
            <div>
                <main className="contenedor-principal min-vh-100">
                <VerDatosHistorial datosEnsayo = {idVermas} >  
                    </VerDatosHistorial>
                    <button className='botonQ btn btn-warning btn-lg m-2  ' onClick={() => setVerMasConfirmado(false)}>Retroceder</button> 
                </main>   
            </div>     
                )
    }

    return (
        <>
            <div className='contenedorPrincipal'>
                
                <div className='contenedorNav'>

                    <div className='busqueda'>
                        <input 
                            className="form-control busqueda me-2" 
                            type="search" placeholder="Buscar Ensayo" 
                            aria-label="Search"
                            onChange={onSearchChange}
                        >
                        </input> 
                            { BusquedaNombre().length === 0 && items.length > 0 &&(
                            <p className="invalid-feedback d-block fallida">
                              No se encontro ningun resultado!
                              </p>)}
                    </div>
                    

                    <select 
                        className="form-select form-select-sm" 
                        aria-label=".form-select-sm example"
                        onChange={onSelectChange}
                        onFocus={handleFocus}
                        defaultValue =""                     
                    >
                        { filtrarPor && !focusFiltrar && <option value="" >Filtrar por:</option>}
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
                            <div className=''>{ensayo.name}</div>
                            <div className=''>{ensayo.puntaje}</div>
                            <div className=''>{ensayo.is_custom ? 'Si' : 'No' }</div>
                            <div className=''>{ensayo.date}</div>

                            <div className=''>{ensayo.current_questions}</div>
                            <div className='' onClick={() => verMas(ensayo.id, ensayo.name, ensayo.puntaje,ensayo.date, ensayo.current_questions)} style={{display:'flex', justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                                <div className='accion'>

                                    <SearchIcon></SearchIcon>
                                    Ver
                                </div>
                            </div>
                        </div>))
                    }
                    
                </div>
         
                <div className='Botones'>
                         <ul className="pagination">
                            <li onClick={previousPage} className="page-item"><a className="page-link" href="#">Retroceder</a></li>
                            <li className="page-item"><a className="page-link" href="#">{paginaActual + 1}</a></li>
                            <li onClick={nextPage} className="page-item"><a className="page-link" href="#">Avanzar</a></li>
                        </ul>
                    </div>
            </div>
        </>
    )
}

export default Historial;