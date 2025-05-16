import React from 'react';
import './css/formfield.css';

const FormField = ({
  label,
  type = "text",
  value,
  onChange,
  name,
  required,
  error,
  options, // for select fields
  disabled,
  ...rest
}) => {
  const isFilled = value && value.toString().trim().length > 0;

  return (
    <div className={`form-group ${error ? 'error' : ''}`}>
      {type === 'select' ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={`form-input ${isFilled ? 'filled' : ''}`}
          {...rest}
        >
          <option value=""></option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          name={name}
          required={required}
          className={`form-input ${isFilled ? 'filled' : ''}`}
          {...rest}
        />
      )}
      <label className={isFilled ? 'active' : ''}>{label} {required && '*'}</label>
      {error && <div className="error-message">This field is required</div>}
    </div>
  );
};

export default FormField;
