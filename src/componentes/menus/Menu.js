import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "universal-cookie";
import mate from "../../images/matematicas.png";
import numeros from "../../images/numeros.png";
import Navbar from "../navbar/Navbar";
import NombreEnsayo from "./NombreEnsayo";
import logo from "../../images/logo5.png";
import algebra from "../../images/algebra.png";
import geometria from "../../images/geometria.png";
import probabilidad from "../../images/probabilidad.png";
import FuncionUsuario from "../FuncionUsuario";
import crearEnsayo from "../../images/crearensayo.png";
import historial from "../../images/historial.png";
import "../../hojas-de-estilo/menu.css";
import { useState } from "react";
import Joyride from "react-joyride";
import Pikachu from "../../images/pikachu.png"
import MathGame from "../MathGame";
import { Modal, Button } from "react-bootstrap";
import CrearEnsayo from "./CrearEnsayo";
import { motion, AnimatePresence } from "framer-motion"
import puntajes from "../../helper/puntajes";
import Historial from "../historial/Historial";
import PaginacionHistorial from "../historial/PaginacionHistorial";
import Estadisticas from "../estadisticas/Estadisticas";



const cookies = new Cookies();
const url = window.location.pathname; // Obtiene la parte de la URL que sigue después del nombre del servidor y el puerto
const pruebaName = url.split("/").pop(); // Obtiene la última parte de la URL después de la barra ("/")
if (pruebaName === "Menu") localStorage.setItem("ensayoActivo", "ninguno");


function Menu() {
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const [showModal, setShowModal] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [showPuntaje, setShowPuntaje] = useState(false);
  const [showCrearEnsayo, setShowCrearEnsayo] = useState(false);
  const [selectedButton, setSelectedButton] = useState('predeterminados');
  const [showEnsayos, setShowEnsayos] = useState(true);
  const [showhistorial, setShowHistorial] = useState(false);

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  }
 

  const [tourSteps, setTourSteps] = useState([
    {
      target: ".sidebar ul li:nth-of-type(1)",
      content: "Creación de un ensayo personalizado, tú eliges como quieres practicar",
      placement: "right",
      offset: [0, 10],
      disableBeacon: true,
    },
    {
      target: ".sidebar ul li:nth-of-type(2)",
      content: "Historial de ensayos realizados",
      placement: "right",
      offset: [0, 10],
      disableBeacon: true,
    },
    
   
    {
      target: ".categories .card:nth-of-type(1)",
      content: "haz clic en Iniciar para emepezar un ensayo",
      disableBeacon: true,
      placement: "right",
      offset: [0, 10],
    },
    {
      target: ".content-logo",
      content: (
        <div>
          
          <h4>Así de fácil es usar <br/>PRE-PAES </h4>
          <img className="pikachu" src={Pikachu} alt="Descripción de la imagen" />
        </div>
      ),
      disableBeacon: true,
      placement: "right",
      offset: [0, 10],
    },
    
  
  ]);
  const handleSidebar = (option) => {
    if(option === "ensayos"){
      setShowEnsayos(true);
      setShowCrearEnsayo(false);
      setShowHistorial(false);
    
    }else if(option === "crearEnsayos"){
      setShowCrearEnsayo(true);
      setShowEnsayos(false);
      setShowHistorial(false);
  
    }
    else if(option === "historial"){
      setShowHistorial(true);
      setShowCrearEnsayo(false);
      setShowEnsayos(false);
  
    }

  };
  const handleGame = () => {
   
    setShowGame(true);
  
    // aquí puedes agregar la lógica para inicializar el juego
  };
  const [runTour, setRunTour] = useState(false);

  const handleJoyrideCallback = (data) => {
    const { action, index, type } = data;

    if (type === "tour:end") {
      setRunTour(false);
    }
  };

  const startTour = () => {
    setRunTour(true);
  };
  const [universidad, setUniversidad] = useState("Universidad de Chile");
  const [programa, setPrograma] = useState("");
  const [puntaje, setPuntaje] = useState("");

  const handleUniversidadChange = (event) => {
    setUniversidad(event.target.value);
    setPrograma("");
    setPuntaje("");
  };

  const handleProgramaChange = (event) => {
    setPrograma(event.target.value);
    const programaSeleccionado = puntajes[universidad].find((p) => p.programa === event.target.value);
    setPuntaje(programaSeleccionado.puntaje);
  };
  return (
    <div>
    
    <Navbar />
    
      <main>
   
      
 
      <Joyride
        steps={tourSteps}
        run={runTour}
        callback={handleJoyrideCallback}
        disableScrollParentFix={false}
        disableOverlayClose={true}
        disableCloseOnEsc={true}
        scrollDuration= {1000000000}
        locale={{ close: 'Next' }}
        styles={{
          options: {
            arrowColor: '#fff',
            backgroundColor: '#fff',
            beaconSize: 36,
            overlayColor: 'rgba(0, 0, 0, 0.5)',
            primaryColor: '#333',
            spotlightShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
            textColor: '#333',
            zIndex: 10000,
            
          },
        }}
      />
      <div className="mainMenu">
        {showGame &&(
          <MathGame/>
        )}
        {!showGame && (
          
          <section className="section-menu">
          
          <div className="sidebar " >
            <div className="content-logo">
              <img className="logo" src={logo} alt="" />
            </div>
          
            
            <ul>
            <motion.li whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.15 }}><a className={showEnsayos ? "active": ""} href="#" onClick={() =>handleSidebar("ensayos")  } >Ensayos</a></motion.li>
              <motion.li whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.15 }}><a className={showCrearEnsayo ? "active": ""} href="#" onClick={() =>handleSidebar("crearEnsayos")  } >Crear ensayo</a></motion.li>
              <motion.li whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.15 }}><a className={showhistorial ? "active": ""} href="#" onClick={() =>handleSidebar("historial")  }>Historial</a></motion.li>
              <motion.li whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.15 }}><a href="#" onClick={startTour}>¿Cómo usar PRE-PAES?</a></motion.li>
              <motion.li whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.15 }}><a className={showPuntaje ? "active": ""}  href="#" onClick={()=>setShowPuntaje(!showPuntaje)}>Puntajes de corte 2023</a></motion.li>
            
            
            </ul>
            
            <AnimatePresence>
              {showPuntaje &&(
                <motion.div className="container-universidades"
                initial={{ translateY: -100, opacity: 0 }}
                animate={{ translateY: 0, opacity:1}}
                exit={{  opacity: 0 }}
                transition={{ duration: 0.18 }}
                >
                  <label htmlFor="universidad">Universidad:</label>
                  <select id="universidad" value={universidad} onChange={handleUniversidadChange} style={{width: "100%"}}>
                    <option value="Universidad de Chile">Universidad de Chile</option>
                    <option value="Pontificia Universidad Católica de Chile">Pontificia Universidad Católica de Chile</option>
                    <option value="Universidad de Valparaíso">Universidad de Valparaíso</option>
                    {/* Agregar más opciones de universidades */}
                  </select>
            
                  <br />
            
                  <label htmlFor="programa">Carrera:</label>
                  <select id="programa" value={programa} onChange={handleProgramaChange} style={{width: "100%"}}>
                    <option value="">Seleccione una carrera</option>
                    {puntajes[universidad].map((p) => (
                      <option key={p.programa} value={p.programa}>{p.programa}</option>
                    ))}
                  </select>
            
                  <br />
            
                  <label htmlFor="puntaje">Puntaje de corte 2023:</label>
                  <input id="puntaje" type="text" value={puntaje} readOnly style={{textAlign: "center"}}/>
                </motion.div>
            
              )}
            </AnimatePresence>
            
            
            </div>
            {showCrearEnsayo && (          
                <div className="content" >
                  <div className="ml-3">
                    <h2  style={{color:"#4e5457", fontWeight:"bold", marginLeft:"2rem"}}>Crear Ensayo</h2>
                  </div>
                  <CrearEnsayo/>
                </div>
            
         
            )} 
            {showhistorial && (
           
                
                <div className="content" >
                       
                  <PaginacionHistorial/>
                </div>
       
    
            )}  
            {!showCrearEnsayo && !showhistorial  &&  (
              
              <div className="content">
              
             
              <div className="container-enunciados">
                <div className="toggle-button">
                  <motion.button
                    className={selectedButton === 'predeterminados' ? 'predeterminados active' : 'predeterminados'}
                    onClick={() => handleButtonClick('predeterminados')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    Ensayos Predeterminados
                  </motion.button>
                  <motion.button
                    className={selectedButton === 'personalizados' ? 'personalizados active' : 'personalizados'}
                    onClick={() => handleButtonClick('personalizados')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    Ensayos Personalizados
                  </motion.button>
                  <motion.div
                    className="indicator"
                    layoutId="indicator"
                    initial={false}
                    animate={{ x: selectedButton === 'predeterminados' ? 0 : '50%' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </div>
              </div>
  
              {selectedButton === 'predeterminados' && (    
              <div className="container-ensayos">
                
                <NombreEnsayo
                  temario="Eje general"
                  imagen={numeros}
                  urlEnsayo="Pregunta"
                  score="scoreGeneral"
                  puntosTotal="5"
                  contentBody = {(
                    <div>
                      <h3>Ensayo General</h3>
                      <ul>
                        <li> Tendrá a su disposición 20 minutos para contestar el ensayo, podrá navegar entre preguntas y/o omitirlas.</li>
                        <li> Esta prueba evalúa las habilidades referidas a las Bases Curriculares que son: Resolver problemas, Modelar, Representar y Argumentar </li>
      
                      </ul>
                      
                   
      
       
       
                    </div>
                  )}
                />
                   
                <NombreEnsayo
                  temario="Números"
                  imagen={numeros}
                  urlEnsayo="PruebaNumeros"
                  score="scoreNumeros"
                  puntosTotal="10"
                  contentTitulo="Ensayo Numeros"
                  contentBody="Tendrá a su disposición 20 minutos para contestar el ensayo, podrá navegar entre preguntas y/o omitirlas."
                  idEnsayo= {2}
                />
      
                <NombreEnsayo
                  temario="Álgebra y Funciones"
                  imagen={algebra}
                  urlEnsayo="PruebaAlgebra"
                  score="error"
                  puntosTotal="5"
                  contentBody = {(
                    <div>
                      <h3>Ensayo Álgebra y Funciones</h3>
                      <ul>
                        <li> Tendrá a su disposición 20 minutos para contestar el ensayo, podrá navegar entre preguntas y/o omitirlas.</li>
                      
      
                      </ul>
                      
      
       
       
                    </div>
                  )}
                  idEnsayo= {1}
                />
      
                <NombreEnsayo
                  temario="Geometría"
                  imagen={geometria}
                  urlEnsayo="PruebaGeometria"
                  score="error"
                  puntosTotal="10"
                  contentBody = {(
                    <div>
                      <h3>Ensayo Geometría</h3>
                      <ul>
                        <li> Tendrá a su disposición 20 minutos para contestar el ensayo, podrá navegar entre preguntas y/o omitirlas.</li>
                      </ul>
                    </div>
                  )}
                  idEnsayo= {4}
                />
                
      
                <NombreEnsayo
                  temario="Probabilidad y Estadística"
                  imagen={probabilidad}
                  urlEnsayo="PruebaProbabilidades"
                  score="error"
                  puntosTotal="5"
                  idEnsayo= {3}
                  
                />
                
                <div className="cardGame p-3 mb-2" onClick={handleGame}> </div> 
              </div>
              )}
              {selectedButton === 'personalizados' && (
            <div className="container-ensayos" style={{textAlign: "center"}}>
              <h3>Acá verás tus ensayos personalizados una vez creados</h3>
            </div>  
          )}
              </div>
            )}
            
            </section>
        
        
        )}
        
        </div>
        
        
     
      </main>
    </div>
  );
}

export default Menu;
