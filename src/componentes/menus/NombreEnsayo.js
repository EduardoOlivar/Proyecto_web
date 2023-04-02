import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "universal-cookie";
import TipsPAES from "./TipsPAES";


const cookies = new Cookies();
function NombreEnsayo(props) {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

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
        <Modal.Body  closeButton>
        <h2>{props.contentTitulo}</h2>
              
                <p className="modal-bodyText">{props.contentBody}</p>
        
            
              
         <TipsPAES/>
          <Button
            variant="dark"
            className={props.estadoBoton + " btn-lg m-2 "}
            onClick={() =>
              (window.location.href = "./Menu/" + props.urlEnsayo)
            }
          >
            Iniciar
          </Button>
        </Modal.Body>
        
      </Modal>
    </div>
  );
}

export default NombreEnsayo;