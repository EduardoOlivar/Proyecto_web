import FormContext from '../FormContext';
import React,{useState} from 'react';
import Ensayo from './Ensayo';
import axios from 'axios';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import {Apiurl} from '../../Services/apirest'
function EnsayoCustom() {


    const urlPost= Apiurl +`custom_essays/`;
    const ApiUrl = Apiurl +`questions_alternative/?subject=`;
    const [ensayoSelected, setensayoSelected] = useState(JSON.parse(localStorage.getItem('formData')).ensayoSelected);
    const [current_questions] = useState(JSON.parse(localStorage.getItem('formData')).cantidadPreguntas);
    const [post, setPost] = React.useState([]);
    const [nombreEnsayo] = React.useState("Ensayo Personalizado");
    const [iniciar, setIniciar] = React.useState(false);
    const [ensayosArray, setEnsayosArray] = React.useState([])


    function llamadoApi() {

        const ensayosSeleccionados = [];
        const promesas = [];
        let checkBoxSeleccionados = 0;
        
          // recorremos el ensayoSelected
          for (let i in ensayoSelected) {
            // revisamos si el checkbox es true, con esto sabemos cual fue marcada y cual no.
            if (ensayoSelected[i].checked === true) {
              // inicializamos la la url agregando name al final que sera (numeros,geometria...)
                const ensayoUrl = `${ApiUrl}${ensayoSelected[i].name}`;
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
                    })
                    .catch((error) => {
                    console.log(error);
                 
                    });
            }      
      }
      function filtrarArray(array){
        const subjects = {}; // Objeto para contar las ocurrencias de cada tema
        let arrayFiltrada = []; // Array para almacenar los objetos filtrados
        const formData = JSON.parse(localStorage.getItem('formData'));
        const cantidadPreguntas = parseInt(formData.cantidadPreguntas);
        let ensayosSeleccionados = 0;
        for(let i in ensayoSelected){
          if(ensayoSelected[i].checked === true){
            ensayosSeleccionados++;
          }
        }

        const cantidadSubject = Math.round(cantidadPreguntas / ensayosSeleccionados);

        array.forEach(item => {
            const { subject } = item;
            subjects[subject] = (subjects[subject] || 0) + 1;// Incrementar el contador para el tema actual
            if (subjects[subject] <= cantidadSubject) {
              arrayFiltrada.push(item); // Agregar el objeto al array filtrado
            } 
        });

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
      //setiamos los id de los ensayos
      useEffect(() => {
        const updatedEnsayosArray = [];
        for (let i in ensayoSelected) {
          if(ensayoSelected[i].checked === true)
          updatedEnsayosArray.push(ensayoSelected[i].id);
        }
        setEnsayosArray(updatedEnsayosArray);
      }, [ensayoSelected]);
      // enviamos los datos al backend
      useEffect(() => {
        
        if (ensayosArray.length > 0) {

          llamadoApi()
          const essayId = parseInt(localStorage.getItem("user_id"));
          axios.post(urlPost, {
            is_custom: true,
            user: essayId,
            name: nombreEnsayo,
            essay_ids: ensayosArray,
            current_questions : current_questions
          }) .then(response => {
              localStorage.setItem('new_id', response.data.id);
          }).catch(error => {
            console.log(error)
          });
        }
      }, [ensayosArray]);
  
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