import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "universal-cookie";
import usuariovista from "../../images/usuariovista.png";
import ensayovista from "../../images/ensayoformato.png";
import numerosI from "../../images/numeros.jpg";
import NavbarHome from "../navbar/NavbarHome";

/*hola mundo */
const cookies = new Cookies();
function Home() {
  function componentDidMount() {
    if (cookies.get("username")) {
      window.location.href = "/Menu";
    }
  }
  componentDidMount();
  return (
    <div id="home">
      <NavbarHome
      contacto="Contactos"
      iniciarSesion="Iniciar Sesión"
      />
      <div id="intro-example" className="hero-home p-5 text-center bg-image">
        <div className="mask">
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white">
              <h1 className="mb-3">¡Bienvenido a Pre-Paes!</h1>
              <h5 className="mb-4">
                Esta es una plataforma online que te ayudara a preparte para
                rendir la mejor PAES de matemáticas de tu vida
              </h5>
              <a
                className="boton-home btn btn-warning btn-outline-light btn-lg text-dark m-2"
                href="#"
                onClick={() => (window.location.href = "./Register")}
              >
                ¿Primera vez aquí? ¡Registrate!
              </a>
            </div>
          </div>
        </div>
      </div>
      <main className="container marketing">
        <hr className="featurette-divider" />
        <div className="row featurette" id="row-diferencia">
          <div className="container col-md-7">
            <h1 className="featurette-heading fw-normal lh-1">
              ¿Qué nos diferencia de las otras
              <span className="text-muted"> plataformas</span>?
            </h1>
            <p className="lead">
              Pre-Paes busca brindarte más opciones a la hora de hacer ensayos
              de matemáticas, permitiéndote seleccionar entre un ensayo general
              de toda la materia o de alguna especifica. Además, cada pregunta
              incluida en estas pruebas contiene un desarrollo de la solución
              explicada en video, para ayudarte de mejor manera a aprender los
              temas en los que estes más débil.{" "}
            </p>
          </div>
          <div className="container col-md-5  text-center text-black">
            <div
              id="carouselExampleIndicators"
              className="carousel slide"
              data-bs-ride="true"
            >
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="2"
                  aria-label="Slide 3"
                ></button>
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src={usuariovista}
                    className="ensayoI d-block w-100"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img src={ensayovista} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                  <img src={numerosI} className="d-block w-100" alt="..." />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
        <hr className="featurette-divider" />
        <div className="row featurette" id="contacto">
          <div className="container col-md-">
            <h1 className="featurette-heading fw-normal lh-1">Contactanos</h1>
            <p className="lead">
              Puedes encontrarnos en el siguiente correo: <br />{" "}
              prepaes@gmail.com
            </p>
          </div>
        </div>

        <hr className="featurette-divider" />
      </main>
    </div>
  );
}

export default Home;
