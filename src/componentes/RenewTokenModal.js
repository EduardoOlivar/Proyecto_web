import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function RenewTokenModal(props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const timeLeft =  Date.now();
      if (timeLeft > 5 * 60 * 1000) {
        setShow(true);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [props.expiresAt]);

  const handleClose = () => setShow(false);

  const handleRenew = async () => {
    try {
      const refreshToken = String(localStorage.getItem('token'));
      const response = await axios.post('http://127.0.0.1:8000/api/token-refresh/', {
        refresh: refreshToken
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      const data = response.data;
      localStorage.setItem('token', data.access_token);
      setShow(false);
    } catch (error) {
      console.error(error);
      // Mostrar mensaje de error al usuario
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Renew Token</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Your session is about to expire. Would you like to renew your token?</p>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleRenew}>
          Renew
        </Button>
      </Modal.Body>
      <Modal.Footer>
        
      </Modal.Footer>
    </Modal>
  );
}

export default RenewTokenModal;