import React from 'react';
import '../SetupProfile/css/multistep.css';

const SCIFOtherPersonalData = ({ data, updateData }) => {
  const handleCheckboxChange = (field, value) => {
    const updatedField = data[field] || [];
    if (updatedField.includes(value)) {
      updateData({
        ...data,
        [field]: updatedField.filter((item) => item !== value),
      });
    } else {
      updateData({
        ...data,
        [field]: [...updatedField, value],
      });
    }
  };

  return (
    <div className="form-section">
      <h2 className="step-title">Other Personal Data</h2>

      <div className="form-group full-width">
        <label>Why did you enroll in UP Mindanao?</label>
        <textarea
          className="large-textarea"
          value={data.enrollmentReason || ''}
          onChange={(e) => updateData({ ...data, enrollmentReason: e.target.value })}
          placeholder="Type..."
        ></textarea>
      </div>

      <div className="form-group">
        <label>Does your degree program lead to what you aspire in the future?</label>
        <select
          value={data.degreeProgramAspiration || ''}
          onChange={(e) => updateData({ ...data, degreeProgramAspiration: e.target.value })}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <div className="form-group full-width">
        <label>If not, why?</label>
        <textarea
          className="large-textarea"
          value={data.degreeProgramReason || ''}
          onChange={(e) => updateData({ ...data, degreeProgramReason: e.target.value })}
          placeholder="Type..."
        ></textarea>
      </div>

      <div className="form-group full-width">
        <label>What are your special talents and abilities?</label>
        <textarea
          className="large-textarea"
          value={data.specialTalents || ''}
          onChange={(e) => updateData({ ...data, specialTalents: e.target.value })}
          placeholder="Type..."
        ></textarea>
      </div>

      <div className="form-group full-width">
        <label>Specify the musical instruments you play:</label>
        <textarea
          className="large-textarea"
          value={data.musicalInstruments || ''}
          onChange={(e) => updateData({ ...data, musicalInstruments: e.target.value })}
          placeholder="Type..."
        ></textarea>
      </div>

      <div className="form-group full-width">
        <label>What are your hobbies?</label>
        <textarea
          className="large-textarea"
          value={data.hobbies || ''}
          onChange={(e) => updateData({ ...data, hobbies: e.target.value })}
          placeholder="Type..."
        ></textarea>
      </div>

      <div className="form-group full-width">
        <label>What do you like in people?</label>
        <textarea
          className="large-textarea"
          value={data.likesInPeople || ''}
          onChange={(e) => updateData({ ...data, likesInPeople: e.target.value })}
          placeholder="Type..."
        ></textarea>
      </div>

      <div className="form-group full-width">
        <label>What do you dislike in people?</label>
        <textarea
          className="large-textarea"
          value={data.dislikesInPeople || ''}
          onChange={(e) => updateData({ ...data, dislikesInPeople: e.target.value })}
          placeholder="Type..."
        ></textarea>
      </div>

      <div className="form-group">
        <label>With whom are you closest to?</label>
        <div className="checkbox-group">
          {['Father', 'Mother', 'Brother(s)', 'Other(s)'].map((relation) => (
            <label key={relation} className="checkbox-label">
              <input
                type="checkbox"
                value={relation}
                checked={(data.closestTo || []).includes(relation)}
                onChange={() => handleCheckboxChange('closestTo', relation)}
              />
              {relation}
            </label>
          ))}
        </div>
      </div>

      <div className="form-group full-width">
        <label>Personal characteristics as a person:</label>
        <textarea
          className="large-textarea"
          value={data.personalCharacteristics || ''}
          onChange={(e) => updateData({ ...data, personalCharacteristics: e.target.value })}
          placeholder="Type..."
        ></textarea>
      </div>

      <div className="form-group full-width">
        <label>To whom do you open up your problems? Why?</label>
        <textarea
          className="large-textarea"
          value={data.openUpTo || ''}
          onChange={(e) => updateData({ ...data, openUpTo: e.target.value })}
          placeholder="Type..."
        ></textarea>
      </div>

      <div className="form-group full-width">
        <label>Any problem that you might encounter later while in UP?</label>
        <textarea
          className="large-textarea"
          value={data.potentialProblems || ''}
          onChange={(e) => updateData({ ...data, potentialProblems: e.target.value })}
          placeholder="Type..."
        ></textarea>
      </div>

      <div className="form-group">
        <label>Any previous counseling?</label>
        <div className="checkbox-group">
          {['Yes', 'None'].map((option) => (
            <label key={option} className="checkbox-label">
              <input
                type="checkbox"
                value={option}
                checked={(data.previousCounseling || []).includes(option)}
                onChange={() => handleCheckboxChange('previousCounseling', option)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>If yes, when?</label>
          <input
            type="text"
            value={data.counselingWhen || ''}
            onChange={(e) => updateData({ ...data, counselingWhen: e.target.value })}
            placeholder="Type..."
          />
        </div>
        <div className="form-group">
          <label>To whom?</label>
          <input
            type="text"
            value={data.counselingToWhom || ''}
            onChange={(e) => updateData({ ...data, counselingToWhom: e.target.value })}
            placeholder="Type..."
          />
        </div>
      </div>
    </div>
  );
};

export default SCIFOtherPersonalData;