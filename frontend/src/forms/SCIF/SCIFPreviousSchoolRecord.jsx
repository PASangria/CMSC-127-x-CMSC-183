import React, { useState } from 'react';
import FormField from '../../components/FormField'; // Import the FormField component
import '../SetupProfile/css/multistep.css'; // Ensure your styles are applied

const SCIFPreviousSchoolRecord = ({ data, updateData }) => {
  // State to hold multiple previous school records
  const [schoolRecords, setSchoolRecords] = useState(data || []);

  // Function to handle adding a new school record
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
      senior_high_gpa: ''
    };
    const updatedRecords = [...schoolRecords, newRecord];
    setSchoolRecords(updatedRecords);
    updateData(updatedRecords);  // Updating the parent component's state
  };

  const handleFieldChange = (index, field, value) => {
    const updatedRecords = [...schoolRecords];
    if (field.includes('school_address')) {
      const [addressField] = field.split('.').slice(-1); // Address fields like 'address_line_1'
      updatedRecords[index].school.school_address[addressField] = value;
    } else {
      updatedRecords[index][field] = value;
    }
    setSchoolRecords(updatedRecords);
    updateData(updatedRecords);  // Updating the parent component's state
  };

  // Function to handle removing a school record
  const removeSchoolRecord = (index) => {
    const updatedRecords = schoolRecords.filter((_, i) => i !== index);
    setSchoolRecords(updatedRecords);
    updateData(updatedRecords);  // Updating the parent component's state
  };

  return (
    <div className="form-section">
      <h2 className="step-title">Previous School Record</h2>

      {/* Render multiple previous school records */}
      {schoolRecords.map((record, index) => (
        <div key={index} className="school-record">
          <h3>School Record {index + 1}</h3>

          {/* School Name */}
          <FormField
            label="School Name"
            type="text"
            value={record.school.name}
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
            <FormField
              label="Region"
              type="text"
              value={record.school.school_address.region}
              onChange={(e) => handleFieldChange(index, 'school.school_address.region', e.target.value)}
            />
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
              onChange={(e) => handleFieldChange(index, 'start_year', e.target.value)}
            />
            <FormField
              label="End Year"
              type="number"
              value={record.end_year}
              onChange={(e) => handleFieldChange(index, 'end_year', e.target.value)}
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
    </div>
  );
};

export default SCIFPreviousSchoolRecord;
