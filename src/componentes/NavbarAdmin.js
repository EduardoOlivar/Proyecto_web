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
    if (!cookies.get("username") )  {
      window.location.href = "/Login";
    }
    if(cookies.get("username") != "admin@gmail.com" ){
      window.location.href = "/Menu";
    }
  }
  componentDidMount();
  return (
    <nav
      className="navbar sticky-top navbar-expand-md navbar-dark bg-dark"
      data-spy="affix"
      data-offset-top="30"
    >
      <div className="container-md">
        <a className="navbar-brand" href="#">
          <i className="bi bi-calculator"></i>
          <span className="text-warning">Pre-PAES</span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menu"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="menu">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a
                className="nav-link active "
                aria-current="page"
                href="#"
                onClick={() => (window.location.href = "/MenuAdmin")}
              >
                Admin
              </a>
            </li>
          </ul>

          <ul className="navbar-nav  ">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle active"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-person-fill "></i>
                <span>Usuario</span>
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item " href="#">
                    {cookies.get("username")}
                  </a>
                </li>
                <div className="dropdown-divider"></div>

                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => cerrarSesion()}
                  >
                    Cerrar Sesión
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <hr className="d-md-none text-white-50" />
        </div>
      </div>
    </nav>
  );
}

export default NavbarAdmin;
