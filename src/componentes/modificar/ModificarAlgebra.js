import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import NavbarAdmin from '../navbar/NavbarAdmin';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import replace from 'react-string-replace'; // Importa la biblioteca react-string-replace
import { InlineMath } from "react-katex";

const Apiurl = "http://127.0.0.1:8000/questions/";
const Apiurl2 = "http://127.0.0.1:8000/";
const cookies = new Cookies();

const ModificarAlgebra = () => {
  const [form, setForm] = useState({  
    "id": "",
    "question": ""
  });
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [questions, setQuestions] = useState([]);
  const [status, setStatus] = useState(false);
  const [alternatives, setAlternatives] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
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
    const url = Apiurl + form.id + "/";
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
    const urlAll = Apiurl + "list/all/?subject=Algebra";
    axios.get(urlAll)
      .then(response => {
        setQuestions(response.data);
        setStatus(true);
        setError(false);
      });
  }, [status]);

  const handleClick = (id, question) => {
    setForm({
      id: id,
      question: question
    });
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
  };

  const handleViewAlternatives = (id) => {
    const url = Apiurl + `${id}/answers/`;
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

  const cargarListado = async () => {
    try {
      const urlAll = Apiurl + "list/all/?subject=Algebra";
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
      const url = Apiurl + `${id}/answers/`;
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

const handleUpdateAlternative = () => {
  if (selectedAlternative) {
    const alternativeForm = {
      id: selectedAlternative.id,
      label: form.label,
      right: form.right,
    };
    const url = `${Apiurl2}answers/${alternativeForm.id}/`;
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


  return (
    <React.Fragment>
      <div>
        <NavbarAdmin />
        <div className='container'>
          <h2 className='mt-3'>Modificar pregunta de Álgebra y Funciones </h2>
          <form className="form-horizontal" action="/action_page.php" onSubmit={manejadorSubmit}>
            <div className="form-group">
              <label className="control-label col-sm-2" htmlFor="email">ID de la Pregunta:</label>
              <div className="col-sm-10">
                <input type="text" name="id" className="form-control" id="email" onChange={manejadorChange} value={form.id} placeholder="Inserte ID" />
              </div>
            </div>

            <div className="form-group mt-3">
              <label className="control-label col-sm-2" htmlFor="pwd">Enunciado de la Pregunta</label>
              <div className="col-sm-10">
                <textarea name="question" className="form-control" id="pwd" onChange={manejadorChange} value={form.question} placeholder="Inserte Enunciado" />
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
          <div className='mt-3'>
            <h1>Álgebra y Funciones</h1>
            <table className="table " style={{ backgroundColor: "white" }}>
              <thead className="thead-dark">
                <tr>
                  <th>Id Pregunta</th>
                  <th>Temario</th>
                  <th>Enunciado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {status === true && (
                  questions.map((question, i) => (
                    <tr key={i} onClick={() => handleClick(question.id, question.question)}>
                      <td>{question.id}</td>
                      <td>{question.subject}</td>
                      <td>
                      {replace((question.question).replace('Â', ''), ecuacionRegex, (match, i) => {
         return <InlineMath key={i} math={match} />;
      })}
                   
                      </td>
                      <td>
                        <button type="button" className="btn btn-warning btn-sm" onClick={() => handleViewAlternatives(question.id)}>Ver Alternativas</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
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
              <td>{alternative.right}</td>
            </tr>
          ))}
        </tbody>
      </table>
     
        
      {selectedAlternative && (
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
      )}
    </div>
  </div>
)}

    </React.Fragment>
  );
};

export default ModificarAlgebra;