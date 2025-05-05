import React from 'react';
import './css/displayfield.css';

const DisplayField = ({ label, value }) => {
  const isFilled = value && value.toString().trim().length > 0;

  return (
    <div className={`display-group ${isFilled ? 'filled' : ''}`}>
      <div className="display-value">{value}</div>
      <label className="display-label">{label}</label>
    </div>
  );
};

export default DisplayField;
