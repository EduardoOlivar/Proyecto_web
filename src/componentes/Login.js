import React, { Component, useRef,useState }  from 'react';
import '../hojas-de-estilo/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey,faEnvelope } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import NavbarHome from './NavbarHome';
//servicios
import {Apiurl} from '../Services/apirest'

import Cookies from 'universal-cookie';
const cookies = new Cookies();
let estadoCaptcha= false;
const baseUrl = "http://127.0.0.1:8000/api/login/";
const submit = (e) =>{
    e.preventDefault();
  
}
/*pruebadaniel */
class Login extends Component {

  constructor(props){
    super(props);
  }

  state = {
    form: {
      email: "",
      password: "",
    },
  };
  handleChange = async (e) => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
    
  };
  onChange=async e=> {
    if(e){
        estadoCaptcha=true;
        console.log('si funciona')
    }
  }

    iniciarSesion=()=>{
      let url = Apiurl; 
      axios.post(url,this.state.form)
      .then(response =>{
        if(estadoCaptcha==true){
            if(response.data.status ==="status"){
              localStorage.setItem("token,response.data.result.token");
              window.location.href = "./Menu";
            
          }  
      }
      else{
          alert('Por favor acepte el captcha')
      }
      })
      .catch((error) => {
        console.log(error);
        
      });
    }

  /*iniciarSesion = async () => {
    let url=Apiurl
    await axios.post(url, {
        params: {
          email: this.state.form.email,
          password: this.state.form.password,
        },
      })
      .then(response => {
        return response.data;
      })
      .then(response => {
        if(estadoCaptcha==true){
          for (let i=0; i<response.length; i++) {
            if(response.length>0 && response[i].email === this.state.form.email && response[i].password === this.state.form.password){
            let respuesta = response[i];
            cookies.set("id", respuesta.id, { path: "/" });
            cookies.set("email", respuesta.email, { path: "/" });
            cookies.set("score", respuesta.score, { path: "/" });
            if (respuesta.email === "adminPaes")
              window.location.href = "./MenuAdmin";
            else window.location.href = "./Menu";
            return
          }
          return alert("El usuario o la contraseña no son correctos");
        }
      }
      else{
          alert('Por favor acepte el captcha')
      }  
        
      })
      .catch((error) => {
        console.log(error);
      });
  };
    /*iniciarSesionFa=async()=>{

        let usuario={
            id: 10,
            username: "prueba2",
            mail: "prueba2@gmail.com",
            password: "prueba2"
          }
        await axios.post(baseUrl, usuario);
        



    } */
    componentDidMount() {
        if(cookies.get('username')){
            window.location.href="/Menu";
        }
    }
    
    


    render() {
    return(
      
        <body className="cuerpoLogin">
         <NavbarHome/> 
    <form className="formulario" id="formularioL" onSubmit={submit}>
        <h1 className="hero_register">Iniciar Sesión</h1>
        <div className="contenedor ">
        
            
            <div className="input-contenedor">
            <FontAwesomeIcon className='icon' icon={ faEnvelope} />
            <input name="email" id="emailL" type="text" onChange={this.handleChange} placeholder="Correo Electronico"/>
            
            </div>
            
            <div className="input-contenedor">
            <FontAwesomeIcon className='icon' icon={ faKey} />
            <input type="password" name="password" id="passwordL" onChange={this.handleChange} placeholder="Contraseña"/>
            
            </div>
            <div className=" recaptcha m-3 ">
                <ReCAPTCHA
                    
                    sitekey="6Le0ODEjAAAAALQzVZ-l0ickuj1MbAMtZtSAAZW-"
                    onChange={this.onChange}
                />
            
            </div>
          
            <button type="button" id="login" className="button" onClick={this.iniciarSesion()}>Iniciar Sesión</button>
            <p className='pLogin'>Al registrarte, aceptas nuestras Condiciones de uso y Política de privacidad.</p>
            <p className='pLogin'>¿No tienes una cuenta? <a className="link" href="/Register" >Registrate</a></p>
        </div>
        </form>

        </body>
    );
    }    
 }
 export default Login;

