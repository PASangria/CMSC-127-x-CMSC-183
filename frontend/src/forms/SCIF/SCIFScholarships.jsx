import React from 'react';
import FormField from '../../components/FormField'; // Assuming FormField is in the same directory

const SCIFScholarships = ({ data, updateData }) => {
  const handleChange = (newValue) => {
    // Update the formData with the new value from the textarea
    updateData({ scholarships_and_assistance: newValue });
  };

  return (
    <div className="form-section">
      <h2 className="step-title">List of Scholarships & Financial Assistance While in College</h2>

      <FormField
        label="List your Scholarship/s and Financial Assistance here:"
        type="textarea"
        value={data.scholarships_and_assistance || ''}
        onChange={(e) => handleChange(e.target.value)}
        required={false}
        helperText="Please include any scholarships, financial aid, or other assistance you are receiving. Please skip if none."
      />
    </div>
  );
};

export default SCIFScholarships;
