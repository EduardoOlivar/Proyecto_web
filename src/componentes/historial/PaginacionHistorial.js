import React from 'react'
import { useState, useEffect } from 'react'
import Navbar from '../navbar/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import "../../hojas-de-estilo/historial.css"
import Historial from './Historial';

function PaginacionHistorial() {

    const Ensayos = [ 
        {
            nombre:"geometria",
            tema:"geometria",
            puntaje:"5",
            fecha:"25-01-23",
            personalizado:false,
            tiempo:"20",
            preguntas:"10"  
        },
        {
            nombre:"Algebra",
            tema:"Algebra",
            puntaje:"1",
            fecha:"25-01-23",
            personalizado:false,
            tiempo:"40",
            preguntas:"50"  
        },
        {
            nombre:"Numeros",
            tema:"geometria",
            puntaje:"8",
            fecha:"25-01-23",
            personalizado:true,
            tiempo:"20",
            preguntas:"2"  
        },
        {
            nombre:"123456789123456",
            tema:"NUmeros",
            puntaje:"5",
            fecha:"25-01-23",
            personalizado:true,
            tiempo:"60",
            preguntas:"90"  
        },
        {
            nombre:"123456789123456",
            tema:"NUmeros",
            puntaje:"5",
            fecha:"25-01-23",
            personalizado:true,
            tiempo:"60",
            preguntas:"90"  
        },
        {
            nombre:"123456789123456",
            tema:"NUmeros",
            puntaje:"5",
            fecha:"25-01-23",
            personalizado:true,
            tiempo:"60",
            preguntas:"90"  
        },

        {
            nombre:"123456789123456",
            tema:"NUmeros",
            puntaje:"5",
            fecha:"25-01-23",
            personalizado:true,
            tiempo:"60",
            preguntas:"90" 
        },
        {
            nombre:"Numeros",
            tema:"geometria",
            puntaje:"8",
            fecha:"25-01-23",
            personalizado:true,
            tiempo:"20",
            preguntas:"2"  
        },
        {
            nombre:"Numeros",
            tema:"geometria",
            puntaje:"8",
            fecha:"25-01-23",
            personalizado:true,
            tiempo:"20",
            preguntas:"2"  
        },
    ]

    const itemsPorPagina = 6; // numero de cuantos muestro por pagina.

    // const [datos, setDatos] = React.useState(Ensayos);
    const [items, setItems] = React.useState([...Ensayos].splice(0, itemsPorPagina)) // mostrara desde 0 hasta 4.
    const [paginaActual, setPaginaActual] = React.useState(0);


    const nextPage = () =>{
        const LargoDatos = Ensayos.length;

        const siguientePagina = paginaActual + 1;

        // la siguiente pagina empezara con el valor dependiedno la pagina. ejemplo= 1 * 4, 2*4, 3*4. 
        const indexPaginaSiguiente = siguientePagina * itemsPorPagina;

        if(LargoDatos <= indexPaginaSiguiente) return;

        setItems([...Ensayos].splice(indexPaginaSiguiente, itemsPorPagina))
        setPaginaActual(siguientePagina);

    }

    const previousPage = () =>{
        
        const paginaAnterior = paginaActual - 1;

        if( paginaActual === 0) return
        
        const indexPaginaAnterior = paginaAnterior * itemsPorPagina

        setItems([...Ensayos].splice(indexPaginaAnterior, itemsPorPagina))
        setPaginaActual(paginaAnterior)
    }

  return (
    <Historial paginaActual = {paginaActual}
                items= {items}
                next = {nextPage}
                prev = {previousPage}>
    </Historial>
  )
}

export default PaginacionHistorial