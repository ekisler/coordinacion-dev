import React from 'react';
import "../Teachers/Teachers.css"

const ModalClose = ({ onClose }) => {
  return (
    <button onClick={onClose} className="close-button">
      &times;
    </button>
  );
};

export default ModalClose;
