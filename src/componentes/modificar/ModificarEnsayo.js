import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import NavbarAdmin from '../navbar/NavbarAdmin';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import replace from 'react-string-replace'; // Importa la biblioteca react-string-replace
import { InlineMath } from "react-katex";
import { Apiurl } from '../../Services/apirest';

const ApiUrl =  Apiurl + "questions_alternativeSpecific/";

const cookies = new Cookies();

const ModificarEnsayo = () => {
  const [form, setForm] = useState({  
    "id": "",
    "question": "",
    "link_resolution": ""
  });
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [questions, setQuestions] = useState([]);
  const [status, setStatus] = useState(false);
  const [alternatives, setAlternatives] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [search , setSearch] = React.useState('');
  const [paginaActual, setPaginaActual] = React.useState(0);
  const itemsPorPagina = 4;
  const [selectFiltro, setSelectFiltro] = React.useState('4');
  const [filtrarPor, setFiltrarPor] = React.useState(true);
  const [focusFiltrar, setFocusFiltrar] = React.useState(false)
  const ecuacionRegex = /\[(.*?)\]/g; // Expresión regular para detectar partes de la cadena que contienen ecuaciones
  const manejadorSubmit = (e) => {
    e.preventDefault();
  };

  const manejadorChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  
  const manejadorBoton = () => {
    const url = Apiurl + "questions/" + form.id + "/";
    axios.put(url, form)
      .then(response => {
        console.log(response.data);
        setError(true);
        setErrorMsg("Cambio exitoso!");
        cargarListado(); // Llama a cargarListado para actualizar la tabla
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    const urlAll = Apiurl + "questions/list/all/";
    axios.get(urlAll)
      .then(response => {
        setQuestions(response.data);
        setStatus(true);
        setError(false);
        console.log(questions)
      });
  }, [status]);

  const handleClick = (id, question, link_resolution) => {
    setForm({
      id: id,
      question: question,
      link_resolution: link_resolution 
    });
 
  };

  const handleViewAlternatives = (id) => {
    const url = ApiUrl + `${id}/`;
    axios.get(url)
      .then(response => {
        setAlternatives(response.data.answer);
        setShowPopup(true);
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  //guardamos el valor del search que pone el usuario.
  const onSearchChange = ({ target }) => {
    setSearch(target.value);
    //cada vez que haya una busqueda se ira automaticamente a la primera pagina.
    setPaginaActual(0);
  };
  const cargarListado = async () => {
    try {
      const urlAll = Apiurl + "questions/list/all/";
      const response = await axios.get(urlAll);
      setQuestions(response.data);
    
      setStatus(true);
      setError(true);
      setErrorMsg("Cambio exitoso!");
      setTimeout(() => {
        setError(false);
        setErrorMsg("");
      }, 2000); // Desaparecer el mensaje después de 2 segundos
      
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const cargarListadoAlternative = async (id) => {
    try {
      const url = ApiUrl + `${id}/`;
      axios.get(url)
        .then(response => {
          setAlternatives(response.data.answer);
          setShowPopup(true);
         
        })
        .catch(error => {
          console.log(error.response.data);
        });
      
      
    } catch (error) {
      console.log(error.response.data);
    }
    setErrorMsg("Cambio exitoso!");
      setTimeout(() => {
        setError(false);
        setErrorMsg("");
      }, 2000); // Desaparecer el mensaje después de 2 segundos
  };
  
  const [selectedAlternative, setSelectedAlternative] = useState(null);

const handleSelectAlternative = (alternative) => {
  setSelectedAlternative(alternative);
  setForm({
    ...form,
    label: alternative.label,
    right: alternative.right ,
  });
};
const FiltroSelect = (ensayo) =>{

        return ensayo
    }
const BusquedaNombre = () =>{
    // si no han ingresado una busqueda, enviamos la lista completa.
    if( !search)
    {   
        const datosHistorial = questions;
        const indexInicio = paginaActual * itemsPorPagina
      
        return datosHistorial.slice(indexInicio, indexInicio + itemsPorPagina)
    }
        // creamos una variable y pasamos la busqueda a minusculas
    

        const filtrado = questions.filter((ensayo) =>
            ensayo.id.toString().includes(search)
        );
        
    
        // setBusquedaVacia(false);
        if(selectFiltro){
            FiltroSelect(filtrado);
        }
        const indexInicio = paginaActual * itemsPorPagina;
        const itemsPagina = filtrado.slice(indexInicio, indexInicio + itemsPorPagina);

        return itemsPagina;
}

const handleUpdateAlternative = () => {
  if (selectedAlternative) {
    const alternativeForm = {
      id: selectedAlternative.id,
      label: form.label,
      right: form.right,
    };
    const url = `${Apiurl}answers/${alternativeForm.id}/`;
    axios
      .put(url, alternativeForm)
      .then((response) => {
        console.log(response.data);
        // Realizar las acciones necesarias después de actualizar la alternativa
      })
      .catch((error) => {
        console.log(error.response.data);
      });
      cargarListadoAlternative(form.id)
  }
  cargarListadoAlternative(form.id)
};
    // guardamos valor del filtro select.
    const onSelectChange = ({target}) =>{
        setSelectFiltro(target.value);
        if(target.value !=''){
            setFiltrarPor(false)
        }else{
            setFiltrarPor(true)
        }
    }
    const largoBusqueda = () =>{
        if(!search) return questions.length
        
     
        const filtrado = questions.filter(ensayo => ensayo.id)
        return filtrado.length;
    }
    const handleFocus = () =>{
        setFocusFiltrar(true)
    }

    //funcion para avanzar de pagina.
    const nextPage = () => {
        const totalPaginas = largoBusqueda();
        if ((paginaActual + 1) * itemsPorPagina < totalPaginas) {
            setPaginaActual(paginaActual + 1);
        }
      }
    
    // funcion para retroceder de pagina.
    const previousPage = () => {
        if (paginaActual > 0) {
            setPaginaActual(paginaActual - 1);
        }
      }



  return (
    <React.Fragment>
      <div className='contenedorPrincipal'>
        <div className='container'>
        
          
          <div className='mt-3'>
          <div className='busqueda'>
                        <input 
                            className="form-control busqueda me-2" 
                            type="search" placeholder="Buscar Pregunta" 
                            aria-label="Search"
                            onChange={onSearchChange}
                        >
                        </input> 
                            { BusquedaNombre().length === 0 && questions.length > 0 &&(
                            <p className="invalid-feedback d-block fallida">
                              No se encontro ningun resultado!
                              </p>)}
                    </div>
            <table className="table " style={{ backgroundColor: "white" }}>
              <thead className="thead-dark">
                <tr>
                  <th>Id</th>
                  <th>Temario</th>
                  <th>Enunciado</th>
                  <th>Video</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {status === true && (
                  BusquedaNombre().map((question, i) => (
                    <tr key={i} onClick={() => handleClick(question.id, question.question, question.link_resolution)}>
                      <td>{question.id}</td>
                      <td>{question.subject}</td>
                     
                      <td>
                      {replace((question.question).replace('Â', ''), ecuacionRegex, (match, i) => {
         return <InlineMath key={i} math={match} />;
      })}
                   
                      </td>
                      <td>
                        <a href={question.link_resolution} target="_blank" rel="noopener noreferrer">
                            URL
                        </a>
                    </td>
                      <td>
                        <button type="button" className="btn btn-warning btn-sm" style={{fontWeight:"bold", color:"white"}} onClick={() => handleViewAlternatives(question.id)}>Alternativas</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <div className='Botones'>
                    <ul className="pagination">
                        <li onClick={previousPage} className="page-item"><a className="page-link" href="#">Retroceder</a></li>
                        <li className="page-item"><a className="page-link" href="#">{paginaActual + 1}</a></li>
                        <li onClick={nextPage} className="page-item"><a className="page-link" href="#">Avanzar</a></li>
                    </ul>
                </div>  
          </div>
          <form className="form-horizontal" action="/action_page.php" onSubmit={manejadorSubmit}>
            <div className="form-group">
              <label className="control-label col-sm-2" htmlFor="email">ID de la Pregunta:</label>
              <div className="col-sm-10">
                <input type="search" name="id" className="form-control busqueda " id="email" onChange={manejadorChange} value={form.id} placeholder="Inserte ID" />
              </div>
            </div>

            <div className="form-group mt-3">
              <label className="control-label " htmlFor="pwd">Enunciado de la Pregunta:</label>
              <div className="col-sm-10">
                <textarea name="question" className="form-control" id="pwd" onChange={manejadorChange} value={form.question} placeholder="Inserte Enunciado" />
              </div>
            </div>
            <div className="form-group mt-3">
              <label className="control-label " htmlFor="link_resolution">Enlace de video:</label>
              <div className="col-sm-10">
                <input type='search' name="link_resolution" className="form-control" id="link_resolution" onChange={manejadorChange} value={form.link_resolution} placeholder="Inserte Enunciado" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button type="button" className="btn btn-dark mt-2" onClick={manejadorBoton}>Modificar</button>
                {error === true && (
                  <div className="alert alert-success mt-3" role="alert">
                    {errorMsg}
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      
      {showPopup && (
        <div className="popup">
        <div className="popup-content">
          <h2>Alternativas</h2>
    
        <table className="table" style={{ backgroundColor: "white", width: "80%" }}>
          <thead className="thead-dark">
            <tr>
              <th>Id Alternativa</th>
              <th>Etiqueta</th>
              <th>Correcta</th>
            </tr>
          </thead>
          <tbody>
            {alternatives.map((alternative, i) => (
              <tr
                key={i}
                onClick={() => handleSelectAlternative(alternative)}
                className={alternative === selectedAlternative ? "selected" : ""}
              >
                <td>{alternative.id}</td>
                <td>
                  {replace((alternative.label).replace('Â', ''), ecuacionRegex, (match, i) => {
                    return <InlineMath key={i} math={match} />;
                  })}
                </td>
                <td className={alternative.right ? "true" : "false"}>{alternative.right ? "Verdadera" : "Falsa"}</td>

              </tr>
            ))}
          </tbody>
        </table>
     
        
       
          <div className="alternative-form">
          
            <label htmlFor="label">Etiqueta:</label>
            <textarea
              id="label"
              value={form.label}
              onChange={(e) => setForm({ ...form, label: e.target.value })}
            />

            <label htmlFor="right">Correcta:</label>
            <select
              className='form-select'
              id="right"
              value={form.right}
              onChange={(e) => setForm({ ...form, right: e.target.value })}
            >
              <option value="1">Verdadera</option>
              <option value="0">Falsa</option>
            </select>

            <div className="button-container">
              <button
                type="button"
                className="btn btn-warning"
                onClick={handleUpdateAlternative}
              >
                Modificar
              </button>

              <button
                type="button"
                className="btn btn-dark"
                onClick={handleClosePopup}
              >
                Cerrar
              </button>
            </div>
          </div>
     
    </div>
    
  </div>
)}

    </React.Fragment>
  );
};

export default ModificarEnsayo;