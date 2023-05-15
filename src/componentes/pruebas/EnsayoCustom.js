import FormContext from '../FormContext';
import React,{useState} from 'react';
import Ensayo from './Ensayo';
import axios from 'axios';
import { useEffect } from 'react';
function EnsayoCustom() {
    const Apiurl = `http://127.0.0.1:8000/questions_alternative/?subject=`;
    const [ensayoSelected, setensayoSelected] = useState(JSON.parse(localStorage.getItem('formData')).ensayoSelected);
    const [post, setPost] = React.useState([]);
    const [nombreEnsayo] = React.useState("ninguno");
    const [iniciar, setIniciar] = React.useState(false);
    
    function llamadoApi() {

        const ensayosSeleccionados = [];
        const promesas = [];
        let checkBoxSeleccionados = 0;
        
    
        
          // recorremos el ensayoSelected
          for (let i in ensayoSelected) {
            // revisamos si el checkbox es true, con esto sabemos cual fue marcada y cual no.
            if (ensayoSelected[i].checked === true) {
              // inicializamos la la url agregando name al final que sera (numeros,geometria...)
                const ensayoUrl = `${Apiurl}${ensayoSelected[i].name}`;
                checkBoxSeleccionados++; 
              // almacenamos las promesas en un arreglo, el cual son los datos de la api, aun no cargados.
              //las promesas pueden tener tres estados: pendiente (pending), resuelta (fulfilled) y rechazada (rejected).
              promesas.push(axios.get(ensayoUrl));
            }
          }
    
          // si al menos tenemos un checkbox seleccionado que rellene el post y mande la informacion al ensayo.
          if(checkBoxSeleccionados > 0){
                // esperamos a que todas las promesas se resuelvan y concatenamos los datos, para asi poder concadenar
                Promise.all(promesas)
                    .then((responses) => {
                    for (let i = 0; i < responses.length; i++) {
                        // agregamos toda la informacion de la api.
                        ensayosSeleccionados.push(responses[i].data);
                    }
                    // concatenamos todos los datos del arreglo para que quede como 1 arreglo.
                    setPost([].concat(...ensayosSeleccionados)); 
                    setIniciar(true);
                   
    
                    // const Toast = Swal.mixin({
                    //     toast: true,
                    //     // position: 'top-end',
                    //     showConfirmButton: false,
                    //     timer: 2000,
                    //     timerProgressBar: true,
                    //     didOpen: (toast) => {
                    //       toast.addEventListener('mouseenter', Swal.stopTimer)
                    //       toast.addEventListener('mouseleave', Swal.resumeTimer)
                    //     }
                    //   })
                      
                    //   Toast.fire({
                    //     icon: 'success',
                    //     title: 'Ensayo creado correctamente!'
                    //   })
    
                    
                        
                        
                    })
                    .catch((error) => {
                    console.log(error);
                 
                    });
            }      
      }
      function filtrarArray(array){
        const subjects = {}; // Objeto para contar las ocurrencias de cada tema
        const arrayFiltrada = []; // Array para almacenar los objetos filtrados
        const formData = JSON.parse(localStorage.getItem('formData'));
        const cantidadPreguntas = parseInt(formData.cantidadPreguntas);
        
        const cantidadSubject = Math.round(cantidadPreguntas / Object.keys(ensayoSelected).length);
        console.log(Object.keys(ensayoSelected).length);
        array.forEach(item => {
          const { subject } = item;
          subjects[subject] = (subjects[subject] || 0) + 1; // Incrementar el contador para el tema actual
          if (subjects[subject] <= cantidadSubject) {
            arrayFiltrada.push(item); // Agregar el objeto al array filtrado
          }
        });

        console.log(arrayFiltrada);
        return shuffleArray(arrayFiltrada)
      }
      function shuffleArray(array) {
        
        
          const newArray = [...array];
          newArray.sort(() => Math.random() - 0.5);
          
          return newArray;
      }  
      for (let i = 0; i < post.length; i++) {
        post[i].answer = shuffleArray(post[i].answer);
      }
      useEffect(() => {
        llamadoApi();
      },[])
    return(
        <div>
        {iniciar && (
          <Ensayo
          ensayo={filtrarArray(post)}
          urlEnsayo="CrearEnsayo"
          titleEnsayo={nombreEnsayo}
          paragraphEnsayo="Matemática(M1)"
          colorEnsayo="heroGeometria"
        />
        )}
        
      </div>
    );
}
export default EnsayoCustom;