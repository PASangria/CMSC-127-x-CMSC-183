import React from 'react';
import '../SetupProfile/css/multistep.css';

const BISPresentScholastic = ({ data, updateData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData({ ...data, [name]: value });
  };

  return (
    <div className="form-section">
      <h2 className="form-title">Present Scholastic Information</h2>
      <div className="form-grid">
        <div className="form-group">
          <input
            type="text"
            name="intended_course"
            value={data.intended_course || ''}
            onChange={handleChange}
            placeholder=" "
          />
          <label>Intended Course</label>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="first_choice_course"
            value={data.first_choice_course || ''}
            onChange={handleChange}
            placeholder=" "
          />
          <label>First Choice Course</label>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="admitted_course"
            value={data.admitted_course || ''}
            onChange={handleChange}
            placeholder=" "
          />
          <label>Admitted Course</label>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="next_plan"
            value={data.next_plan || ''}
            onChange={handleChange}
            placeholder=" "
          />
          <label>Next Plan</label>
        </div>
      </div>
    </div>
  );
};

export default BISPresentScholastic;
