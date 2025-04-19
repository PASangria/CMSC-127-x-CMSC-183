// components/FormField.jsx
import React from 'react';
import './css/formfield.css'; // We'll style it here

const FormField = ({ label, type = "text", value, onChange, name, required, placeholder }) => {
  const isFilled = value && value.length > 0;

  return (
    <div className="form-group">
      <input
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        required={required}
        className={isFilled ? 'filled' : ''}
        placeholder={placeholder}
      />
      <label className={isFilled ? 'active' : ''}>{label}</label>
    </div>
  );
};

export default FormField;
