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
const urlProfile = "http://127.0.0.1:8000/api/profile/";
class LoginPro extends React.Component{
    

    state = {
        form: {
          "email": "",
          "password": "",
        },
        error:false,
        errorMsg:""
      };

    manejadorSubmit=e=>{
        e.preventDefault();
    }

    manejadorChange = async e=>{
        await this.setState({
            form: {
              ...this.state.form,
              [e.target.name]: e.target.value
            }
        })
      
    }
    onChange=async e=> {
        if(e){
            estadoCaptcha=true;
            console.log('si funciona')
        }
      }

    manejadorBoton=()=>{
        if(estadoCaptcha===true){
        let url = Apiurl;
        axios .post(url,this.state.form)
        .then(response =>{
            console.log(response.data.token.access);
           
                if(response.data.status === "ok"){
                    console.log(response)
                    localStorage.setItem("token",response.data.token.acccess)
                    cookies.set('token', response.data.token, {path: "/"});
                    cookies.set('username', this.state.form.email, {path: "/"});
                    cookies.set('scoreGeneral', 0, {path: "/"});
                    cookies.set('scoreNumeros', 0, {path: "/"});
                    cookies.set('error', 0, {path: "/"});
                    if(this.state.form.email === "admin@gmail.com")
                        window.location.href="./MenuAdmin";
                    else    
                        window.location.href = "./Menu";
                }else{
                    console.log("error")
                    this.setState({
                        error : true,
                        errorMsg : response.data.errors
                    })
                }
                
        }).catch(error =>{
           
           
            if(error.response.data.errors.email){
                if(error.response.data.errors.email[0] === 'Introduzca una dirección de correo electrónico válida.')
                this.setState({
                    error : true,
                    errorMsg : "Introduzca una dirección de correo electrónico válida."
                })
                    else if(error.response.data.errors.email[0] || error.response.data.password[0] === 'Este campo no puede estar en blanco.')
                this.setState({
                    error : true,
                    errorMsg : "Rellene todos los camhpos"
                })
                }    
            else if(error.response.data.errors === 'Email o contraseña invalidos')
            this.setState({
                error : true,
                errorMsg : "Email o contraseña invalidos"
            })
            else if( error.response.data.errors.password[0] === 'Este campo no puede estar en blanco.')
            this.setState({
                error : true,
                errorMsg : "Rellene todos los camhpos"
            })
            
            
        })
        }else{
            console.log("error")
                this.setState({
                    error : true,
                    errorMsg : "Por favor acepte el captcha"
                })
        }
    }

    render(){
        return(
            <React.Fragment>
                <body className="cuerpoLogin">
                    <NavbarHome/> 
                    <form className="formulario" id="formularioL" >
                        <h1 className="hero_register">Iniciar Sesión</h1>
                        <div className="contenedor ">
        
            
                            <div className="input-contenedor">
                                <FontAwesomeIcon className='icon' icon={ faEnvelope} />
                                <input name="email" id="emailL" type="text" onChange={this.manejadorChange} placeholder="Correo Electronico"/>
            
                            </div>
            
                            <div className="input-contenedor">
                                <FontAwesomeIcon className='icon' icon={ faKey} />
                                <input type="password" name="password" id="passwordL" onChange={this.manejadorChange} placeholder="Contraseña"/>
            
                            </div>
                            <div className=" recaptcha m-3 ">
                                <ReCAPTCHA
                    
                                sitekey="6LdKsC0jAAAAALU0pKS0cugXGAxqe4aX-RKs9Q-a"
                                onChange={this.onChange}
                                />
            
                            </div>
          
                            <button type="button" id="login" className="button" onClick={this.manejadorBoton}>Iniciar Sesión</button>
                            {this.state.error === true &&
                                <div className="alert alert-danger mt-3" role="alert">
                                    {this.state.errorMsg}
                                </div>
                            }
                            <p className='pLogin mt-1'>¿No tienes una cuenta? <a className="link" href="/Register" >Registrate</a></p>
                        </div>
        </form>

        </body>
            </React.Fragment>
        );
    }
}
export default LoginPro