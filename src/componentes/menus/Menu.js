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


const cookies = new Cookies();
const url = window.location.pathname; // Obtiene la parte de la URL que sigue después del nombre del servidor y el puerto
const pruebaName = url.split("/").pop(); // Obtiene la última parte de la URL después de la barra ("/")
if (pruebaName === "Menu") localStorage.setItem("ensayoActivo", "ninguno");

function Menu() {
  return (
    <div>
    
    <Navbar />
      <main>
      <div className="mainMenu">
        <section className="section-menu">
          
      <div class="sidebar " >
				<div className="content-logo">
					<img className="logo" src={logo} alt="" />
				</div>
			
				
				<ul>
				  <li><a href="#">Crear ensayo</a></li>
				  <li><a href="#">Ver historial</a></li>
				  <li><a href="#">Guía de navegación</a></li>
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
            contentTitulo="Eje General"
            contentBody="Tendra a su disposicion 20 minutos para contestar el ensayo, podra navegar entre preguntas y/o omitirlas si le es pertitente."
          />

          <NombreEnsayo
            temario="Números"
            imagen={numeros}
            urlEnsayo="PruebaNumeros"
            score="scoreNumeros"
            puntosTotal="10"
            contentTitulo="Ensayo Numeros"
            contentBody="Tendra a su disposicion 10 minutos para contestar el ensayo, podra navegar entre preguntas y/o omitirlas si le es pertitente."
          />

          <NombreEnsayo
            temario="Álgebra y Funciones"
            imagen={algebra}
            urlEnsayo="PruebaAlgebra"
            score="error"
            puntosTotal="5"
          />

          <NombreEnsayo
            temario="Geometría"
            imagen={geometria}
            urlEnsayo="PruebaGeometria"
            score="error"
            puntosTotal="10"
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
