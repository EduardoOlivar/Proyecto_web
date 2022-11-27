import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';




const cookies = new Cookies();
function FuncionUsuario(props) {

    return (
        <div className='row  '>
            <div className="card p-3 mb-2">
                <div className="d-flex justify-content-between">
                    <div className="d-flex flex-row align-items-center">
                        <div className="iconMenu"> <img className='logoMenu' src={props.logo} alt="" /> </div>
                        <div className="ms-2 c-details ">
                            <h3 className="mb-0 ">{props.funcion}</h3> 
                        </div>
                    </div>
                </div>        
            </div>
        </div>       
     
          
    );
}

export default FuncionUsuario;