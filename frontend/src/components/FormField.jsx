import React from 'react';
import './css/formfield.css';

const FormField = ({ label, type = "text", value, onChange, name, required, error, ...rest }) => {
  const isFilled = value && value.toString().trim().length > 0;

  return (
    <div className={`form-group ${error ? 'error' : ''}`}>
      <input
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        required={required}
        className={`form-input ${isFilled ? 'filled' : ''}`}
        {...rest} 
      />
      <label className={isFilled ? 'active' : ''}>{label}</label>
      {error && <div className="error-message">This field is required</div>}
    </div>
  );
};


export default FormField;
