import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "universal-cookie";
import mate from "../../images/matematicas.png";
import numeros from "../../images/numeros.png";
import Navbar from "../navbar/Navbar";
import NombreEnsayo from "../NombreEnsayo";
import algebra from "../../images/algebra.png";
import geometria from "../../images/geometria.png";
import probabilidad from "../../images/probabilidad.png";
import FuncionUsuario from "../FuncionUsuario";
import crearEnsayo from "../../images/crearensayo.png";
import historial from "../../images/historial.png";

const cookies = new Cookies();
const url = window.location.pathname; // Obtiene la parte de la URL que sigue después del nombre del servidor y el puerto
const pruebaName = url.split("/").pop(); // Obtiene la última parte de la URL después de la barra ("/")
if (pruebaName === "Menu") localStorage.setItem("ensayoActivo", "ninguno");
function Menu() {
  return (
    <div>
      <Navbar />
      <main className="container  mt-5 mb-3">
        <div className="row">
          <NombreEnsayo
            temario="Eje general"
            imagen={mate}
            urlEnsayo="Pregunta"
            score="scoreGeneral"
            puntosTotal="5"
          />

          <NombreEnsayo
            temario="Números"
            imagen={numeros}
            urlEnsayo="PruebaNumeros"
            score="scoreNumeros"
            puntosTotal="10"
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

          <div className="col-md-4 mt-3">
            <FuncionUsuario
              funcion="Crear Ensayo"
              logo={crearEnsayo}
              urlEnsayo="crearEnsayo"
            />
            <FuncionUsuario
              funcion="Revisar Historial"
              logo={historial}
              urlEnsayo="revisarHistorial"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Menu;
