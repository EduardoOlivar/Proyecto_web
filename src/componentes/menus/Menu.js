import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "universal-cookie";
import mate from "../../images/matematicas.png";
import numeros from "../../images/numeros.png";
import Navbar from "../navbar/Navbar";
import NombreEnsayo from "./NombreEnsayo";
import logo from "../../images/PRE-PAES-removebg-preview-removebg-preview (1).png";
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

const puntajes = {
  "Universidad de Chile": [
  { "programa": "Arquitectura", "puntaje": 728.30 },
  { "programa": "DISEÑO", "puntaje": 695.05 },
  { "programa": "GEOGRAFÍA", "puntaje": 608.10 },
  { "programa": "ACTUACIÓN TEATRAL", "puntaje": 718.98 },
  { "programa": "ARTES VISUALES", "puntaje": 701.90 },
  { "programa": "DANZA", "puntaje": 749.08 },
  { "programa": "DISEÑO TEATRAL", "puntaje": 627.95 },
  { "programa": "INGENIERÍA EN SONIDO", "puntaje": 782.10 },
  { "programa": "TEORÍA DE LA MÚSICA", "puntaje": 667.70 },
  { "programa": "TEORÍA E HISTORIA DEL ARTE", "puntaje": 612.70 },
  { "programa": "BIOLOGÍA CON MENCIÓN EN MEDIO AMBIENTE", "puntaje": 724.30 },
  { "programa": "INGENIERÍA EN BIOTECNOLOGÍA MOLECULAR", "puntaje": 831.60 },
  { "programa": "LIC. EN CIENCIAS MENCIÓN BIOLOGÍA", "puntaje": 713.15 },
  { "programa": "LIC. EN CIENCIAS MENCIÓN FÍSICA", "puntaje": 739.10 },
  { "programa": "LIC. EN CIENCIAS MENCIÓN MATEMÁTICAS", "puntaje": 617.30 },
  { "programa": "LIC. EN CIENCIAS MENCIÓN QUÍMICA", "puntaje": 488.10 },
  { "programa": "PEDAGOGÍA EN ED. MEDIA EN BIOLOGÍA Y QUÍMICA", "puntaje": 570.40 },
  { "programa": "PEDAGOGÍA EN ED. MEDIA EN MATEMÁTICAS Y FÍSICA", "puntaje": 524.90 },
  { "programa": "QUÍMICA AMBIENTAL", "puntaje": 539.65 },
  { "programa": "INGENIERÍA AGRONÓMICA", "puntaje": 603.45 },
  { "programa": "INGENIERÍA EN RECURSOS NATURALES RENOVABLES", "puntaje": 635.05 },
  { "programa": "INGENIERÍA Y CIENCIAS - PLAN COMÚN", "puntaje": 818.35 },
  { "programa": "INGENIERÍA EN RECURSOS HÍDRICOS", "puntaje": 523.60 },
  { "programa": "INGENIERÍA FORESTAL", "puntaje": 573.90 },
  { "programa": "BIOQUÍMICA", "puntaje": 778.80 },
  { "programa": "INGENIERÍA EN ALIMENTOS", "puntaje": 558.00 },
  { "programa": "QUÍMICA", "puntaje": 621.90 },
  { "programa": "QUÍMICA Y FARMACIA", "puntaje": 727.10 },
  { "programa": "ANTROPOLOGÍA-ARQUEOLOGÍA", "puntaje": 761.65 },
  { "programa": "PEDAGOGÍA EN EDUCACIÓN PARVULARIA", "puntaje": 648.85 },
  { "programa": "PSICOLOGÍA", "puntaje": 864.05 },
  { "programa": "SOCIOLOGÍA", "puntaje": 740.55 },
  { "programa": "TRABAJO SOCIAL", "puntaje": 711.40 },
  { "programa": "MEDICINA VETERINARIA", "puntaje": 725.30 },
  { "programa": "CINE Y TELEVISIÓN", "puntaje": 751.30 },
  { "programa": "PERIODISMO", "puntaje": 748.30 },
  { "programa": "DERECHO", "puntaje": 830.80 },
  { "programa": "CONTADOR AUDITOR", "puntaje": 703.65 },
  { "programa": "INGENIERÍA EN INFORMACIÓN Y CONTROL DE GESTIÓN", "puntaje": 700.90 },
  { "programa": "INGENIERÍA COMERCIAL", "puntaje": 777.95 },
  { "programa": "ESTUDIOS INTERNACIONALES", "puntaje": 822.60 },
  { "programa": "FILOSOFÍA", "puntaje": 523.40 },
  { "programa": "HISTORIA", "puntaje": 661.20 },
  { "programa": "LINGÜÍSTICA Y LITERATURA", "puntaje": 668.50 },
  { "programa": "LINGÜÍSTICA Y LITERATURA INGLESAS", "puntaje": 690.90 },
  { "programa": "PEDAGOGÍA EN EDUCACIÓN BÁSICA", "puntaje": 677.15 },
  { "programa": "ADMINISTRACIÓN PÚBLICA", "puntaje": 708.20 },
  { "programa": "CIENCIA POLÍTICA", "puntaje": 791.60 },
  { "programa": "ENFERMERÍA", "puntaje": 755.25 },
  { "programa": "FONOAUDIOLOGÍA", "puntaje": 599.35 },
  { "programa": "KINESIOLOGÍA", "puntaje": 743.30 },
  { "programa": "MEDICINA", "puntaje": 900.00 },
  { "programa": "NUTRICIÓN Y DIETÉTICA", "puntaje": 695.60 },
  { "programa": "OBSTETRICIA Y PUERICULTURA", "puntaje": 754.55 },
  { "programa": "TECNOLOGÍA MÉDICA", "puntaje": 767.60 },
  { "programa": "TERAPIA OCUPACIONAL", "puntaje": 660.60 },
  { "programa": "ODONTOLOGÍA", "puntaje": 772.40 },
  { "programa": "PROGRAMA ACADÉMICO DE BACHILLERATO", "puntaje": 741.05 }
  ],
  
  "Pontificia Universidad Católica de Chile": [
    { "programa": "Actuación", "puntaje": 802.79 },
    { "programa": "Administración Pública", "puntaje": 709.00 },
    { "programa": "Agronomía e Ingeniería Forestal", "puntaje": 670.10 },
    { "programa": "Antropología – Arqueología", "puntaje": 749.90 },
    { "programa": "Arquitectura", "puntaje": 843.55 },
    { "programa": "Arte", "puntaje": 752.75 },
    { "programa": "Astronomía", "puntaje": 875.60 },
    { "programa": "Biología", "puntaje": 747.25 },
    { "programa": "Biología Marina", "puntaje": 731.60 },
    { "programa": "Bioquímica", "puntaje": 864.90 },
    { "programa": "Ciencia Política", "puntaje": 831.50 },
    { "programa": "College Artes y Humanidades", "puntaje": 733.15 },
    { "programa": "College Ciencias Naturales y Matemáticas", "puntaje": 763.20 },
    { "programa": "College Ciencias Sociales", "puntaje": 707.05 },
    { "programa": "Construcción Civil", "puntaje": 645.40 },
    { "programa": "Derecho", "puntaje": 849.30 },
    { "programa": "Diseño", "puntaje": 785.60 },
    { "programa": "Enfermería", "puntaje": 818.70 },
    { "programa": "Estadística", "puntaje": 702.85 },
    { "programa": "Filosofía", "puntaje": 662.35 },
    { "programa": "Física", "puntaje": 868.75 },
    { "programa": "Fonoaudiología", "puntaje": 677.35 },
    { "programa": "Geografía", "puntaje": 615.10 },
    { "programa": "Historia", "puntaje": 706.10 },
    { "programa": "Ingeniería", "puntaje": 884.75 },
    { "programa": "Ingeniería Comercial", "puntaje": 851.80 },
    { "programa": "Kinesiología", "puntaje": 791.75 },
    { "programa": "Letras Hispánicas", "puntaje": 731.00 },
    { "programa": "Letras Inglesas", "puntaje": 803.40 },
    { "programa": "Licenciatura en Ingeniería en Ciencia De Datos", "puntaje": 718.00 },
    { "programa": "Licenciatura en Ingeniería en Ciencia de la Computación", "puntaje": 811.25 },
    { "programa": "Licenciatura en Interpretación Musical", "puntaje": 683.66 },
    { "programa": "Matemática", "puntaje": 781.50 },
    { "programa": "Medicina", "puntaje": 945.10 },
    { "programa": "Medicina Veterinaria", "puntaje": 808.10 },
    { "programa": "Música", "puntaje": 691.79 },
    { "programa": "Nutrición y Dietética", "puntaje": 757.75 },
    { "programa": "Odontología", "puntaje": 845.05 },
    { "programa": "Pedagogía en Educación Especial", "puntaje": 674.80 },
    { "programa": "Pedagogía en Educación Física y Salud", "puntaje": 681.90 },
    { "programa": "Pedagogía en Educación Media en Ciencias Naturales y Biología", "puntaje": 655.80 },
    { "programa": "Pedagogía en Educación Media en Física", "puntaje": 630.60 },
    { "programa": "Pedagogía en Educacion Media en Matemática", "puntaje": 781.90 },
    { "programa": "Pedagogía en Educación Media en Química", "puntaje": 478.40 },
    { "programa": "Pedagogía en Educación Parvularia (Santiago)", "puntaje": 663.70 },
    { "programa": "Pedagogía en Educación Parvularia (Campus Villarrica)", "puntaje": 488.30 },
    { "programa": "Pedagogía en Inglés", "puntaje": 775.60 },
    { "programa": "Pedagogía en Religión Católica", "puntaje": 536.30 },
    { "programa": "Pedagogía General Básica (Santiago)", "puntaje": 558.40 },
    { "programa": "Pedagogía General Básica (Campus Villarrica)", "puntaje": 504.30 },
    { "programa": "Periodismo – Dirección Audiovisual – Publicidad", "puntaje": 807.85 },
    { "programa": "Psicología", "puntaje": 874.15 },
    { "programa": "Química", "puntaje": 746.70 },
    { "programa": "Química y Farmacia", "puntaje": 848.75 },
    { "programa": "Sociología", "puntaje": 717.95 },
    { "programa": "Teología", "puntaje": 536.30 },
    { "programa": "Terapia Ocupacional", "puntaje": 719.40 },
    { "programa": "Trabajo Social", "puntaje": 703.50 }
  ],
  "Universidad de Valparaíso": [
    { "programa": "Arquitectura", "puntaje": 619.60 },
    { "programa": "Cine", "puntaje": 622.50 },
    { "programa": "Diseño", "puntaje": 620.90 },
    { "programa": "Gestión en Turismo y Cultura", "puntaje": 519.00 },
    { "programa": "Teatro", "puntaje": 608.60 },
    { "programa": "Ingeniería en Estadística y Ciencia de Datos", "puntaje": 597.45 },
    { "programa": "Licenciatura en Ciencias mención en Biología o en Química", "puntaje": 507.80 },
    { "programa": "Licenciatura en Física mención Astronomía, Ciencias Atmosféricas o Computación Científica", "puntaje": 514.45 },
    { "programa": "Pedagogía en Matemáticas* o Licenciatura en Matemáticas", "puntaje": 531.35 },
    { "programa": "Biología Marina", "puntaje": 663.10 },
    { "programa": "Administración Hotelera y Gastronómica", "puntaje": 544.80 },
    { "programa": "Administración Pública - Valparaíso", "puntaje": 536.00 },
    { "programa": "Administración Pública - Santiago", "punt": 401.45 },
    { "programa": "Auditoría - Valparaíso", "puntaje": 425.80 },
    { "programa": "Auditoría - Santiago", "puntaje": 486.60 },
    { "programa": "Ingeniería Comercial - Viña del Mar", "puntaje": 494.70 },
    { "programa": "Ingeniería Comercial - Santiago", "puntaje": 472.10 },
    { "programa": "Ingeniería en Información y Control de Gestión", "puntaje": 495.00 },
    { "programa": "Ingeniería en Negocios Internacionales - Viña", "punt": 504.60 },
    { "programa": "Ingeniería en Negocios Internacionales - Stgo.", "puntaje": 466.90 },
    { "programa": "Psicología", "puntaje": 741.00 },
    { "programa": "Trabajo Social", "puntaje": 585.10 },
    { "programa": "Sociología", "puntaje": 552.30 },
    { "programa": "Derecho", "puntaje": 702.60 },
    { "programa": "Nutrición y Dietética", "puntaje": 669.30 },
    { "programa": "Química y Farmacia", "puntaje": 760.65 },
    { "programa": "Pedagogía en Filosofía*", "puntaje": 563.20 },
    { "programa": "Pedagogía en Historia y Ciencias Sociales*", "puntaje": 473.80 },
    { "programa": "Pedagogía en Música*", "puntaje": 487.95 },
    { "programa": "Ingeniería Ambiental", "puntaje": 499.06 },
    { "programa": "Ingeniería Civil", "puntaje": 455.05 },
    { "programa": "Ingeniería Civil Ambiental", "puntaje": 501.70 },
    { "programa": "Ingeniería Civil Biomédica", "puntaje": 500.90 },
    { "programa": "Ingeniería Civil Industrial - Valparaíso", "puntaje": 433.90 },
    { "programa": "Ingeniería Civil Industrial - Santiago", "puntaje": 462.30 },
    { "programa": "Ingeniería Civil Informática", "puntaje": 576.45 },
    { "programa": "Ingeniería Civil Matemática", "punt": 544.95 },
    { "programa": "Ingeniería Civil Oceánica", "puntaje": 532.75 },
    { "programa": "Ingeniería en Construcción", "puntaje": 454.40 },
    { "programa": "Educación Parvularia*", "puntaje": 583.50 },
    { "programa": "Enfermería - Reñaca", "puntaje": 740.60 },
    { "programa": "Enfermería - San Felipe", "puntaje": 673.70 },
    { "programa": "Fonoaudiología - Reñaca", "puntaje": 609.40 },
    { "programa": "Fonoaudiología - San Felipe", "puntaje": 526.90 },
    { "programa": "Kinesiología", "puntaje": 685.60 },
    { "programa": "Medicina - Reñaca", "puntaje": 906.40 },
    { "programa": "Medicina - San Felipe", "puntaje": 874.50 },
    { "programa": "Obstetricia y Puericultura - Reñaca", "puntaje": 739.70 },
    { "programa":"Obstetricia y Puericultura - San Felipe", "puntaje": 703.50 },
    { "programa": "Tecnología Médica - Reñaca", "puntaje": 741.65 },
    { "programa": "Tecnología Médica - San Felipe", "puntaje": 684.00 },
    { "programa": "Odontología", "puntaje": 824.05 },
  ],
  }

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
      <Modal show={showModal} onHide={handleClose}>
      <CrearEnsayo/>
    </Modal>
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
              <li><a href="#" onClick={() =>
              (window.location.href = "./Menu/CrearEnsayo" )
            } >Crear ensayo</a></li>
              <li><a href="#">Ver historial</a></li>
              <li><a href="#" onClick={startTour}>¿Cómo usar PRE-PAES?</a></li>
              <li><a className={showPuntaje ? "active": ""}  href="#" onClick={()=>setShowPuntaje(!showPuntaje)}>Puntajes de corte 2023</a></li>
            
            
            </ul>
            <AnimatePresence>
              {showPuntaje &&(
                <motion.div className="container-universidades"
                initial={{ translateY: -100, opacity: 0 }}
                animate={{ translateY: 0, opacity:1}}
                exit={{ translateY: -50, opacity: 0 }}
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
            <div className="content">
            <h2>Ensayos Predeterminados:</h2>
            <div className="categories">
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
              />
              
    
              <NombreEnsayo
                temario="Probabilidad y Estadística"
                imagen={probabilidad}
                urlEnsayo="PruebaProbabilidades"
                score="error"
                puntosTotal="5"
                
              />
              
              <div className="cardGame p-3 mb-2" onClick={handleGame}>
                
    
   

     
    </div>
             
           
              
         
              
    
    </div>
            </div>
            </section>
        )}
        
        
        </div>
     
      </main>
    </div>
  );
}

export default Menu;
