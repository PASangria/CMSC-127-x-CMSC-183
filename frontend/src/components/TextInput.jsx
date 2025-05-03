import React from 'react';
import './css/ui.css';

const TextInput = ({ label, value, onChange, placeholder, type = 'text', ...props }) => {
    return (
      <div className="form-group">
        {label && <label className="form-label">{label}</label>}
        <input
          type={type}
          className="form-input"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          {...props}
        />
      </div>
    );
  };
  
  export default TextInput;