import React from 'react';
import LinesChart from './LinesChart';
import GraficoBarras from './GraficoBarras';
import ResumenEstadisticas from './ResumenEstadisticas';
import { useState } from 'react';
 
function Estadisticas(){
    const [chartType, setChartType] = useState('ResumenEstadisticas');
    return (
        <div className='contenedorPrincipal'>
          <div className='contenedorEstadisticas '>
            
            <select className='form-select mb-3  ' value={chartType} onChange={(e) => setChartType(e.target.value)}>
              <option value="ResumenEstadisticas">Resumen de Estadísticas</option>
              <option value="LineChart">Puntaje evolutivo</option>
              <option value="GraficoBarras">Promedio de Puntajes</option>
              
            </select>
            {chartType === 'LineChart' ? <LinesChart /> : chartType === 'GraficoBarras' ? <GraficoBarras/>: <ResumenEstadisticas/>}
          </div>
        </div>
      );

};
export default Estadisticas;