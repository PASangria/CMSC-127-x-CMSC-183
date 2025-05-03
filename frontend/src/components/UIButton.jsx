import React from 'react';
import './css/ui.css';

const Button = ({ children, onClick, type = 'button', variant = 'primary', ...props }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn ${variant === 'secondary' ? 'btn-secondary' : 'btn-primary'}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;