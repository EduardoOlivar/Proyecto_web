import React from 'react';
import LinesChart from './LinesChart';
 
function Estadisticas(){

    return(
        <div className='contenedorPrincipal'>
            <div className='contenedorEstadisticas'>
                <LinesChart/>
            </div>
        </div>
    );

};
export default Estadisticas;