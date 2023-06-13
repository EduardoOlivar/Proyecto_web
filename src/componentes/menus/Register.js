import React, { Component } from 'react';
import '../../hojas-de-estilo/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import NavbarHome from '../navbar/NavbarHome';
import axios from 'axios';
const tokenName = 'user_uaeh_token';
const baseUrl="http://127.0.0.1:8000/api/";

class Register extends Component {
  state = {
    form: {
      email: '',
      username: '',
      password: '',
      password2: ''
    },
    errors: [] // Array para almacenar los mensajes de error
  };

  manejadorSubmit = e => {
    e.preventDefault();
    this.signUp();
  };

  manejadorChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
  };

  signUp = () => {
    const { email, username, password, password2 } = this.state.form;
    const { errors } = this.state;
  
    // Verificar si el error ya está en el estado
    const isDuplicateError = (error) => {
      return errors.includes(error);
    };
  
    // Función para agregar un error al estado
    const addError = (error) => {
      if (!isDuplicateError(error)) {
        this.setState((prevState) => ({
          errors: [...prevState.errors, error],
        }));
      }
    };
  
    // Función para eliminar un error del estado
    const removeError = (error) => {
      if (isDuplicateError(error)) {
        this.setState((prevState) => ({
          errors: prevState.errors.filter((e) => e !== error),
        }));
      }
    };
  
    // Limpiar el estado de errores al inicio
   
  
    if (username.trim() === "") {
      addError("El nombre de usuario es un campo obligatorio");
    } else {
      removeError("El nombre de usuario es un campo obligatorio");
    }
  
    if (email.trim() === "") {
      addError("El email es un campo obligatorio");
    } else {
      removeError("El email es un campo obligatorio");
    }
  
    if (password.trim() === "") {
      addError("La contraseña es un campo obligatorio");
    } else {
      removeError("La contraseña es un campo obligatorio");
    }
  
    if (password !== password2) {
      addError("Las contraseñas no coinciden");
    } else {
      removeError("Las contraseñas no coinciden");
    }
  
    if (errors.length === 0) {
      /* Hacer la petición axios o cualquier otra acción aquí */
      return new Promise((resolve, reject) => {
        const instance = axios.create({
          baseURL: baseUrl,
          headers: {
            "Content-Type": "application/json",
          },
        });
        instance
          .post("register/", this.state.form)
          .then((r) => {
            localStorage.setItem(tokenName, JSON.stringify(r.data.key));
            resolve(r.data);
            if (r.data) {
              window.location.href = "./Login";
            } else console.log(r.data.password);
          })
          .catch((e) => {
            console.log(e.response.data);
            if (e.response.data.password === "Las contraseñas deben coincidir.") {
              addError("Las contraseñas no coinciden");
            } else {
              removeError("Las contraseñas no coinciden");
            }
  
       
  
            if (e.response.data.email[0] === "Ya existe users con este email.") {
              addError("Ya existe un usuario con este email.");
            } else {
              removeError("Ya existe un usuario con este email.");
            }
            if (e.response.data.email[0] === "Introduzca una dirección de correo electrónico válida.") {
              addError("Introduzca una dirección de correo electrónico válida.");
            } else {
              removeError("Introduzca una dirección de correo electrónico válida.");
            }
          });
      });
    }
  };
  

  handleBackendError = error => {
    const { response } = error;

    if (response && response.data && response.data.email && response.data.email[0] === 'Ya existe users con este email.') {
      this.setState(prevState => ({
        errors: [...prevState.errors, 'Ya existe un usuario con este correo electrónico.']
      }));
    } else {
      console.log('Error desconocido:', error);
    }
  };

  render() {
    return (
      <body className="cuerpoLogin">
        <NavbarHome />
        <form className="formulario" id="formularioL" onSubmit={this.manejadorSubmit}>
          <h1 className="hero_register">Registro</h1>
          <div className="contenedor">
            <div className="input-contenedor">
              <FontAwesomeIcon className="icon" icon={faUser} />
              <input
                name="username"
                id=""
                type="text"
                onChange={this.manejadorChange}
                placeholder="Nombre de usuario"
              />
            </div>
            <div className="input-contenedor">
              <FontAwesomeIcon className="icon" icon={faEnvelope} />
              <input
                name="email"
                id="emailL"
                type="text"
                onChange={this.manejadorChange}
                placeholder="Correo Electronico"
              />
            </div>
            <div className="input-contenedor">
              <FontAwesomeIcon className="icon" icon={faKey} />
              <input
                type="password"
                name="password"
                id="password1"
                onChange={this.manejadorChange}
                placeholder="Contraseña"
              />
            </div>
            <div className="input-contenedor">
              <FontAwesomeIcon className="icon" icon={faKey} />
              <input
                type="password"
                name="password2"
                id="password2"
                onChange={this.manejadorChange}
                placeholder="Confirma tu contraseña"
              />
            </div>
            <button type="submit" id="login" className="button">
              Registrate
            </button>
            {this.state.errors.length > 0 && (
              <div className="alert alert-danger mt-3" role="alert">
                {this.state.errors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
            <p className="pLogin">Al registrarte, aceptas nuestras Condiciones de uso y Política de privacidad.</p>
            <p className="pLogin">
              ¿Ya tienes una cuenta? <a className="link" href="./Login">Iniciar Sesion</a>
            </p>
          </div>
        </form>
      </body>
    );
  }
}

export default Register;
