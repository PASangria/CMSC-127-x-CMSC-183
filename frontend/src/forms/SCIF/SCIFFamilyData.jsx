import React, { useState } from 'react';
import FormField from '../../components/FormField'; // Import your FormField component
import '../SetupProfile/css/multistep.css';
import Button from '../../components/UIButton';

const SCIFFamilyData = ({ data, updateData, readOnly = false }) => {
  const { family_data, siblings } = data;

  const [languageInput, setLanguageInput] = useState(family_data.guardian?.language_dialect?.join(', ') || '');

  const normalizeNumber = (value) => {
    return value === '' ? null : Number(value);
  };

  const handleFieldChange = (section, field, value) => {
    if (readOnly) return;
    updateData('family_data', {
      ...family_data,
      [section]: {
        ...family_data[section],
        [field]: value,
      },
    });
  };

  const addSibling = () => {
    if (Array.isArray(siblings)) {
      updateData('siblings', [
        ...siblings,
        {
          first_name: '',
          last_name: '',
          sex: '',
          age: null,
          job_occupation: '',
          company_school: '',
          educational_attainment: '',
          students: [],
        },
      ]);
    } else {
      updateData('siblings', [{
        first_name: '',
        last_name: '',
        sex: '',
        age: null,
        job_occupation: '',
        company_school: '',
        educational_attainment: '',
        students: [],
      }]);
    }
  };

  const removeSibling = (index) => {
    updateData('siblings', siblings.filter((_, i) => i !== index));
  };

  const handleSiblingChange = (index, field, value) => {
    if (readOnly) return;

    updateData('siblings', siblings.map((sibling, i) =>
      i === index ? { ...sibling, [field]: value } : sibling
    ));
  };

  const handleLanguageChange = (e) => {
    if (readOnly) return;

    const value = e.target.value;
    setLanguageInput(value);
    handleFieldChange('guardian', 'language_dialect', value.split(',').map(s => s.trim()).filter(Boolean));
  };

  return (
    <div className="form-section">
      <fieldset className="form-section" disabled={readOnly}>
      <h2 className="step-title">Family Data</h2>

      {/* Father */}
      <section className='subsection-form  family-data-father'>
        <p className='step-info'><strong>FATHER</strong></p>
        <div className="form-row three-columns">
          <FormField
            label="Father's Name"
            type="text"
            value={family_data.father?.first_name || ''}
            onChange={(e) =>
              handleFieldChange('father', 'first_name', e.target.value)
            }
          />
          <FormField
            label="Father's Last Name"
            type="text"
            value={family_data.father?.last_name || ''}
            onChange={(e) =>
              handleFieldChange('father', 'last_name', e.target.value)
            }
          />
          <FormField
            label="Age"
            type="number"
            value={family_data.father?.age ?? ''}
            onChange={(e) =>
              handleFieldChange('father', 'age', normalizeNumber(e.target.value))
            }
          />
        </div>
        <div className="form-row three-columns">
          <FormField
            label="Highest Educational Attainment"
            type="text"
            value={family_data.father?.highest_educational_attainment || ''}
            onChange={(e) =>
              handleFieldChange('father', 'highest_educational_attainment', e.target.value)
            }
          />
          <FormField
            label="Job/Occupation"
            type="text"
            value={family_data.father?.job_occupation || ''}
            onChange={(e) =>
              handleFieldChange('father', 'job_occupation', e.target.value)
            }
          />
          <FormField
            label="Contact Number"
            type="text"
            value={family_data.father?.contact_number || ''}
            onChange={(e) =>
              handleFieldChange('father', 'contact_number', e.target.value)
            }
          />
        </div>
        <div className="form-row three-columns">
          <div>
            <FormField
              label="Company/Agency"
              type="text"
              value={family_data.father?.company_agency || ''}
              onChange={(e) =>
                handleFieldChange('father', 'company_agency', e.target.value)
              }
            />
          </div>
          <div className="span-two-columns">
            <FormField
              label="Company Address"
              type="text"
              value={family_data.father?.company_address || ''}
              onChange={(e) =>
                handleFieldChange('father', 'company_address', e.target.value)
              }
            />
          </div>
        </div>
      </section>

      {/* Mother */}
      <section className='subsection-form  family-data-mother'>
        <p className='step-info'><strong>MOTHER</strong></p>
        <div className="form-row three-columns">
          <FormField
            label="Mother's Name"
            type="text"
            value={family_data.mother?.first_name || ''}
            onChange={(e) =>
              handleFieldChange('mother', 'first_name', e.target.value)
            }
          />
          <FormField
            label="Mother's Last Name"
            type="text"
            value={family_data.mother?.last_name || ''}
            onChange={(e) =>
              handleFieldChange('mother', 'last_name', e.target.value)
            }
          />
          <FormField
            label="Age"
            type="number"
            value={family_data.mother?.age ?? ''}
            onChange={(e) =>
              handleFieldChange('mother', 'age', normalizeNumber(e.target.value))
            }
          />
        </div>
        <div className="form-row three-columns">
          <FormField
            label="Highest Educational Attainment"
            type="text"
            value={family_data.mother?.highest_educational_attainment || ''}
            onChange={(e) =>
              handleFieldChange('mother', 'highest_educational_attainment', e.target.value)
            }
          />
          <FormField
            label="Job/Occupation"
            type="text"
            value={family_data.mother?.job_occupation || ''}
            onChange={(e) =>
              handleFieldChange('mother', 'job_occupation', e.target.value)
            }
          />
          <FormField
            label="Contact Number"
            type="text"
            value={family_data.mother?.contact_number || ''}
            onChange={(e) =>
              handleFieldChange('mother', 'contact_number', e.target.value)
            }
          />
        </div>
        <div className="form-row three-columns">
          <div>
            <FormField
              label="Company/Agency"
              type="text"
              value={family_data.mother?.company_agency || ''}
              onChange={(e) =>
                handleFieldChange('mother', 'company_agency', e.target.value)
              }
            />
          </div>
          <div className="span-two-columns">
            <FormField
              label="Company Address"
              type="text"
              value={family_data.mother?.company_address || ''}
              onChange={(e) =>
                handleFieldChange('mother', 'company_address', e.target.value)
              }
            />
          </div>
        </div>
      </section>

      {/* Siblings */}
      <section className="subsection-form  family-data-sibling">
        <p className='step-info'><strong>SIBLINGS</strong></p>
        {Array.isArray(siblings) && siblings.map((sibling, index) => (
          <div key={index} className="sibling-section">
            <div className="form-row three-columns">
              <FormField
                label="First Name"
                type="text"
                value={sibling.first_name}
                onChange={(e) => handleSiblingChange(index, 'first_name', e.target.value)}
              />
              <FormField
                label="Last Name"
                type="text"
                value={sibling.last_name}
                onChange={(e) => handleSiblingChange(index, 'last_name', e.target.value)}
              />
              <FormField
                label="Sex"
                type="select"
                value={sibling.sex}
                onChange={(e) => handleSiblingChange(index, 'sex', e.target.value)}
                options={[
                  { value: '', label: 'Select' },
                  { value: 'Male', label: 'Male' },
                  { value: 'Female', label: 'Female' },
                ]}
              />
            </div>
            <div className="form-row">
              <FormField
                label="Age"
                type="number"
                value={sibling.age ?? ''}
                onChange={(e) => handleSiblingChange(index, 'age', normalizeNumber(e.target.value))}
              />
              <FormField
                label="Job/Occupation"
                type="text"
                value={sibling.job_occupation}
                onChange={(e) => handleSiblingChange(index, 'job_occupation', e.target.value)}
              />
            </div>
            <div className="form-row">
              <FormField
                label="Company/School"
                type="text"
                value={sibling.company_school}
                onChange={(e) => handleSiblingChange(index, 'company_school', e.target.value)}
              />
              <FormField
                label="Educational Attainment"
                type="text"
                value={sibling.educational_attainment}
                onChange={(e) => handleSiblingChange(index, 'educational_attainment', e.target.value)}
              />
            </div>
            <div className="step-button-form">
              <Button
                    variant="secondary"
                    onClick={() => removeSibling(index)}
                    style={{ marginLeft: '0.5rem' }}
                  >
                    Remove Sibling
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => addSibling}
                    style={{ marginLeft: '0.5rem' }}
                  >
                    Add Sibling
                  </Button>
              </div>
          </div>
        ))}
      </section>

      {/* Guardian */}
      <section className='subsection-form family-data-guardian'>
        <p className='step-info'><strong>GUARDIAN</strong></p>
        <div className="form-row">
          <FormField
            label="Guardian's First Name"
            type="text"
            value={family_data.guardian?.first_name || ''}
            onChange={(e) =>
              handleFieldChange('guardian', 'first_name', e.target.value)
            }
          />
          <FormField
            label="Guardian's Last Name"
            type="text"
            value={family_data.guardian?.last_name || ''}
            onChange={(e) =>
              handleFieldChange('guardian', 'last_name', e.target.value)
            }
          />
          </div>
          <div className="form-row">
          <FormField
            label="Contact Number"
            type="text"
            value={family_data.guardian?.contact_number || ''}
            onChange={(e) =>
              handleFieldChange('guardian', 'contact_number', e.target.value)
            }
          />
          <FormField
            label="Address"
            type="text"
            value={family_data.guardian?.address || ''}
            onChange={(e) =>
              handleFieldChange('guardian', 'address', e.target.value)
            }
          />
          </div>
        <div className="form-row">
          <FormField
            label="Relationship to Guardian"
            type="text"
            value={family_data.guardian?.relationship_to_guardian || ''}
            onChange={(e) =>
              handleFieldChange('guardian', 'relationship_to_guardian', e.target.value)
            }
          />
          <FormField
            label="Languages/Dialect Spoken at Home"
            type="text"
            value={languageInput}
            onChange={handleLanguageChange}
            helperText="e.g., Tagalog, English"
          />
        </div>
      </section>
      </fieldset>
    </div>
  );
};

export default SCIFFamilyData;
