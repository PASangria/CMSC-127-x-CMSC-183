import React from 'react';
import FormField from '../../components/FormField';
import '../SetupProfile/css/multistep.css';

const BISPresentScholastic = ({ data, updateData, errors }) => {
  const handleChange = (e) => {
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
      <h2 className="form-title">Present Scholastic Information</h2>
      <div className="form-grid">
        <FormField
          label="What course did you intend to take up after graduation from Senior High?"
          name="intended_course"
          value={data.intended_course || ''}
          onChange={handleChange}
        />

        <FormField
          label="What course did you indicate as 1st choice in the UPCAT application form?"
          name="first_choice_course"
          value={data.first_choice_course || ''}
          onChange={handleChange}
        />

        <FormField
          label="What course were you admitted?"
          name="admitted_course"
          value={data.admitted_course || ''}
          onChange={handleChange}
        />

        {showNextPlanField && (
          <FormField
            label="If your 1st choice in UPCAT is different from your admitted course, what would be your next plan?"
            name="next_plan"
            value={data.next_plan || ''}
            onChange={handleChange}
          />
        )}
      </div>
    </div>
  );
};

export default BISPresentScholastic;
