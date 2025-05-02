import React from 'react';
import './css/ModalMessage.css';
import { useNavigate } from 'react-router-dom';

const ModalMessage = ({ message, onClose }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    onClose();
    navigate('/login');
  };

  const handleSignup = () => {
    onClose();
    navigate('/signup');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Access Restricted</h2>
        <p>{message}</p>

        <button onClick={handleLogin} className="login-btn">Log In</button>

        <p className="signup-text">
          Don't have an account yet?{' '}
          <span className="signup-link" onClick={handleSignup}>Sign Up</span>.
        </p>

        <button className="close-btn" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default ModalMessage;
