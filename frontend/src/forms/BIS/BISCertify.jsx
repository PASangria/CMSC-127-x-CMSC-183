import React from 'react';
import '../SetupProfile/css/multistep.css';

const BISCertify = ({ data, updateData, showError }) => {
  const hasConsented = data?.privacy_consent?.has_consented || false;

  const handleChange = (e) => {
    const isChecked = e.target.checked;
    updateData(isChecked);
  };

  return (
    <div className="form-section">
      <h2 className="form-title">Privacy Statement</h2>

      <p className="privacy-description">
        The University of the Philippines takes your privacy seriously and we are committed to protecting your personal information.
        For the UP Privacy Policy, please visit{' '}
        <a
          href="https://privacy.up.edu.ph"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://privacy.up.edu.ph
        </a>.
      </p>

      <div className="certify-agreement">
        <label className="form-label">
          <input
            type="checkbox"
            name="has_consented"
            checked={hasConsented}
            onChange={handleChange}
            className="certify-checkbox"
          />
          <span className="certify-text">
              I have read the University of the Philippines’ Privacy Notice for Students.
            I understand that for the UP System to carry out its mandate under the 1987 Constitution, the UP Charter, and other laws,
            the University must necessarily process my personal and sensitive personal information.
            Therefore, I recognize the authority of the University of the Philippines to process my personal and sensitive personal
            information, pursuant to the UP Privacy Notice and applicable laws.
          </span>
        </label>

        {showError && !hasConsented && (
          <div className="error-message">
            <span>Please agree to the privacy notice to proceed.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BISCertify;
