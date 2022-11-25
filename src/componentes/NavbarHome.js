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
       
        <nav class="navbar sticky-top navbar-expand-md navbar-dark bg-dark" data-spy="affix" data-offset-top="30" >
            <div class="container-md">
                <a class="navbar-brand" href="#">
                <FontAwesomeIcon className='mx-2' icon={ faCalculator} />
                <span class="text-warning">Pre-PAES</span>
                </a>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="menu">
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                            <a class="nav-link active " aria-current="page" href="/" >Inicio</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link " href="#contacto">{props.contacto}</a>
                        </li>
                    </ul>

                    <ul class="navbar-nav  ">    
                        <li class="nav-item ">
                            <a class="nav-link active " aria-current="page" href="#" onClick={() => (window.location.href = "./Login")}>{props.iniciarSesion}</a>
                        </li>
 
                    </ul>
                    <hr class="d-md-none text-white-50"/>
                </div>
            </div>
        </nav>
          
    );
}

export default NavbarHome;
