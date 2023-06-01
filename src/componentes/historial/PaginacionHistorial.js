import React from 'react'
import { useState, useEffect } from 'react'
import Navbar from '../navbar/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import "../../hojas-de-estilo/historial.css"
import Historial from './Historial';
import axios from 'axios';

function PaginacionHistorial() {
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
            console.log(historial)
        })
        .catch(error => {
            console.log(error);
        });
      }, []);
     
  return (
    <div className='contenedor'>
    <Historial 
                items= {historial}>
    </Historial>
    </div>
  )
}

export default PaginacionHistorial