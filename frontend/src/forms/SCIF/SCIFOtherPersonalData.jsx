import React from 'react';
import FormField from '../../components/FormField';
import '../SetupProfile/css/multistep.css';

const SCIFOtherPersonalData = ({ data, updateData }) => {
  const { personality_traits, family_relationship, counseling_info } = data;

  const handleCheckboxChange = (section, field, value) => {
    const currentValues = data[section][field] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];

    updateData(section, { [field]: newValues });
  };

  return (
    <div className="form-section">
      <h2 className="step-title">Other Personal Data</h2>

      <FormField
        label="Why did you enroll in UP Mindanao?"
        type="textarea"
        value={personality_traits.enrollment_reason}
        onChange={(e) =>
          updateData('personality_traits', { enrollment_reason: e.target.value })
        }
        helperText="Please explain the reason why you chose to enroll at UP Mindanao."
      />

      <FormField
        label="Does your degree program lead to what you aspire in the future?"
        type="select"
        value={personality_traits.degree_program_aspiration}
        onChange={(e) =>
          updateData('personality_traits', { degree_program_aspiration: e.target.value })
        }
        options={[
          { value: '', label: 'Select' },
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' },
        ]}
        helperText="Select 'Yes' if your current degree program aligns with your future goals."
      />

      <FormField
        label="If not, why?"
        type="textarea"
        value={personality_traits.aspiration_explanation}
        onChange={(e) =>
          updateData('personality_traits', { aspiration_explanation: e.target.value })
        }
        helperText="Please provide the reason if your degree program does not align with your future goals."
      />

      <FormField
        label="What are your special talents and abilities?"
        type="textarea"
        value={personality_traits.special_talents}
        onChange={(e) =>
          updateData('personality_traits', { special_talents: e.target.value })
        }
        helperText="Describe any special talents or abilities you possess."
      />

      <FormField
        label="Specify the musical instruments you play:"
        type="textarea"
        value={personality_traits.musical_instruments}
        onChange={(e) =>
          updateData('personality_traits', { musical_instruments: e.target.value })
        }
        helperText="List any musical instruments you can play and provide any relevant experience."
      />

      <FormField
        label="What are your hobbies?"
        type="textarea"
        value={personality_traits.hobbies}
        onChange={(e) =>
          updateData('personality_traits', { hobbies: e.target.value })
        }
        helperText="Share what activities or hobbies you enjoy in your free time."
      />

      <FormField
        label="What do you like in people?"
        type="textarea"
        value={personality_traits.likes_in_people}
        onChange={(e) =>
          updateData('personality_traits', { likes_in_people: e.target.value })
        }
        helperText="Describe the positive traits or qualities you appreciate in others."
      />

      <FormField
        label="What do you dislike in people?"
        type="textarea"
        value={personality_traits.dislikes_in_people}
        onChange={(e) =>
          updateData('personality_traits', { dislikes_in_people: e.target.value })
        }
        helperText="Describe the negative traits or qualities you dislike in others."
      />

        <label>With whom are you closest to?</label>
        <div className="checkbox-group">
          {['Father', 'Mother', 'Brother(s)', 'Other(s)'].map((relation) => (
            <label key={relation} className="checkbox-label">
              <input
                type="checkbox"
                value={relation}
                checked={(family_relationship.closest_to || []).includes(relation)}
                onChange={() =>
                  handleCheckboxChange('family_relationship', 'closest_to', relation)
                }
              />
              {relation}
            </label>
          ))}
        </div>
        <small className="helper-text">
          Select the people you are closest to in your family or personal circle.
        </small>

      <FormField
        label="Personal characteristics as a person:"
        type="textarea"
        value={counseling_info.personal_characteristics}
        onChange={(e) =>
          updateData('counseling_info', { personal_characteristics: e.target.value })
        }
        helperText="Describe your personal characteristics or traits that define who you are."
      />

      <FormField
        label="To whom do you open up your problems? Why?"
        type="textarea"
        value={counseling_info.problem_confidant}
        onChange={(e) =>
          updateData('counseling_info', { problem_confidant: e.target.value })
        }
        helperText="Mention the person or people you trust and open up to with your problems."
      />

      <FormField
        label="Any problem that you might encounter later while in UP?"
        type="textarea"
        value={counseling_info.anticipated_problems}
        onChange={(e) =>
          updateData('counseling_info', { anticipated_problems: e.target.value })
        }
        helperText="Are there any problems or challenges you foresee while studying at UP?"
      />

      <div className="form-group">
        <label>Any previous counseling?</label>
        <div className="checkbox-group">
          {['Yes', 'None'].map((option) => (
            <label key={option} className="checkbox-label">
              <input
                type="checkbox"
                value={option}
                checked={(counseling_info.previous_counseling || []).includes(option)}
                onChange={() =>
                  handleCheckboxChange('counseling_info', 'previous_counseling', option)
                }
              />
              {option}
            </label>
          ))}
        </div>
        <small className="helper-text">
          Indicate if you have had any previous counseling sessions.
        </small>
      </div>

      <div className="form-row">
        <FormField
          label="If yes, when?"
          type="text"
          value={counseling_info.counseling_location}
          onChange={(e) =>
            updateData('counseling_info', { counseling_location: e.target.value })
          }
          helperText="If you have had previous counseling, please mention when."
        />
        <FormField
          label="To whom?"
          type="text"
          value={counseling_info.counseling_reason}
          onChange={(e) =>
            updateData('counseling_info', { counseling_reason: e.target.value })
          }
          helperText="Mention the counselor or professional you consulted with."
        />
      </div>
    </div>
  );
};

export default SCIFOtherPersonalData;
