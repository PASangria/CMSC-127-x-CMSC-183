import React from 'react';
import '../SetupProfile/css/multistep.css'; 

const SCIFPersonalData = ({ data, updateData }) => {
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

      {/* Form Fields */}
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Student Number</label>
          <input
            type="text"
            className="form-input"
            value={data.studentNumber}
            onChange={(e) => updateData({ studentNumber: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Degree Program</label>
          <select
            className="form-input"
            value={data.degreeProgram}
            onChange={(e) => updateData({ degreeProgram: e.target.value })}
          >
            <option value="Bachelor of Science in Architecture">Bachelor of Science in Architecture</option>
            <option value="Bachelor of Arts in Communication and Media Arts">Bachelor of Arts in Communication and Media Arts</option>
            <option value="Bachelor of Arts in English (Creative Writing)">Bachelor of Arts in English (Creative Writing)</option>
            <option value="Bachelor of Science in Agribusiness Economics">Bachelor of Science in Agribusiness Economics</option>
            <option value="Bachelor of Science in Anthropology">Bachelor of Science in Anthropology</option>
            <option value="Bachelor of Science in Applied Mathematics">Bachelor of Science in Applied Mathematics</option>
            <option value="Bachelor of Science in Biology">Bachelor of Science in Biology</option>
            <option value="Bachelor of Science in Computer Science">Bachelor of Science in Computer Science</option>
            <option value="Bachelor of Science in Data Science">Bachelor of Science in Data Science</option>
            <option value="Bachelor of Science in Food Technology">Bachelor of Science in Food Technology</option>
            <option value="Bachelor of Science in Sport Science">Bachelor of Science in Sport Science</option>
            <option value="Associate in Arts in Sports Studies">Associate in Arts in Sports Studies</option>
            <option value="Diploma in Exercise and Sport Science">Diploma in Exercise and Sport Science</option>
            <option value="Master in Management">Master in Management</option>
            <option value="Master of Science in Food Science">Master of Science in Food Science</option>
            <option value="Master of Science in Human Movement Science">Master of Science in Human Movement Science</option>
          </select>
        </div>
      </div>

      {/* Date of Initial Entry Section */}
      <p className="form-subtitle">Date of Initial Entry</p>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Semester</label>
          <select
            className="form-input"
            value={data.semester}
            onChange={(e) => updateData({ semester: e.target.value })}
          >
            <option value="">Select Semester</option>
            <option value="First">First</option>
            <option value="Second">Second</option>
            <option value="Summer">Summer</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">School Year</label>
          <input
            type="text"
            className="form-input"
            placeholder="YYYY - YYYY"
            value={data.schoolYear}
            onChange={(e) => updateData({ schoolYear: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};

export default SCIFPersonalData;