import React from 'react';

const BISPersonalData = ({ data, updateData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData({ ...data, [name]: value });
  };

  return (
    <div className="step-form">
      <h2 className="step-title">Personal Data</h2>
      <label>
        Surname:
        <input
          type="text"
          name="surname"
          value={data.surname || ''}
          onChange={handleChange}
        />
      </label>
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={data.firstName || ''}
          onChange={handleChange}
        />
      </label>
      <label>
        Middle Name:
        <input
          type="text"
          name="middleName"
          value={data.middleName || ''}
          onChange={handleChange}
        />
      </label>
      <label>
        Nickname:
        <input
          type="text"
          name="nickname"
          value={data.nickname || ''}
          onChange={handleChange}
        />
      </label>
      <label>
        Year:
        <input
          type="text"
          name="year"
          value={data.year || ''}
          onChange={handleChange}
        />
      </label>
      <label>
        Program/Course:
        <input
          type="text"
          name="programCourse"
          value={data.programCourse || ''}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default BISPersonalData;