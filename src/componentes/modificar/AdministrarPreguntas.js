import React from 'react'
import { useState, useEffect } from 'react'
import AñadirPreguntas from './AñadirPreguntas';
import ModificarEnsayo from './ModificarEnsayo';
import { motion } from "framer-motion"

const AdministrarPreguntas = () => {
    const [selectedButton, setSelectedButton] = useState('modificar');
    const handleButtonClick = (button) => {
        setSelectedButton(button);
    }

    return(
        <div className='contenedor'>
            <div className="container-enunciados">
                <div className="toggle-button">
                  <motion.button
                    className={selectedButton === 'modificar' ? 'modificar active' : 'modificar'}
                    onClick={() => handleButtonClick('modificar')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    Modificar Preguntas
                  </motion.button>
                  <motion.button
                    className={selectedButton === 'añadir' ? 'añadir active' : 'añadir'}
                    onClick={() => handleButtonClick('añadir')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    Añadir Preguntas
                  </motion.button>
                  <motion.div
                    className="indicator"
                    layoutId="indicator"
                    initial={false}
                    animate={{ x: selectedButton === 'modificar' ? 0 : '50%' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </div>
            </div>
            {selectedButton === 'modificar' && ( 
                <ModificarEnsayo/>
            )}   
            {selectedButton === 'añadir' && ( 
                <AñadirPreguntas/>
            )}    
        </div>
        
        
    );
}
export default AdministrarPreguntas;