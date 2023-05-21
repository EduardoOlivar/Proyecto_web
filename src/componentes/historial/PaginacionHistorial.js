import React from 'react'
import { useState, useEffect } from 'react'
import Navbar from '../navbar/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import "../../hojas-de-estilo/historial.css"
import Historial from './Historial';
import axios from 'axios';

function PaginacionHistorial() {
    const [items, setItems] = React.useState([]);
    const [historial, setHistorial] = useState([]);
    const user_id = localStorage.getItem('user_id');
    const token = localStorage.getItem("token");
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/history/" + user_id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            const historialArray = Object.values(res.data);
            setHistorial(historialArray.reverse());
            
        })
        .catch(error => {
            console.log(error);
        });
      }, []);
      
      useEffect(() => {
        if (historial.length > 0) {
       
          // Realiza las operaciones que deseas hacer con historial lleno
        }
      }, [historial]);
    
    const Ensayos = [ 
        {
            nombre:"Geometria",
            tema:"600",
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
    const itemsPorPagina = 4; 
    React.useEffect(() => {
        // Define la cantidad de elementos por página
        const itemsMostrados = historial.slice(0, itemsPorPagina); // Obtiene la porción de elementos de historial
        setItems(itemsMostrados); // Asigna los elementos a items
      }, [historial]);
      console.log(items)
      const [paginaActual, setPaginaActual] = React.useState(0);
      const nextPage = () => {
        const largoDatos = historial.length;
        const siguientePagina = paginaActual + 1;
        const indexPaginaSiguiente = siguientePagina * itemsPorPagina;
      
        if (largoDatos <= indexPaginaSiguiente) return;
      
        const itemsMostrados = historial.slice(indexPaginaSiguiente, indexPaginaSiguiente + itemsPorPagina);
        setItems(itemsMostrados);
        setPaginaActual(siguientePagina);
      }
      
      const previousPage = () => {
        const paginaAnterior = paginaActual - 1;
      
        if (paginaActual === 0) return;
      
        const indexPaginaAnterior = paginaAnterior * itemsPorPagina;
        const itemsMostrados = historial.slice(indexPaginaAnterior, indexPaginaAnterior + itemsPorPagina);
        setItems(itemsMostrados);
        setPaginaActual(paginaAnterior);
      }

  return (
    <div className='contenedor'>
    <Historial paginaActual = {paginaActual}
                items= {items}
                next = {nextPage}
                prev = {previousPage}>
    </Historial>
    </div>
  )
}

export default PaginacionHistorial