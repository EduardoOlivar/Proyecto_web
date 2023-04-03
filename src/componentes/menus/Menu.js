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


const cookies = new Cookies();
const url = window.location.pathname; // Obtiene la parte de la URL que sigue después del nombre del servidor y el puerto
const pruebaName = url.split("/").pop(); // Obtiene la última parte de la URL después de la barra ("/")
if (pruebaName === "Menu") localStorage.setItem("ensayoActivo", "ninguno");


function Menu() {
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
        <section className="section-menu">
          
      <div className="sidebar " >
				<div className="content-logo">
					<img className="logo" src={logo} alt="" />
				</div>
			
				
				<ul>
				  <li><a href="#">Crear ensayo</a></li>
				  <li><a href="#">Ver historial</a></li>
				  <li><a href="#" onClick={startTour}>¿Cómo usar PRE-PAES?</a></li>
          <li><a href="#">Perfil</a></li>
				</ul>
				
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

</div>
        </div>
        </section>
        </div>
      </main>
    </div>
  );
}

export default Menu;
