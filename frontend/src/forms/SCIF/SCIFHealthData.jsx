import React from 'react';
import FormField from '../../components/FormField'; // Assuming you placed FormField component in the correct directory
import '../SetupProfile/css/multistep.css';

const SCIFHealthData = ({ data, updateData }) => {

  // Update Health Condition (single value)
  const handleHealthConditionChange = (condition) => {
    updateData({
      ...data,
      healthCondition: condition, // Set the selected condition as the value
    });
  };

  return (
    <div className="form-section">
      <h2 className="step-title">Health Data</h2>

      {/* Health Condition (Radio Buttons) */}
      <div className="radio-form">
        <label className="form-label">Health Condition:</label>
        <div className="radio-group">
          {['Excellent', 'Very Good', 'Good', 'Poor'].map((condition) => (
            <label key={condition} className="radio-label">
              <input
                type="radio"
                name="healthCondition"
                value={condition}
                checked={data.healthCondition === condition} // Check if this condition is selected
                onChange={() => handleHealthConditionChange(condition)} // Update state on change
              />
              {condition}
            </label>
          ))}
        </div>
      </div>

      {/* Height */}
      <div className='form-row'>
        <FormField
          label="Height (m)"
          type="number"
          value={data.height || ''}
          onChange={(e) => updateData({ ...data, height: e.target.value })}
        />

        {/* Weight */}
        <FormField
          label="Weight (kg)"
          type="number"
          value={data.weight || ''}
          onChange={(e) => updateData({ ...data, weight: e.target.value })}
        />
      </div>

      <div className='form-row'>
        {/* Eye Sight */}
        <FormField
          label="Eye Sight"
          type="select"
          value={data.eyeSight || ''}
          onChange={(e) => updateData({ ...data, eyeSight: e.target.value })}
          options={[
            { value: '', label: 'Select' },
            { value: 'Good', label: 'Good' },
            { value: 'Medium', label: 'Medium' },
            { value: 'Poor', label: 'Poor' },
          ]}
        />

        {/* Hearing */}
        <FormField
          label="Hearing"
          type="select"
          value={data.hearing || ''}
          onChange={(e) => updateData({ ...data, hearing: e.target.value })}
          options={[
            { value: '', label: 'Select' },
            { value: 'Good', label: 'Good' },
            { value: 'Medium', label: 'Medium' },
            { value: 'Poor', label: 'Poor' },
          ]}
        />
      </div>

      <div className='form-row'>
      {/* Disability */}
      <FormField
        label="Any Physical Disability"
        type="text"
        value={data.disability || ''}
        onChange={(e) => updateData({ ...data, disability: e.target.value })}
      />

      {/* Ailment */}
      <FormField
        label="Common/ Frequent Ailment"
        type="text"
        value={data.ailment || ''}
        onChange={(e) => updateData({ ...data, ailment: e.target.value })}
      />
      </div>
      <div className='custom-form-row'>
          {/* Last Hospitalization */}
          <FormField
            label="Last Hospitalization (MM/DD/YYYY)"
            type="date"
            value={data.lastHospitalization || ''}
            onChange={(e) => updateData({ ...data, lastHospitalization: e.target.value })}
            className="custom-form-input form-input"
          />

          {/* Reason for Hospitalization (Textarea Field using FormField) */}
          <FormField
            label="Reason for Hospitalization"
            type="textarea"
            value={data.hospitalizationReason || ''}
            onChange={(e) => updateData({ ...data, hospitalizationReason: e.target.value })}
            className="custom-form-input form-input"
          />
        </div>
      </div>
  );
};

export default SCIFHealthData;
