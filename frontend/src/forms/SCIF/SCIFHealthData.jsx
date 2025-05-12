import React from 'react';
import '../SetupProfile/css/multistep.css';

const SCIFHealthData = ({ data, updateData }) => {
  const handleCheckboxChange = (condition) => {
    const updatedConditions = data.healthCondition || [];
    if (updatedConditions.includes(condition)) {
      // Remove the condition if it's already selected
      updateData({
        ...data,
        healthCondition: updatedConditions.filter((item) => item !== condition),
      });
    } else {
      // Add the condition if it's not selected
      updateData({
        ...data,
        healthCondition: [...updatedConditions, condition],
      });
    }
  };

  return (
    <div className="form-section">
      <h2 className="step-title">Health Data</h2>

      {/* Health Condition */}
      <div className="form-group">
        <label className="form-label">Health Condition:</label>
        <div className="checkbox-group">
          {['Excellent', 'Very Good', 'Good', 'Poor'].map((condition) => (
            <label key={condition} className="checkbox-label">
              <input
                type="checkbox"
                name="healthCondition"
                value={condition}
                checked={(data.healthCondition || []).includes(condition)}
                onChange={() => handleCheckboxChange(condition)}
              />
              {condition}
            </label>
          ))}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Height (m):</label>
          <input
            type="number"
            step="0.01"
            value={data.height || ''}
            onChange={(e) => updateData({ ...data, height: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Weight (kg):</label>
          <input
            type="number"
            step="0.01"
            value={data.weight || ''}
            onChange={(e) => updateData({ ...data, weight: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Eye Sight:</label>
          <select
            value={data.eyeSight || ''}
            onChange={(e) => updateData({ ...data, eyeSight: e.target.value })}
          >
            <option value="">Select</option>
            <option value="Good">Good</option>
            <option value="Poor">Poor</option>
          </select>
        </div>
        <div className="form-group">
          <label>Hearing:</label>
          <select
            value={data.hearing || ''}
            onChange={(e) => updateData({ ...data, hearing: e.target.value })}
          >
            <option value="">Select</option>
            <option value="Good">Good</option>
            <option value="Poor">Poor</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Any Physical Disability:</label>
          <input
            type="text"
            value={data.disability || ''}
            onChange={(e) => updateData({ ...data, disability: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Common/ Frequent Ailment:</label>
          <input
            type="text"
            value={data.ailment || ''}
            onChange={(e) => updateData({ ...data, ailment: e.target.value })}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Last Hospitalization (MM/DD/YYYY):</label>
          <input
            type="date"
            value={data.lastHospitalization || ''}
            onChange={(e) => updateData({ ...data, lastHospitalization: e.target.value })}
          />
        </div>
        <div className="form-group full-width">
          <label>Reason for Hospitalization:</label>
          <textarea
            className="large-textarea"
            value={data.hospitalizationReason || ''}
            onChange={(e) => updateData({ ...data, hospitalizationReason: e.target.value })}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default SCIFHealthData;