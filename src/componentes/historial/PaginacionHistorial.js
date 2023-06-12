import React from 'react'
import { useState, useEffect } from 'react'
import Navbar from '../navbar/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import "../../hojas-de-estilo/historial.css"
import Historial from './Historial';
import axios from 'axios';
import { motion, AnimatePresence } from "framer-motion"
import Estadisticas from '../estadisticas/Estadisticas';

function PaginacionHistorial() {
    const [selectedButton, setSelectedButton] = useState('Historial');
    const handleButtonClick = (button) => {
        setSelectedButton(button);
      }
    const [historial, setHistorial] = useState([]);

    const user_id = localStorage.getItem('user_id');
    const token = localStorage.getItem("token");
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/history/" + user_id+ "/" , {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            const historialArray = Object.values(res.data);
            console.log(historialArray);
            const historialFiltrado = historialArray.filter((dato) =>dato != null);

            setHistorial(historialFiltrado.reverse());
            
        })
        .catch(error => {
            console.log(error);
        });
      }, []);
     
  return (
    <div className='contenedor'>
        <div className="container-enunciados">
                <div className="toggle-button">
                  <motion.button
                    className={selectedButton === 'Historial' ? 'Historial active' : 'Historial'}
                    onClick={() => handleButtonClick('Historial')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    Historial
                  </motion.button>
                  <motion.button
                    className={selectedButton === 'Estadísticas' ? 'Estadísticas active' : 'Estadísticas'}
                    onClick={() => handleButtonClick('Estadísticas')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    Estadísticas
                  </motion.button>
                  <motion.div
                    className="indicator"
                    layoutId="indicator"
                    initial={false}
                    animate={{ x: selectedButton === 'Historial' ? 0 : '50%' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </div>
        </div>
        {selectedButton === 'Historial' && ( 
            <Historial 
                        items= {historial}>
            </Historial>
        )}   
        {selectedButton === 'Estadísticas' && ( 
            <Estadisticas/>
        )}    
    </div>
  )
}

export default PaginacionHistorial