import React from 'react';
import '../SetupProfile/css/multistep.css';
import DisplayField from '../../components/DisplayField'; // Reusable field for read-only display

const SCIFPersonalData = ({ data }) => {
  if (!data) return <div>Loading...</div>;

  return (
    <div className="form-section">
      <h2 className="step-title">STUDENT CREDENTIALS</h2>
      <p className="form-subtitle">Recent 2x2 Colored ID Picture</p>

      {/* File Upload Section */}
      <div className="file-upload">
        <label htmlFor="idPicture" className="file-upload-label">
          <span>Link</span> or drag and drop your signature here.
        </label>
        <input
          type="file"
          id="idPicture"
          className="file-input"
          accept="image/png, image/jpeg, image/gif"
          onChange={(e) => updateData({ idPicture: e.target.files[0] })}
        />
        <p className="file-upload-hint">SVG, PNG, JPG or GIF (max. 3MB)</p>
      </div>

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
      <p className="form-subtitle">Date of Initial Entry</p>
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

export default SCIFPersonalData;
