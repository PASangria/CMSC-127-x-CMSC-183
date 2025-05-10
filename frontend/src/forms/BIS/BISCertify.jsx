import React from 'react';

const BISCertify = ({ data, updateData }) => {
  const handleChange = (e) => {
    updateData(e.target.checked);
  };

  return (
    <div className="form-section">
      <h2 className="form-title">Certification</h2>
      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            checked={data || false}
            onChange={handleChange}
          />
          I certify that all facts and information stated in this form are true and correct.
        </label>
      </div>
    </div>
  );
};

export default BISCertify;
