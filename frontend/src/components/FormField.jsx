import React from 'react';
import './css/formfield.css';

const FormField = ({ label, type = "text", value, onChange, name, required, error }) => {
  const isFilled = value && value.trim().length > 0;

  return (
    <div className={`form-group ${error ? 'error' : ''}`}>
      <input
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        required={required}
        className={`form-input ${isFilled ? 'filled' : ''}`}
      />
      <label className={isFilled ? 'active' : ''}>{label}</label>

      {/* Show error message only when there's an error */}
      {error && <div className="error-message">This field is required</div>}
    </div>
  );
};

export default FormField;
