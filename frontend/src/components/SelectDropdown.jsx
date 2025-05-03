import React from 'react';
import './css/ui.css';

const SelectDropdown = ({ label, options = [], value, onChange, placeholder, ...props }) => {
    return (
      <div className="form-group">
        {label && <label className="form-label">{label}</label>}
        <select className="form-input" value={value} onChange={onChange} {...props}>
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt, i) => (
            <option key={i} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    );
  };
  
  export default SelectDropdown;