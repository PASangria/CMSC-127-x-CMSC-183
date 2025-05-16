import React from 'react';
import '../SetupProfile/css/multistep.css';

const SCIFScholarships = ({ data, updateData }) => {
  return (
    <div className="form-section">
      <h2 className="step-title">List of Scholarships & Financial Assistance While in College</h2>

      <div className="form-group full-width">
        <label>List your Scholarship/s and Financial Assistance here:</label>
        <textarea
          className="large-textarea"
          value={data || ''}
          onChange={(e) => updateData(e.target.value)}
          placeholder="Scholarship..."
        ></textarea>
      </div>
    </div>
  );
};

export default SCIFScholarships;