import React from 'react';

const BISPersonalData = ({ data, updateData }) => {
  return (
    <div className="form-section">
      <h2 className="step-title">PERSONAL DATA</h2>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Surname:</label>
          <input
            type="text"
            className="form-input"
            value={data.surname}
            onChange={(e) => updateData({ surname: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="form-label">First Name:</label>
          <input
            type="text"
            className="form-input"
            value={data.firstName}
            onChange={(e) => updateData({ firstName: e.target.value })}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Middle Name:</label>
          <input
            type="text"
            className="form-input"
            value={data.middleName}
            onChange={(e) => updateData({ middleName: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Nickname:</label>
          <input
            type="text"
            className="form-input"
            value={data.nickname}
            onChange={(e) => updateData({ nickname: e.target.value })}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Year:</label>
          <input
            type="text"
            className="form-input"
            value={data.year}
            onChange={(e) => updateData({ year: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Program/Course:</label>
          <input
            type="text"
            className="form-input"
            value={data.programCourse}
            onChange={(e) => updateData({ programCourse: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};

export default BISPersonalData;