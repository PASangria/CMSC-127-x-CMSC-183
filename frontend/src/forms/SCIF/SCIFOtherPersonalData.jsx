import React from 'react';
import FormField from '../../components/FormField';
import '../SetupProfile/css/multistep.css';

const SCIFOtherPersonalData = ({ data, updateData, readOnly=false }) => {
  const { personality_traits, family_relationship, counseling_info } = data;

  const handleFieldChange = (section, field, value) => {
    if (readOnly) return;
    updateData(section, { [field]: value });
  };

  const previousCounselingOptions = [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' }
  ];


  const closestOptions = [
    { value: 'Father', label: 'Father' },
    { value: 'Mother', label: 'Mother' },
    { value: 'Brother', label: 'Brother(s)' },
    { value: 'Sister', label: 'Sister(s)' },
    { value: 'Other', label: 'Others (specify)' }
  ];

  return (
    <div className="form-section">
      <fieldset className="form-section" disabled={readOnly}>

      <h2 className="step-title">Other Personal Data</h2>

      {/* Personality Traits Fields */}
      <FormField
        label="Why did you enroll in UP Mindanao?"
        type="textarea"
        value={personality_traits.enrollment_reason}
        onChange={(e) =>
          handleFieldChange('personality_traits', 'enrollment_reason', e.target.value)
        }
        helperText="Please explain the reason why you chose to enroll at UP Mindanao."
      />

      <FormField
        label="Does your degree program lead to what you aspire in the future?"
        type="select"
        value={personality_traits.degree_program_aspiration}
        onChange={(e) =>
          handleFieldChange('personality_traits', 'degree_program_aspiration', e.target.value === 'true')
        }
        options={[
          { value: '', label: 'Select' },
          { value: 'true', label: 'Yes' },
          { value: 'false', label: 'No' },
        ]}
        helperText="Select 'Yes' if your current degree program aligns with your future goals."
      />

      <FormField
        label="If not, why?"
        type="textarea"
        value={personality_traits.aspiration_explanation}
        onChange={(e) =>
          handleFieldChange('personality_traits', 'aspiration_explanation', e.target.value)
        }
        helperText="Please provide the reason if your degree program does not align with your future goals."
      />

      <FormField
        label="What are your special talents and abilities?"
        type="textarea"
        value={personality_traits.special_talents}
        onChange={(e) =>
          handleFieldChange('personality_traits', 'special_talents', e.target.value)
        }
        helperText="Describe any special talents or abilities you possess."
      />

      <FormField
        label="Specify the musical instruments you play:"
        type="textarea"
        value={personality_traits.musical_instruments}
        onChange={(e) =>
          handleFieldChange('personality_traits', 'musical_instruments', e.target.value)
        }
        helperText="List any musical instruments you can play and provide any relevant experience."
      />

      <FormField
        label="What are your hobbies?"
        type="textarea"
        value={personality_traits.hobbies}
        onChange={(e) =>
          handleFieldChange('personality_traits', 'hobbies', e.target.value)
        }
        helperText="Share what activities or hobbies you enjoy in your free time."
      />

      <FormField
        label="What do you like in people?"
        type="textarea"
        value={personality_traits.likes_in_people}
        onChange={(e) =>
          handleFieldChange('personality_traits', 'likes_in_people', e.target.value)
        }
        helperText="Describe the positive traits or qualities you appreciate in others."
      />

      <FormField
        label="What do you dislike in people?"
        type="textarea"
        value={personality_traits.dislikes_in_people}
        onChange={(e) =>
          handleFieldChange('personality_traits', 'dislikes_in_people', e.target.value)
        }
        helperText="Describe the negative traits or qualities you dislike in others."
      />

      {/* Family Relationship Fields */}
      <label>With whom are you closest to?</label>
      <small className="helper-text">
        Select the person you are closest to in your family or personal circle.
      </small>
      <div className="radio-group">
        {closestOptions.map((relation) => (
          <label key={relation.value} className="radio-label">
            <input
              type="radio"
              name="closest_to"
              value={relation.value}
              checked={family_relationship.closest_to === relation.value}
              onChange={() =>
                handleFieldChange('family_relationship', 'closest_to', relation.value)
              }
            />
            {relation.label}
          </label>
        ))}
      </div>
      

      {family_relationship.closest_to === 'other' && (
        <FormField
          label="Others (specify)"
          type="textarea"
          value={family_relationship.specify_other || ''}
          onChange={(e) =>
            handleFieldChange('family_relationship', 'specify_other', e.target.value)
          }
          helperText="If 'Other' is selected, please specify."
        />
      )}

      {/* Counseling Information Fields */}
      <FormField
        label="Personal characteristics as a person:"
        type="textarea"
        value={counseling_info.personal_characteristics}
        onChange={(e) =>
          handleFieldChange('counseling_info', 'personal_characteristics', e.target.value)
        }
        helperText="Describe your personal characteristics or traits that define who you are."
      />

      <FormField
        label="To whom do you open up your problems?"
        type="textarea"
        value={counseling_info.problem_confidant}
        onChange={(e) =>
          handleFieldChange('counseling_info', 'problem_confidant', e.target.value)
        }
        helperText="Mention the person or people you trust and open up to with your problems."
      />

      <FormField
        label="Why?"
        type="textarea"
        value={counseling_info.confidant_reason}
        onChange={(e) =>
          handleFieldChange('counseling_info', 'confidant_reason', e.target.value)
        }
        helperText="Explain why you open up to that person."
      />

      <FormField
        label="Any problem that you might encounter later while in UP?"
        type="textarea"
        value={counseling_info.anticipated_problems}
        onChange={(e) =>
          handleFieldChange('counseling_info', 'anticipated_problems', e.target.value)
        }
        helperText="Are there any problems or challenges you foresee while studying at UP?"
      />

     <FormField
          label="Any previous counseling?"
          type="radio"
          name="previous_counseling"
          value={counseling_info.previous_counseling}
          onChange={(e) =>
            handleFieldChange('counseling_info', 'previous_counseling', e.target.value === 'true')
          }
          options={previousCounselingOptions}
          helperText="Indicate if you have had any previous counseling sessions."
        />

      {counseling_info.previous_counseling === true && (
        <>
          <FormField
            label="If yes, where?"
            type="text"
            value={counseling_info.counseling_location || ''}
            onChange={(e) =>
              handleFieldChange('counseling_info', 'counseling_location', e.target.value)
            }
            helperText="If you have had previous counseling, please mention where."
          />
          <FormField
            label="Why?"
            type="text"
            value={counseling_info.counseling_reason || ''}
            onChange={(e) =>
              handleFieldChange('counseling_info', 'counseling_reason', e.target.value)
            }
            helperText="Mention the reason for the previous counseling."
          />
        </>
      )}
      </fieldset>
    </div>
  );
};

export default SCIFOtherPersonalData;
