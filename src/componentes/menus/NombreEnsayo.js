import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "universal-cookie";
import TipsPAES from "./TipsPAES";
import axios from "axios";


const cookies = new Cookies();
const ApiurlGetIdEssayUser = "http://127.0.0.1:8000/submit_essay_user/";
function NombreEnsayo(props) {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  async function IniciarEnsayo(){
    const token = localStorage.getItem("token");
    console.log("hola")
    try {
      const response = await axios.post(ApiurlGetIdEssayUser, {
        essay_id: props.idEnsayo
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      localStorage.setItem("new_id",response.data.new_id);
      console.log(response.data);
      window.location.href = "./Menu/" + props.urlEnsayo;
    } catch (error) {
      console.log(error);
    }
    
  }

  return (
    <div className="card p-3 mb-2">
      <div className="d-flex justify-content-between">
        <div className="d-flex flex-row align-items-center">
          <div className="iconMenu">
            {" "}
            <img className="logoMenu" src={props.imagen} alt="" />{" "}
          </div>
          <div className="ms-2 c-details">
            <h6 className="mb-0">{props.temario}</h6>
          </div>
        </div>
        <div className="badge ">
          {" "}
          <span>Ensayo</span>{" "}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="heading">
          Matemática(M1)
          <br />
          {props.temario}
        </h3>
        <div className="mt-4">
          <Button
            variant="dark"
            className={props.estadoBoton + " btn-lg m-2 "}
            onClick={handleShow}
          >
            Iniciar
          </Button>
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
        
        </Modal.Header>
        <Modal.Body  >
        <h2>{props.contentTitulo}</h2>
              
                <p className="modal-bodyText">{props.contentBody}</p>
        
            
             <div className="contentTipPAES"> <TipsPAES/></div> 
        
          <Button
            variant="dark"
            className={props.estadoBoton + " btn-lg m-2 "}
            onClick={IniciarEnsayo }
          >
            Iniciar
          </Button>
        </Modal.Body>
        
      </Modal>
    </div>
  );
}

export default NombreEnsayo;