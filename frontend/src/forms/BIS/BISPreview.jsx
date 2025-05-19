import React from 'react';
import './../SetupProfile/css/multistep.css';
import './../../components/css/modal.css'; // For modal styles
import DisplayField from '../../components/DisplayField';
import BISSocioeconomic from './BISSocioeconomic';
import BISCertify from './BISCertify';
import BISPresentScholastic from './BISPresentScholastic';
import BISPreferences from './BISPreferences';

const BISPreview = ({ profileData, formData, onClose }) => {
  const { scholastic_status, preferences, certify } = formData;

  return (
    <div className="modal-overlay">
      <div className="modal-content large-modal">
        <button className="modal-close" onClick={onClose}>×</button>

        <div className="form-container">
          <h1 className="step-title">Basic Information Sheet</h1>
          <p className='step-info'>(Preview)</p>

          {/* PERSONAL DATA */}
          <div className="form-section">
            <h2 className="step-title">Personal Data</h2>
            <p className='step-info'>If you wish to update information in this section, please go to your profile and update it.</p>
            <div className="form-row">
              <DisplayField label="First Name" value={profileData.first_name} />
              <DisplayField label="Last Name" value={profileData.last_name} />
            </div>
            <div className="form-row">
              <DisplayField label="Middle Name" value={profileData.middle_name} />
              <DisplayField label="Nickname" value={profileData.nickname} />
            </div>
            <div className="form-row">
              <DisplayField label="Year" value={profileData.current_year_level} />
              <DisplayField label="Degree Program" value={profileData.degree_program} />
            </div>
          </div>

          {/* SOCIO-ECONOMIC STATUS */}
            < BISSocioeconomic data={{ socio_economic_status: formData.socio_economic_status,
                    student_support: formData.student_support }} readOnly={true} />

          {/* SCHOOL PREFERENCES */}
          <BISPreferences data={formData.preferences} readOnly={true} />

          {/* SCHOLASTIC STATUS */}
          <BISPresentScholastic data={formData.scholastic_status} readOnly={true} />

          {/* PRIVACY CERTIFICATION */}
          <BISCertify data={formData} readOnly={true} />
        </div>
      </div>
    </div>
  );
};

export default BISPreview;
