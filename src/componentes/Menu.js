import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import mate from '../images/matematicas.png'
import Navbar from './Navbar';


const cookies = new Cookies();
function Menu() {

    return (
        <div >
            <Navbar/>
        <main class="container" >
            
        <div class="container mt-5 mb-3">
            <div class="row">
                <div class="col-md-4">
                    <div class="card p-3 mb-2">
                        <div class="d-flex justify-content-between">
                            <div class="d-flex flex-row align-items-center">
                                <div class="iconMenu"> <img className='logoMenu' src={mate} alt="" /> </div>
                                 <div class="ms-2 c-details">
                                     <h6 class="mb-0">Eje General</h6> <span>1 days ago</span>
                                 </div>
                            </div>
                            <div class="badge"> <span>Ensayo</span> </div>
                       </div>
                        <div class="mt-4">
                             <h3 class="heading">Matemática(M1)<br/>Eje General</h3> 
                             <div class="mt-4"><a
                                class="btn btn-dark btn-outline-secondary text-white btn-lg m-2"
                                onClick={() => (window.location.href = "./Menu/Pregunta")}
                            
                                >Iniciar</a>
                                </div>
                          
                      <div class="mt-4">
                      
                             
                              <div class="mt-3"> <span class="text1">{cookies.get('scoree')  } Puntos <span class="text2">de 5 puntos</span></span> </div>
                          </div>
                      </div>
                  </div>
              </div>    </div>    </div>
      </main>
      </div>
          
    );
}

export default Menu;
