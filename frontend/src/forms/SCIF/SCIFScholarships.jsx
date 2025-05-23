import React from 'react';
import FormField from '../../components/FormField';

const SCIFScholarships = ({ data, updateData, readOnly = false }) => {
  const handleChange = (newValue) => {
    if (readOnly) return;
    const scholarshipsArray = newValue
      .split('\n')
      .map(item => item.trim())
      .filter(item => item); // Filter out empty strings
    updateData({ scholarships_and_assistance: scholarshipsArray });
  };

  const scholarships = Array.isArray(data.scholarships_and_assistance)
    ? data.scholarships_and_assistance
    : [];

  return (
    <div className="form-section">
      <fieldset className="form-section" disabled={readOnly}>
        <h2 className="step-title">List of Scholarships & Financial Assistance While in College</h2>

        {readOnly && scholarships.length === 0 ? (
          <p style={{ fontStyle: 'italic', color: '#666' }}>None</p>
        ) : (
          <FormField
            label="List your Scholarship/s and Financial Assistance here:"
            type="textarea"
            value={scholarships.join('\n')}
            onChange={(e) => handleChange(e.target.value)}
            required={false}
            helperText="Please include any scholarships, financial aid, or other assistance you are receiving. Please skip if none."
          />
        )}
      </fieldset>
    </div>
  );
};

export default SCIFScholarships;
