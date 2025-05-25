// components/Modal.jsx
import React from "react";
import "../components/css/Modal.css";

const Modal = ({ children }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      {children}
    </div>
  </div>
);

export default Modal;
