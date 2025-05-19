import React, { useState } from 'react';
import FormField from '../../components/FormField'; // Import the FormField component
import '../SetupProfile/css/multistep.css'; // Ensure your styles are applied
import { useEnumChoices } from '../../utils/enumChoices';

const SCIFPreviousSchoolRecord = ({ data, updateData, readOnly=false }) => {
  const [schoolRecords, setSchoolRecords] = useState(data || []);
  const getField = (name) => `${prefix}_${name}`;
  const { enums, loading, error } = useEnumChoices();

  const handleFieldChange = (index, field, value) => {
    if (readOnly) return;
    const updatedRecords = [...schoolRecords];
    const path = field.split('.');

    let target = updatedRecords[index];
    for (let i = 0; i < path.length - 1; i++) {
        target = target[path[i]] ||= {}; 
      }

      target[path[path.length - 1]] = value;

      setSchoolRecords(updatedRecords);
      updateData(updatedRecords);
  };


  const addSchoolRecord = () => {
    const newRecord = {
      student_number: '',
      school: {
        name: '',
        school_address: {
          address_line_1: '',
          barangay: '',
          city_municipality: '',
          province: '',
          region: '',
          zip_code: ''
        }
      },
      education_level: '',
      start_year: '',
      end_year: '',
      honors_received: '',
      senior_high_gpa: '',
      submission: '',
    };
    const updatedRecords = [...schoolRecords, newRecord];
    setSchoolRecords(updatedRecords);
    updateData(updatedRecords);  
  };

  const removeSchoolRecord = (index) => {
    const updatedRecords = schoolRecords.filter((_, i) => i !== index);
    setSchoolRecords(updatedRecords);
    updateData(updatedRecords);  // Updating the parent component's state
  };

  return (
    <div className="form-section">
      <fieldset className="form-section" disabled={readOnly}>
      <h2 className="step-title">Previous School Record</h2>

      {/* Render multiple previous school records */}
    {schoolRecords.map((record, index) => (
        <div key={index} className="school-record">
          <h3>School Record {index + 1}</h3>

          {/* School Name */}
          <FormField
            label="School Name"
            type="text"
            value={record.school.name || ''}
            onChange={(e) => handleFieldChange(index, 'school.name', e.target.value)}
          />
          {/* School Address */}
          <h3>School {index + 1} Address</h3>
          <div className="form-row three-columns">
            <FormField
              label="Address Line 1"
              type="text"
              value={record.school.school_address.address_line_1}
              onChange={(e) => handleFieldChange(index, 'school.school_address.address_line_1', e.target.value)}
            />
            <FormField
              label="Barangay"
              type="text"
              value={record.school.school_address.barangay}
              onChange={(e) => handleFieldChange(index, 'school.school_address.barangay', e.target.value)}
            />
            <FormField
              label="City/Municipality"
              type="text"
              value={record.school.school_address.city_municipality}
              onChange={(e) => handleFieldChange(index, 'school.school_address.city_municipality', e.target.value)}
            />
          </div>
          <div className="form-row three-columns">
            <FormField
              label="Province"
              type="text"
              value={record.school.school_address.province}
              onChange={(e) => handleFieldChange(index, 'school.school_address.province', e.target.value)}
            />
            <div className="form-group">
              <FormField
                label="Region"
                type="select"
                value={record.school.school_address.region}  // This binds the value to the region field inside the record object
                onChange={(e) => handleFieldChange(index, 'school.school_address.region', e.target.value)}  // Update the specific field when the value changes
                required  // Optional: Make it required if needed
                error={error}  // Optional: Handle any validation error
                options={
                  loading ? [{ value: "", label: "Loading regions..." }] :  // Placeholder text if loading
                  error ? [{ value: "", label: "Error loading regions" }] :  // Placeholder text if there's an error
                  enums?.region || []  
                }
              />
            </div>

            <FormField
              label="ZIP Code"
              type="text"
              value={record.school.school_address.zip_code}
              onChange={(e) => handleFieldChange(index, 'school.school_address.zip_code', e.target.value)}
            />
          </div>

          {/* Education Level */}
          <div className="form-row three-columns">
            <FormField
              label="Education Level"
              type="select"
              value={record.education_level}
              onChange={(e) => handleFieldChange(index, 'education_level', e.target.value)}
              options={[
                { value: '', label: 'Select Education Level' },
                { value: 'Primary', label: 'Primary' },
                { value: 'Junior High', label: 'Junior High' },
                { value: 'Senior High', label: 'Senior High' },
                { value: 'College', label: 'College' }
              ]}
            />

            {/* Start Year and End Year */}
            <FormField
              label="Start Year"
              type="number"
              value={record.start_year}
              onChange={(e) => handleFieldChange(index, 'start_year', +e.target.value)}  
            />
            <FormField
              label="End Year"
              type="number"
              value={record.end_year}
              onChange={(e) => handleFieldChange(index, 'end_year', +e.target.value)} 
            />
          </div>

          {/* Honors Received */}
          <FormField
            label="Honors Received"
            type="text"
            value={record.honors_received}
            onChange={(e) => handleFieldChange(index, 'honors_received', e.target.value)}
          />

          {/* Senior High GPA */}
          {record.education_level === 'Senior High' && (
            <FormField
              label="Senior High GPA"
              type="number"
              value={record.senior_high_gpa}
              onChange={(e) => handleFieldChange(index, 'senior_high_gpa', e.target.value)}
            />
          )}

          {/* Button to remove the school record */}
          <button type="button" onClick={() => removeSchoolRecord(index)}>Remove Record</button>
        </div>
      ))}

      {/* Button to add a new school record */}
      <button type="button" onClick={addSchoolRecord}>Add Another School Record</button>
      </fieldset>
    </div>
  );
};

export default SCIFPreviousSchoolRecord;
