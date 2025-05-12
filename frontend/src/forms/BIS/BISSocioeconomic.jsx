import React from 'react';
import '../SetupProfile/css/multistep.css';

const BISSocioeconomic = ({ data, updateData }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    updateData({
      ...data,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <div className="form-section">
      <h2 className="step-title">SOCIO-ECONOMIC STATUS</h2>

      <label className="form-label">What is your means of support for your college education?</label>
      <div className="checkbox-grid">
        <label className="inline-checkbox">
          <input type="checkbox" name="self_supporting" checked={data.self_supporting || false} onChange={handleChange} />
          Self-supporting
        </label>

        <label className="inline-checkbox">
          <input type="checkbox" name="both_parents" checked={data.both_parents || false} onChange={handleChange} />
          Both parents
        </label>

        <label className="inline-checkbox">
          <input type="checkbox" name="father_only" checked={data.father_only || false} onChange={handleChange} />
          Father only
        </label>

        <label className="inline-checkbox">
          <input type="checkbox" name="mother_only" checked={data.mother_only || false} onChange={handleChange} />
          Mother only
        </label>

        <label className="inline-checkbox">
          <input type="checkbox" name="government_funded" checked={data.government_funded || false} onChange={handleChange} />
          Government Funded
        </label>

        <label className="inline-checkbox">
          <input type="checkbox" name="scholarship" checked={data.scholarship || false} onChange={handleChange} />
          Scholarship
          {data.scholarship && (
            <input
              type="text"
              name="scholarships"
              placeholder="What Scholarship?"
              value={data.scholarships || ''}
              onChange={handleChange}
            />
          )}
        </label>

        <label className="inline-checkbox">
          <input type="checkbox" name="combination" checked={data.combination || false} onChange={handleChange} />
          Combination of
          {data.combination && (
            <input
              type="text"
              name="combination_details"
              placeholder="Combination of..."
              value={data.combination_details || ''}
              onChange={handleChange}
            />
          )}
        </label>

        <label className="inline-checkbox">
          <input type="checkbox" name="others" checked={data.others || false} onChange={handleChange} />
          Others <span style={{ fontSize: '0.85em' }}>(aunts, uncles, etc. – pls. specify)</span>
          {data.others && (
            <input
              type="text"
              name="others_details"
              placeholder="Specify..."
              value={data.others_details || ''}
              onChange={handleChange}
            />
          )}
        </label>
      </div>

      <div className="form-row full-width">
        <label className="form-label">What other scholarships do you have aside from UP Socialized Tuition System?</label>
        <textarea
          className="form-input"
          name="other_scholarships"
          value={data.other_scholarships || ''}
          onChange={handleChange}
        />
      </div>

      <div className="form-row full-width">
        <label className="form-label">What are your privileges that you specified in no. (5)?</label>
        <textarea
          className="form-input"
          name="scholarship_privileges"
          value={data.scholarship_privileges || ''}
          onChange={handleChange}
        />
      </div>

      <div className="form-row full-width">
        <label className="form-label">How much is your monthly allowance to be provided by your family when you reach college?</label>
        <input
          type="text"
          className="form-input"
          name="monthly_allowance"
          value={data.monthly_allowance || ''}
          onChange={handleChange}
        />
      </div>

      <div className="form-row full-width">
        <label className="form-label">What do you spend much?</label> 
        <input
          type="text"
          className="form-input"
          name="spending_habit"
          value={data.spending_habit || ''}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default BISSocioeconomic;
