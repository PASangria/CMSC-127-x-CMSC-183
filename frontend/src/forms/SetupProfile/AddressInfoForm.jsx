import React from 'react';
import FormField from '../../components/FormField'; // Adjust path as needed
import './css/multistep.css';

const AddressInfoForm = ({
  formData,
  setFormData,
  step,
  disabled,
  addressLabel,
  checkboxLabel,
  sameAsPermanent,
  handleSameAsPermanentToggle,
  prefix
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getField = (name) => `${prefix}_${name}`;

  const regionOptions = [
    { value: 'REGION_I', label: 'Ilocos Region' },
    { value: 'REGION_II', label: 'Cagayan Valley' },
    { value: 'REGION_III', label: 'Central Luzon' },
    { value: 'REGION_IV_A', label: 'CALABARZON' },
    { value: 'REGION_IV_B', label: 'MIMAROPA' },
    { value: 'REGION_V', label: 'Bicol Region' },
    { value: 'REGION_VI', label: 'Western Visayas' },
    { value: 'REGION_VII', label: 'Central Visayas' },
    { value: 'REGION_VIII', label: 'Eastern Visayas' },
    { value: 'REGION_IX', label: 'Zamboanga Peninsula' },
    { value: 'REGION_X', label: 'Northern Mindanao' },
    { value: 'REGION_XI', label: 'Davao Region' },
    { value: 'REGION_XII', label: 'SOCCSKSARGEN' },
    { value: 'REGION_XIII', label: 'Caraga' },
    { value: 'REGION_CAR', label: 'Cordillera Administrative Region' },
    { value: 'REGION_NCR', label: 'National Capital Region' }
  ];

  return (
    <div className='form-container'>
      <h2 className='step-title'>{addressLabel}</h2>

      {checkboxLabel && (
        <label>
          <input
            type="checkbox"
            checked={sameAsPermanent}
            onChange={handleSameAsPermanentToggle}
          />
          &nbsp;{checkboxLabel}
        </label>
      )}

      <div className="form-row">
        <div className="form-group">
          <FormField
            label="Address Line 1 *"
            name={getField("address_line_1")}
            value={formData[getField("address_line_1")]}
            onChange={handleChange}
            required
            disabled={disabled}
          />
        </div>
        <div className="form-group">
          <FormField
            label="Address Line 2 *"
            name={getField("address_line_2")}
            value={formData[getField("address_line_2")]}
            onChange={handleChange}
            disabled={disabled}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor={getField("region")}>Region *</label>
          <select
            name={getField("region")}
            id={getField("region")}
            value={formData[getField("region")]}
            onChange={handleChange}
            required
            disabled={disabled}
          >
            <option value="">Select Region</option>
            {regionOptions.map((region) => (
              <option key={region.value} value={region.value}>
                {region.label}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <FormField
            label="Province *"
            name={getField("province")}
            value={formData[getField("province")]}
            onChange={handleChange}
            required
            disabled={disabled}
          />
        </div>
      </div>

      <div className="form-row three-columns">
        <div className="form-group">
          <FormField
            label="City/Municipality *"
            name={getField("city_municipality")}
            value={formData[getField("city_municipality")]}
            onChange={handleChange}
            required
            disabled={disabled}
          />
        </div>
        <div className="form-group">
          <FormField
            label="Barangay *"
            name={getField("barangay")}
            value={formData[getField("barangay")]}
            onChange={handleChange}
            required
            disabled={disabled}
          />
        </div>
        <div className="form-group">
          <FormField
            label="Zip code *"
            name={getField("zip_code")}
            value={formData[getField("zip_code")]}
            onChange={handleChange}
            required
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
};

export default AddressInfoForm;
