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
  options,
  disabled,
  helperText,
  ...rest
}) => {
  const isFilled = value && value.toString().trim().length > 0;

  const handleFocus = (e) => {
    if (e.target.setSelectionRange) {
      e.target.setSelectionRange(0, 0); // Set cursor at the beginning of the textarea
    }
  };

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
      ) : type === 'textarea' ? (
        <textarea
          value={value}
          onChange={onChange}
          name={name}
          required={required}
          className={`form-input ${isFilled ? 'filled' : ''}`}
          onFocus={handleFocus} // Ensure focus is at the start of the textarea
          {...rest}
        />
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
      {helperText && <small className="helper-text">{helperText}</small>}
    </div>
  );
};

export default FormField;
