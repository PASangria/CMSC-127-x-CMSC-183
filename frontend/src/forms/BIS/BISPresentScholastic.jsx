import React from 'react';
import FormField from '../../components/FormField';
import '../SetupProfile/css/multistep.css';

const BISPresentScholastic = ({ data, updateData, errors, readOnly = false }) => {
  const handleChange = (e) => {
    if (readOnly) return;

    const { name, value } = e.target;

    let updatedData = {
      ...data,
      [name]: value,
    };

    if (
      (name === 'first_choice_course' || name === 'admitted_course') &&
      updatedData.first_choice_course === updatedData.admitted_course
    ) {
      updatedData = {
        ...updatedData,
        next_plan: '',
      };
    }

    updateData(updatedData);
  };

  const showNextPlanField =
    data.first_choice_course &&
    data.admitted_course &&
    data.first_choice_course !== data.admitted_course;

  return (
   <div className="form-section">
    <fieldset className="form-section" disabled={readOnly}>
      <h2 className="step-title">Present Scholastic Information</h2>

      <div className="form-row full-width">
        <label className="form-label">
          What course did you intend to take up after graduation from Senior High?
        </label>
        <input
          type="text"
          className="form-input"
          name="intended_course"
          value={data.intended_course || ''}
          onChange={handleChange}
        />
      </div>

      <div className="form-row full-width">
        <label className="form-label">
          What course did you indicate as 1st choice in the UPCAT application form?
        </label>
        <input
          type="text"
          className="form-input"
          name="first_choice_course"
          value={data.first_choice_course || ''}
          onChange={handleChange}
        />
      </div>

      <div className="form-row full-width">
        <label className="form-label">
          What course were you admitted to?
        </label>
        <input
          type="text"
          className="form-input"
          name="admitted_course"
          value={data.admitted_course || ''}
          onChange={handleChange}
        />
      </div>

      {showNextPlanField && (
        <div className="form-row full-width">
          <label className="form-label">
            If your 1st choice in UPCAT is different from your admitted course, what would be your next plan?
          </label>
          <input
            type="text"
            className="form-input"
            name="next_plan"
            value={data.next_plan || ''}
            onChange={handleChange}
          />
        </div>
      )}
    </fieldset>
  </div>
  );
};

export default BISPresentScholastic;
