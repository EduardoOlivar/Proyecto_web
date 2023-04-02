import React, { useState } from 'react';

function Modal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div className="modal-wrapper" style={{ display: isModalOpen ? 'block' : 'none' }}>
      <div className="modal">
        <button className="close" onClick={closeModal}>X</button>
        <h2>Modal Title</h2>
        <p>Modal content goes here</p>
      </div>
      <div className="modal-background" onClick={closeModal}></div>
    </div>
  );
}

export default Modal;