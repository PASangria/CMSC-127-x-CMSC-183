import React from 'react';
import '../SetupProfile/css/multistep.css';
import DisplayField from '../../components/DisplayField'; // Reusable field for read-only display

const SCIFCredentials = ({ data }) => {
  if (!data) return <div>Loading...</div>;

  return (
    <div className="form-section">
      <h2 className="step-title">STUDENT CREDENTIALS</h2>

      {/* Read-Only Fields */}
      <div className="form-row">
        <div className="form-group">
          <DisplayField label="Student Number" value={data.student_number} />
        </div>
        <div className="form-group">
          <DisplayField label="Degree Program" value={data.degree_program} />
        </div>
      </div>

      {/* Date of Initial Entry Section */}
      <p className="step-info">Date of Initial Entry</p>
      <div className="form-row">
        <div className="form-group">
          <DisplayField label="Semester" value={data.date_initial_entry_sem} />
        </div>
         <div className="form-group">
            <DisplayField label="Academic Year" value={data.date_initial_entry} />
        </div>
      </div>
    </div>
  );
};

export default SCIFCredentials;
