import React from 'react';

const BISPreferences = ({ data, updateData }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    updateData({
      ...data,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <div className="form-section">
      <h2 className="step-title">SCHOOL PREFERENCES</h2>

      <div className="form-group">
        <input
          type="text"
          name="influence"
          value={data.influence || ''}
          onChange={handleChange}
          placeholder=" "
        />
        <label>Who influenced you to study in UP Mindanao?</label>
      </div>

      <div className="form-group">
        <input
          type="text"
          name="reason_for_enrolling"
          value={data.reason_for_enrolling || ''}
          onChange={handleChange}
          placeholder=" "
        />
        <label>Indicate the reason/s of enrolling in this campus (UP Mindanao): </label>
      </div>

      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            name="transfer_plans"
            checked={data.transfer_plans || false}
            onChange={handleChange}
          />
          Do you have plans of transferring to another UP Campus by 2nd year?
        </label>
      </div>

      <div className="form-group">
        <input
          type="text"
          name="transfer_reason"
          value={data.transfer_reason || ''}
          onChange={handleChange}
          placeholder=" "
        />
        <label>If yes, why?</label>
      </div>

      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            name="shift_plans"
            checked={data.shift_plans || false}
            onChange={handleChange}
          />
          Do you have plans of shifting to another degree program by 2nd year?
        </label>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <input
            type="text"
            name="planned_shift_degree"
            value={data.planned_shift_degree || ''}
            onChange={handleChange}
            placeholder=" "
          />
          <label>If yes, what degree program?</label>
        </div>

        <div className="form-group">
          <input
            type="text"
            name="reason_for_shifting"
            value={data.reason_for_shifting || ''}
            onChange={handleChange}
            placeholder=" "
          />
          <label>Why?</label>
        </div>
      </div>
      
      {/* Missing Fields */}
      <div className="form-group">
        <input
          type="text"
          name="degree_program"
          value={data.degree_program || ''}
          onChange={handleChange}
          placeholder=" "
        />
        <label>If yes, what degree program?</label>
      </div>

      <div className="form-group">
        <input
          type="text"
          name="reason_for_degree"
          value={data.reason_for_degree || ''}
          onChange={handleChange}
          placeholder=" "
        />
        <label>Why?</label>
      </div>
    </div>
  );
};

export default BISPreferences;
