import React, { Component, startTransition } from 'react';
import '../hojas-de-estilo/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey,faEnvelope,faUser } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import NavbarHome from './NavbarHome';


import Cookies from 'universal-cookie';
const cookies = new Cookies();
const tokenName = 'user_uaeh_token';
const baseUrl="http://127.0.0.1:8000/api/";


class Register extends Component{ 

    state={
        form:{
            email:'',
            username:'',
            password: '',
            password2:''
        },
        error:false,
        errorMsg:""
    }
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
        console.log(this.state.form)
      
    }
     signUp = () => {  
        if(this.state.form.username ===""){
            this.setState({
                error : true,
                errorMsg : "El nombre de usuario es un campo obligatorio"
            })
        }
        else{
            return new Promise((resolve, reject) => {  
                const instance = axios.create({  
                    baseURL: baseUrl,  
                    headers: {  
                        'Content-Type': 'application/json'  
                    }  
                });  
                instance.post('register/', this.state.form)  
                .then(r => {  
                    localStorage.setItem(tokenName, JSON.stringify(r.data.key));  
                    resolve(r.data);  
                    if(r.data){
                        window.location.href = "./Login";
                    
                    }else
                        console.log(r.data.password)
                }).catch(e => {  
                    console.log(e.response.data.password)
                   /* if(e.response.data.email[0]==="Ya existe users con este email."){
                        this.setState({
                            error : true,
                            errorMsg : "Ya existe usuarios con este email."
                        })
                    }
                    if(e.response.data.email[0]==="Este campo no puede estar en blanco."){
                        this.setState({
                            error : true,
                            errorMsg : "El email es un campo obligatorio"
                        })
                    }*/
                    if(e.response.data.password==="Las contraseñas deben coincidir."){
                        this.setState({
                            error : true,
                            errorMsg : "Las contraseñas no coinciden"
                        })
                    }
                    if(e.response.data.email[0]==="Este campo no puede estar en blanco."){
                        this.setState({
                            error : true,
                            errorMsg : "El email es un campo obligatorio"
                        })
                    }  
                    if(e.response.data.email[0]==="Ya existe users con este email."){
                        this.setState({
                            error : true,
                            errorMsg : "Ya existe usuarios con este email."
                        })
                    }
                    
                }); 
            }); 
        }    
    };  



     manejadorBoton=()=>{
        
         axios.post(baseUrl,this.state.form )
        .then(response=>{
            
                console.log(response)
            
       
            
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
           <input name="username" id="" type="text" onChange={this.manejadorChange} placeholder="Nombre de usuario" />
    
       </div>
            <div className="input-contenedor">
            <FontAwesomeIcon className='icon' icon={ faEnvelope} />
            <input name="email" id="emailL" type="text" onChange={this.manejadorChange} placeholder="Correo Electronico"/>
            
            </div>
            
            
            <div className="input-contenedor">
            <FontAwesomeIcon className='icon' icon={ faKey} />
            <input type="password" name="password" id="password1" onChange={this.manejadorChange} placeholder="Contraseña"/>
            
            </div>

            <div className="input-contenedor">
            <FontAwesomeIcon className='icon' icon={ faKey} />
            <input type="password" name="password2" id="password2" onChange={this.manejadorChange} placeholder="Confirma tu contraseña"/>
            
            </div>
            <button type="button" id="login" className="button" onClick={this.signUp}>Registrate</button>
            {this.state.error === true &&
                                <div className="alert alert-danger mt-3" role="alert">
                                    {this.state.errorMsg}
                                </div>
                            }
            <p className='pLogin'>Al registrarte, aceptas nuestras Condiciones de uso y Política de privacidad.</p>
            <p className='pLogin'>¿Ya tienes una cuenta? <a className="link" href='./Login' >Iniciar Sesion</a></p>
        </div>
        </form>

        </body>
    );
    }    
 }
 export default Register;
