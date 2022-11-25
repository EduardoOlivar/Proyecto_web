import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "universal-cookie";
import usuariovista from "../images/usuariovista.png";
import ensayovista from "../images/ensayoformato.png";
import numerosI from "../images/numeros.jpg";
import NavbarHome from "./NavbarHome";

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
      <div id="intro-example" class="hero-home p-5 text-center bg-image">
        <div class="mask">
          <div class="d-flex justify-content-center align-items-center h-100">
            <div class="text-white">
              <h1 class="mb-3">¡Bienvenido a Pre-Paes!</h1>
              <h5 class="mb-4">
                Esta es una plataforma online que te ayudara a preparte para
                rendir la mejor PAES de matemáticas de tu vida
              </h5>
              <a
                class="boton-home btn btn-warning btn-outline-light btn-lg text-dark m-2"
                href="#"
                onClick={() => (window.location.href = "./Register")}
              >
                ¿Primera vez aquí? ¡Registrate!
              </a>
            </div>
          </div>
        </div>
      </div>
      <main class="container marketing">
        <hr class="featurette-divider" />
        <div class="row featurette" id="row-diferencia">
          <div class="container col-md-7">
            <h1 class="featurette-heading fw-normal lh-1">
              ¿Qué nos diferencia de las otras
              <span class="text-muted"> plataformas</span>?
            </h1>
            <p class="lead">
              Pre-Paes busca brindarte más opciones a la hora de hacer ensayos
              de matemáticas, permitiéndote seleccionar entre un ensayo general
              de toda la materia o de alguna especifica. Además, cada pregunta
              incluida en estas pruebas contiene un desarrollo de la solución
              explicada en video, para ayudarte de mejor manera a aprender los
              temas en los que estes más débil.{" "}
            </p>
          </div>
          <div class="container col-md-5  text-center text-black">
            <div
              id="carouselExampleIndicators"
              class="carousel slide"
              data-bs-ride="true"
            >
              <div class="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="0"
                  class="active"
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
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img
                    src={usuariovista}
                    class="ensayoI d-block w-100"
                    alt="..."
                  />
                </div>
                <div class="carousel-item">
                  <img src={ensayovista} class="d-block w-100" alt="..." />
                </div>
                <div class="carousel-item">
                  <img src={numerosI} class="d-block w-100" alt="..." />
                </div>
              </div>
              <button
                class="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
              >
                <span
                  class="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button
                class="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
              >
                <span
                  class="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
        <hr class="featurette-divider" />
        <div class="row featurette" id="contacto">
          <div class="container col-md-">
            <h1 class="featurette-heading fw-normal lh-1">Contactanos</h1>
            <p class="lead">
              Puedes encontrarnos en el siguiente correo: <br />{" "}
              prepaes@gmail.com
            </p>
          </div>
        </div>

        <hr class="featurette-divider" />
      </main>
    </div>
  );
}

export default Home;
