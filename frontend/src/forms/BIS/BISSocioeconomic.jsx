import React from 'react';
import '../SetupProfile/css/multistep.css';

const SupportChoices = {
  SELF: 'self',
  BOTH_PARENTS: 'both_parents',
  FATHER_ONLY: 'father_only',
  MOTHER_ONLY: 'mother_only',
  SCHOLARSHIP: 'scholarship',
  COMBINATION: 'combination',
  OTHERS: 'others',
  GOV_FUNDED: 'gov_funded',
};

const BISSocioeconomic = ({ data, updateData }) => {
  const handleChange = (e, section) => {
    const { name, type, checked, value } = e.target;

    if (type === 'checkbox') {
      // Determine which section's support array to update
      const updatedSupport = new Set(data[section].support || []);

      if (checked) {
        updatedSupport.add(name);
      } else {
        updatedSupport.delete(name);
      }

      updateData({
        ...data,
        [section]: {
          ...data[section],
          support: Array.from(updatedSupport), 
        },
      });
    } else {
      updateData({
        ...data,
        [section]: {
          ...data[section],
          [name]: value, // Update the other fields in the section
        },
      });
    }
  };

  return (
    <div className="form-section">
      <h2 className="step-title">Socio-Economic Status</h2>

      <label className="form-label">What is your means of support for your college education?</label>
      <div className="checkbox-grid">
        {[
          { name: SupportChoices.SELF, label: 'Self-supporting' },
          { name: SupportChoices.BOTH_PARENTS, label: 'Both parents' },
          { name: SupportChoices.FATHER_ONLY, label: 'Father only' },
          { name: SupportChoices.MOTHER_ONLY, label: 'Mother only' },
          { name: SupportChoices.GOV_FUNDED, label: 'Government Funded' },
        ].map(({ name, label }) => (
          <label key={name} className="inline-checkbox">
            <input
              type="checkbox"
              name={name}
              checked={(data.student_support.support || []).includes(name)}
              onChange={(e) => handleChange(e, 'student_support')}
            />
            {label}
          </label>
        ))}

        {/* Scholarship + text input */}
        <label className="inline-checkbox">
          <input
            type="checkbox"
            name={SupportChoices.SCHOLARSHIP}
            checked={(data.student_support.support || []).includes(SupportChoices.SCHOLARSHIP)}
            onChange={(e) => handleChange(e, 'student_support')}
          />
          Scholarship
          {(data.student_support.support || []).includes(SupportChoices.SCHOLARSHIP) && (
            <input
              type="text"
              name="other_scholarship"
              placeholder="What Scholarship?"
              value={data.student_support.other_scholarship || ''}
              onChange={(e) => handleChange(e, 'student_support')}
              className="form-input"
            />
          )}
        </label>

        {/* Combination + input */}
        <label className="inline-checkbox">
          <input
            type="checkbox"
            name={SupportChoices.COMBINATION}
            checked={(data.student_support.support || []).includes(SupportChoices.COMBINATION)}
            onChange={(e) => handleChange(e, 'student_support')}
          />
          Combination of
          {(data.student_support.support || []).includes(SupportChoices.COMBINATION) && (
            <input
              type="text"
              name="combination_notes"
              placeholder="Combination of..."
              value={data.student_support.combination_notes || ''}
              onChange={(e) => handleChange(e, 'student_support')}
              className="form-input"
            />
          )}
        </label>

        {/* Others + input */}
        <label className="inline-checkbox">
          <input
            type="checkbox"
            name={SupportChoices.OTHERS}
            checked={(data.student_support.support || []).includes(SupportChoices.OTHERS)}
            onChange={(e) => handleChange(e, 'student_support')}
          />
          Others <span style={{ fontSize: '0.85em' }}>(aunts, uncles, etc. – pls. specify)</span>
          {(data.student_support.support || []).includes(SupportChoices.OTHERS) && (
            <input
              type="text"
              name="other_notes"
              placeholder="Specify..."
              value={data.student_support.other_notes || ''}
              onChange={(e) => handleChange(e, 'student_support')}
              className="form-input"
            />
          )}
        </label>
      </div>

      {/* Additional Text Inputs */}
      <div className="form-row full-width">
        <label className="form-label">
          What other scholarships do you have aside from UP Socialized Tuition System?
        </label>
        <textarea
          className="form-input"
          name="other_scholarship"
          value={data.socio_economic_status.scholarships || ''}
          onChange={(e) => handleChange(e, 'socio_economic_status')}
        />
      </div>

      <div className="form-row full-width">
        <label className="form-label">
          What are your privileges that you specified in the question above?
        </label>
        <textarea
          className="form-input"
          name="scholarship_privileges"
          value={data.socio_economic_status.scholarship_privileges || ''}
          onChange={(e) => handleChange(e, 'socio_economic_status')}

        />
      </div>

      <div className="form-row full-width">
        <label className="form-label">
          How much is your monthly allowance (in pesos) to be provided by your family when you reach college?
        </label>
        <input
          type="number"
          className="form-input"
          name="monthly_allowance"
          value={data.socio_economic_status.monthly_allowance || ''}
          onChange={(e) => handleChange(e, 'socio_economic_status')}
          step="0.01"
          min="0"
        />
      </div>

      <div className="form-row full-width">
        <label className="form-label">What do you spend much?</label>
        <input
          type="text"
          className="form-input"
          name="spending_habit"
          value={data.socio_economic_status.spending_habit || ''}
          onChange={(e) => handleChange(e, 'socio_economic_status')}
        />
      </div>
    </div>
  );
};

export default BISSocioeconomic;
