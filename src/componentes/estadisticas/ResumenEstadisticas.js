import { useEffect, useState } from 'react';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import '../../hojas-de-estilo/estadisticas.css';
import DashboardCard from './Dashboard';

export default function ResumenEstadisticas() {
    const [items, setHistorial] = useState([]);
    const [flag, setFlag] = useState(false)

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
            
            const historialFiltrado = historialArray.filter((dato) =>dato != null);
            setHistorial(historialFiltrado.reverse());
         
            setFlag(true)
            console.log(items);

        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    // Calcula el promedio de los puntajes
    const promedio = items.reduce((total, item, index, array) => {
        total += item.puntaje;
        if( index === array.length-1) { 
            return total/array.length;
        }else { 
            return total;
        }
    }, 0);

    // Encuentra el ensayo con mayor puntaje
    const maxPuntaje = items.reduce((max, item) => item.puntaje > max.puntaje ? item : max, items[0]);

    if (!flag) return null;

    
        return (
            <div className="container">
                <div className="row mt-4 mb-5">
                    <DashboardCard 
                        title="Ensayo más reciente"
                        name={items[0].name}
                        score={items[0].puntaje}
                        date={items[0].date}
                    />
                    <DashboardCard 
                        title="Promedio de puntajes"
                        score={promedio}
                    />
                    <DashboardCard 
                        title="Puntaje Máximo"
                        name={maxPuntaje.name}
                        score={maxPuntaje.puntaje}
                        date={maxPuntaje.date}
                    />
                </div>
            </div>
        );

    
   
}