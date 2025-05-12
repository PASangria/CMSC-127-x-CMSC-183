import React from 'react';

const SCIFPersonalData = ({ data, updateData }) => {
  return (
    <div className="form-section">
      <h2 className="step-title">PERSONAL DATA</h2>

      {/* Name Fields */}
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Surname</label>
          <input
            type="text"
            className="form-input"
            value={data.surname}
            onChange={(e) => updateData({ surname: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="form-label">First Name</label>
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
          <label className="form-label">Middle Name</label>
          <input
            type="text"
            className="form-input"
            value={data.middleName}
            onChange={(e) => updateData({ middleName: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Nickname</label>
          <input
            type="text"
            className="form-input"
            value={data.nickname}
            onChange={(e) => updateData({ nickname: e.target.value })}
          />
        </div>
      </div>

      {/* Sex and Age */}
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Sex</label>
          <select
            className="form-input"
            value={data.sex}
            onChange={(e) => updateData({ sex: e.target.value })}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-input"
            value={data.age}
            onChange={(e) => updateData({ age: e.target.value })}
          />
        </div>
      </div>

      {/* Religion and Birth Rank */}
     <div className="form-row">
        <div className="form-group">
          <label className="form-label">Religion</label>
          <input
            type="text"
            className="form-input"
            value={data.religion}
            onChange={(e) => updateData({ religion: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Birth Rank</label>
          <input
            type="number"
            className="form-input"
            value={data.birthRank}
            onChange={(e) => updateData({ birthRank: e.target.value })}
          />
        </div>
      </div>

      {/* Birthdate and Address */}
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Birthdate</label>
          <input
            type="text"
            className="form-input"
            placeholder="MM/DD/YYYY"
            value={data.birthdate}
            onChange={(e) => updateData({ birthdate: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Home/Permanent Address</label>
          <input
            type="text"
            className="form-input"
            value={data.address}
            onChange={(e) => updateData({ address: e.target.value })}
          />
        </div>
      </div>

      {/* Contact Information */}
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Landline/Contact No.</label>
          <input
            type="text"
            className="form-input"
            value={data.landline}
            onChange={(e) => updateData({ landline: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className="form-input"
            value={data.email}
            onChange={(e) => updateData({ email: e.target.value })}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Cellphone/Mobile No.</label>
          <input
            type="text"
            className="form-input"
            value={data.mobile}
            onChange={(e) => updateData({ mobile: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};

export default SCIFPersonalData;