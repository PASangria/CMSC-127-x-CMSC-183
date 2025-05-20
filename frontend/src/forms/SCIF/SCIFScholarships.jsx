import React from 'react';
import FormField from '../../components/FormField'; // Assuming FormField is in the same directory

const SCIFScholarships = ({ data, updateData, readOnly = false }) => {
  const handleChange = (newValue) => {
    if (readOnly) return;
    const scholarshipsArray = newValue.split('\n').map(item => item.trim()).filter(item => item); // Filter out empty strings
    updateData({ scholarships_and_assistance: scholarshipsArray });
  };

  return (
    <div className="form-section">
      <fieldset className="form-section" disabled={readOnly}>
      <h2 className="step-title">List of Scholarships & Financial Assistance While in College</h2>

      <FormField
        label="List your Scholarship/s and Financial Assistance here:"
        type="textarea"
        value={(Array.isArray(data.scholarships_and_assistance) ? data.scholarships_and_assistance : []).join('\n') || ''} // Ensure it's an array before using .join
        onChange={(e) => handleChange(e.target.value)}
        required={false}
        helperText="Please include any scholarships, financial aid, or other assistance you are receiving. Please skip if none."
      />
      </fieldset>
    </div>
  );
};

export default SCIFScholarships;
