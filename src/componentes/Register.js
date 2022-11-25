import React, { Component } from 'react';
import '../hojas-de-estilo/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey,faEnvelope,faUser } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import NavbarHome from './NavbarHome';


import Cookies from 'universal-cookie';
const cookies = new Cookies();

const baseUrl="http://127.0.0.1:8000/api/register/";


class Register extends Component{ 

    state={
        form:{
            email:'',
            nombre:'',
            password: '',
            password2:''
        }
    }
    handleChange=async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form)
    }


    Registrarse=async()=>{
        let usuario={
            
            username: this.state.form.nombre,
            email: this.state.form.email,
            password: this.state.form.password,
            password2: this.state.form.password2,
            score: 0
          }
        await axios.post(baseUrl, usuario)
        window.location.href = "./Login"

     } 

    ComprobarRegistro=async()=>{
        
        await axios.post(baseUrl, {params: {mail: this.state.form.email}})
        .then(response=>{
            return response.data;
        })
        .then(response=>{
            if(response.length>0){
                alert('Este correo ya esta registrado');
            }else{
                this.Registrarse();
            }
        })
        .catch(error=>{
            console.log(error);
        })


      


    } 
    componentDidMount() {
        if(cookies.get('username')){
            window.location.href="/Menu";
        }
    }
    


    render() {
    return(
        <body className="cuerpoLogin">
        <NavbarHome/>    
    <form className="formulario" id="formularioL">
        <h1 className="hero_register">Registro</h1>
        <div className="contenedor ">
            
        <div class="input-contenedor ">
           
           <FontAwesomeIcon className='icon' icon={ faUser} />
           <input name="nombre" id="" type="text" onChange={this.handleChange} placeholder="Nombre" />
    
       </div>
            <div className="input-contenedor">
            <FontAwesomeIcon className='icon' icon={ faEnvelope} />
            <input name="email" id="emailL" type="text" onChange={this.handleChange} placeholder="Correo Electronico"/>
            
            </div>
            
            
            <div className="input-contenedor">
            <FontAwesomeIcon className='icon' icon={ faKey} />
            <input type="password" name="password" id="password1" onChange={this.handleChange} placeholder="Contraseña"/>
            
            </div>

            <div className="input-contenedor">
            <FontAwesomeIcon className='icon' icon={ faKey} />
            <input type="password" name="password" id="password2" onChange={this.handleChange} placeholder="Confirma tu contraseña"/>
            
            </div>
            <button type="button" id="login" className="button" onClick={()=>this.ComprobarRegistro()}>Registrate</button>
            <p className='pLogin'>Al registrarte, aceptas nuestras Condiciones de uso y Política de privacidad.</p>
            <p className='pLogin'>¿Ya tienes una cuenta? <a className="link" href='./Login' >Iniciar Sesion</a></p>
        </div>
        </form>

        </body>
    );
    }    
 }
 export default Register;
