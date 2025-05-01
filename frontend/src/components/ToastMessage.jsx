import React, { useEffect } from 'react';
import './css/ToastMessage.css';

const ToastMessage = ({ message, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="toast-message">
      {message}
    </div>
  );
};

export default ToastMessage;