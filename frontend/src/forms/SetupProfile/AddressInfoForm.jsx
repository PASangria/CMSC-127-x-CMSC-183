import React from 'react';
import FormField from '../../components/FormField';
import './css/multistep.css';
import { useEnumChoices } from '../../utils/enumChoices';

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

  const { enums, loading, error } = useEnumChoices();

  return (
    <div className='form-container'>
      <h2 className='step-title'>{addressLabel}</h2>

      {checkboxLabel && (
        <label className='step-info'>
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
            label="Address Line 1 "
            name={getField("address_line_1")}
            value={formData[getField("address_line_1")]}
            onChange={handleChange}
            required
            disabled={disabled}
          />
        </div>
        <div className="form-group">
          <FormField
            label="Address Line 2 "
            name={getField("address_line_2")}
            value={formData[getField("address_line_2")]}
            onChange={handleChange}
            disabled={disabled}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <FormField
          label="Region"
          type="select"
          name={getField("region")}
          value={formData[getField("region")]}
          onChange={handleChange}
          required
          disabled={disabled || loading}
          error={error}
          options={
            loading ? [{ value: "", label: "Loading regions..." }] :
            error ? [{ value: "", label: "Error loading regions" }] :
            enums?.region || []
          }
        />
        </div>
        <div className="form-group">
          <FormField
            label="Province "
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
            label="City/Municipality "
            name={getField("city_municipality")}
            value={formData[getField("city_municipality")]}
            onChange={handleChange}
            required
            disabled={disabled}
          />
        </div>
        <div className="form-group">
          <FormField
            label="Barangay "
            name={getField("barangay")}
            value={formData[getField("barangay")]}
            onChange={handleChange}
            required
            disabled={disabled}
          />
        </div>
        <div className="form-group">
          <FormField
            label="Zip code "
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
