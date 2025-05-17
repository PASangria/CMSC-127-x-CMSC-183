import React from 'react';
import FormField from '../../components/FormField'; 
import '../SetupProfile/css/multistep.css';

const SCIFHealthData = ({ data, updateData }) => {

  // Update Health Condition (single value)
  const handleHealthConditionChange = (condition) => {
    updateData({
      ...data,
      health_condition: condition, 
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
                name="health_condition"
                value={condition}
                checked={data.health_condition === condition} // Check if this condition is selected
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
          value={data.eye_sight || ''}
          onChange={(e) => updateData({ ...data, eye_sight: e.target.value })}
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
          value={data.physical_disabilities || ''}
          onChange={(e) => updateData({ ...data, physical_disabilities: e.target.value })}
        />

        {/* Ailment */}
        <FormField
          label="Common/ Frequent Ailment"
          type="text"
          value={data.common_ailments || ''}
          onChange={(e) => updateData({ ...data, common_ailments: e.target.value })}
        />
      </div>

      <div className='custom-form-row'>
        {/* Last Hospitalization */}
        <FormField
          label="Last Hospitalization (MM/DD/YYYY)"
          type="date"
          value={data.last_hospitalization || ''}
          onChange={(e) => updateData({ ...data, last_hospitalization: e.target.value })}
          className="custom-form-input form-input"
        />

        {/* Reason for Hospitalization (Textarea Field using FormField) */}
        <FormField
          label="Reason for Hospitalization"
          type="textarea"
          value={data.reason_of_hospitalization || ''}
          onChange={(e) => updateData({ ...data, reason_of_hospitalization: e.target.value })}
          className="custom-form-input form-input"
        />
      </div>
    </div>
  );
};

export default SCIFHealthData;
