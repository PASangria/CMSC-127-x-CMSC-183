import React from 'react';
import './css/displayfield.css';

const DisplayField = ({ label, value }) => {
  const isFilled = value && value.toString().trim().length > 0;

  return (
    <div className={`display-group ${value ? 'filled' : ''}`}>
      <label className="display-label">{label}</label>
      <div className="display-value">{value || 'N/A'}</div>
    </div>

  );
};

export default DisplayField;
