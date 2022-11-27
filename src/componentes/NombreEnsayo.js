import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';




const cookies = new Cookies();
function NombreEnsayo(props) {

    return (
      

      
            
       
           
                <div className="col-md-4 mt-3">
                    <div className="card p-3 mb-2">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex flex-row align-items-center">
                                <div className="iconMenu"> <img className='logoMenu' src={props.imagen} alt="" /> </div>
                                 <div className="ms-2 c-details">
                                     <h6 className="mb-0">{props.temario}</h6> 
                                 </div>
                            </div>
                            <div className="badge "> <span>Ensayo</span> </div>
                       </div>
                        <div className="mt-4">
                             <h3 className="heading">Matemática(M1)<br/>{props.temario}</h3> 
                             <div className="mt-4" ><a
                                className= {props.estadoBoton + " btn btn-dark btn-secondary text-white btn-lg m-2 "} 
                                onClick={() => (window.location.href = "./Menu/" + props.urlEnsayo)}
                            
                                >Iniciar</a>
                                </div>
                          
                      <div className="mt-4">
                      
                             
                              <div className="mt-3"> <span className="text1">{cookies.get(props.score)  }  <span className="text2">de {props.puntosTotal} puntos</span></span> </div>
                          </div>
                      </div>
                  </div>
              </div>        
     
          
    );
}

export default NombreEnsayo;