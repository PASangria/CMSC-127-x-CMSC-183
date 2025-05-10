import React from 'react';

const BISSocioeconomic = ({ data, updateData }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    updateData({
      ...data,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <div>
      <h2>Socio-Economic Status</h2>
      <label>
        Has Scholarship:
        <input
          type="checkbox"
          name="has_scholarship"
          checked={data.has_scholarship || false}
          onChange={handleChange}
        />
      </label>
      <label>
        Scholarships:
        <input
          type="text"
          name="scholarships"
          value={data.scholarships || ''}
          onChange={handleChange}
        />
      </label>
      <label>
        Scholarship Privileges:
        <input
          type="text"
          name="scholarship_privileges"
          value={data.scholarship_privileges || ''}
          onChange={handleChange}
        />
      </label>
      <label>
        Monthly Allowance:
        <input
          type="text"
          name="monthly_allowance"
          value={data.monthly_allowance || ''}
          onChange={handleChange}
        />
      </label>
      <label>
        Spending Habit:
        <input
          type="text"
          name="spending_habit"
          value={data.spending_habit || ''}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default BISSocioeconomic;