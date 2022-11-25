import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "universal-cookie";

const cookies = new Cookies();
function NavbarAdmin() {
  const cerrarSesion = () => {
    cookies.remove("id", { path: "/" });
    cookies.remove("mail", { path: "/" });
    cookies.remove("username", { path: "/" });
    cookies.set("scoree", 0, { path: "/" });
    window.location.href = "/";
  };
  function componentDidMount() {
    if (!cookies.get("username")) {
      window.location.href = "/Login";
    }
  }
  componentDidMount();
  return (
    <nav
      class="navbar sticky-top navbar-expand-md navbar-dark bg-dark"
      data-spy="affix"
      data-offset-top="30"
    >
      <div class="container-md">
        <a class="navbar-brand" href="#">
          <i class="bi bi-calculator"></i>
          <span class="text-warning">Pre-PAES</span>
        </a>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menu"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="menu">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a
                class="nav-link active "
                aria-current="page"
                href="#"
                onClick={() => (window.location.href = "/Menu")}
              >
                Admin
              </a>
            </li>
          </ul>

          <ul class="navbar-nav  ">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle active"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="bi bi-person-fill "></i>
                <span>Usuario</span>
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a class="dropdown-item " href="#">
                    {cookies.get("username")}
                  </a>
                </li>
                <div class="dropdown-divider"></div>

                <li>
                  <a
                    class="dropdown-item"
                    href="#"
                    onClick={() => cerrarSesion()}
                  >
                    Cerrar Sesión
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <hr class="d-md-none text-white-50" />
        </div>
      </div>
    </nav>
  );
}

export default NavbarAdmin;
