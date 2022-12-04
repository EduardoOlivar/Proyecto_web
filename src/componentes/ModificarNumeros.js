import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import NavbarAdmin from './NavbarAdmin';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const Apiurl = "http://127.0.0.1:8000/questions/";
const cookies = new Cookies();


class ModificarNumeros extends React.Component {


    state = {
        form: {
            "id": "",
            "question": "",
        },
        error: false,
        errorMsg: "",
        questions: []
        , status:false
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
        console.log(this.state.form)
        
        
      
    }
    cargarListado=()=>{
        let urlAll= Apiurl +"list/all/?subject=Numeros"
        axios .get(urlAll)
        .then(response =>{
           
           this.setState({
            questions : response.data
            , status:true,
            error : false
            
        })
           
                
                
        })
    }
    manejadorBoton=()=>{
         
        let url = Apiurl+this.state.form.id+"/";
        
        axios .put(url,this.state.form)
        .then(response =>{
           console.log(response.data)
           this.setState({
            error : true,
            errorMsg : "Cambio exitoso!"
        })
           
                
                
        }).catch(error =>{
           console.log(error.response.data)
            
            
        })
        

        
    }
    


    render() {
        return (
            
            <React.Fragment>
                <div >
                {this.cargarListado}
                    <NavbarAdmin

                    />
                    <div className='container'>
                        <h2 className='mt-3'>Modificar pregunta de Numeros</h2>
                        <form className="form-horizontal" action="/action_page.php">
                            <div className="form-group">
                                <label className="control-label col-sm-2" for="email">ID de la Pregunta:</label>
                                <div className="col-sm-10">
                                    <input type="text" name="id" className="form-control" id="email" onChange={this.manejadorChange} placeholder="Inserte ID" />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="control-label col-sm-2" for="pwd">Enunciado de la Pregunta</label>
                                <div className="col-sm-10">
                                    <input type="text" name="question" className="form-control" id="pwd" onChange={this.manejadorChange} placeholder="Inserte Enunciado" />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-offset-2 col-sm-10">
                                    <button type="button" className="btn btn-dark mt-2" onClick={this.manejadorBoton} >Modificar</button>
                                    {this.state.error === true &&
                                <div className="alert alert-success mt-3" role="alert">
                                    {this.state.errorMsg}
                                </div>
                            }
                                
                                </div>
                                <button type="button" className="btn btn-dark mt-2 mr-2" onClick={this.cargarListado} >Cargar Lista</button>
                            </div>
                        </form>
                        <div>
                <h1>Numeros</h1>
                <table className="table table-dark">
                    <thead className="thead-dark">
                        <tr>
                            <th>Id Pregunta</th>
                            <th>Temario</th>
                            <th>Enunciado</th>
                   
                            
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.status === true &&
                        (
                            this.state.questions.map((questions, i) => {
                                return(
                                    <tr key={i}>
                                        <td>{questions.id}</td>
                                        <td>{questions.subject}</td>
                                        <td>{questions.question}</td>
                                       
    
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

                    </div>
                    
                </div>
            </React.Fragment>
        );
    }
}

export default ModificarNumeros