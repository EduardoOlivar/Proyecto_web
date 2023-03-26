import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalculator } from '@fortawesome/free-solid-svg-icons'

const cookies = new Cookies();
function NavbarHome(props) {

    const cerrarSesion=()=>{
        cookies.remove('id', {path: "/"});
        cookies.remove('mail', {path: "/"});
        cookies.remove('username', {path: "/"});
        cookies.remove('scoree', {path: "/"});
        window.location.href='/';
    }
    return (
       
        <nav className="navbar sticky-top navbar-expand-md navbar-dark bg-dark" data-spy="affix" data-offset-top="30" >
            <div className="container-md">
                <a className="navbar-brand " href="#">
                <FontAwesomeIcon classNameName='mx-3' icon={ faCalculator} />
                <span className="text-warning m-1">Pre-PAES</span>
                </a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="menu">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <a className="nav-link active " aria-current="page" href="/" >Inicio</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link " href="#contacto">{props.contacto}</a>
                        </li>
                    </ul>

                    <ul className="navbar-nav  ">    
                        <li className="nav-item ">
                            <a className="nav-link active " aria-current="page" href="#" onClick={() => (window.location.href = "./Login")}>{props.iniciarSesion}</a>
                        </li>
 
                    </ul>
                    <hr className="d-md-none text-white-50"/>
                </div>
            </div>
        </nav>
          
    );
}

export default NavbarHome;
