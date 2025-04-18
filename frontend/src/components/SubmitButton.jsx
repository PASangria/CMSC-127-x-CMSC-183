// components/SubmitButton.jsx
import React from 'react';
import './css/submitButton.css'; 

const SubmitButton = ({
  type = "submit",      
  onClick,               
  loading = false,      
  text = "Submit",     
  loadingText = "Submitting...",
  disabled = false,      
  className = "",       
  ...props              
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`submit-button ${className}`}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? loadingText : text}
    </button>
  );
};

export default SubmitButton;
