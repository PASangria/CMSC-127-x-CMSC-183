import React, { useState, useEffect } from 'react';
import FormField from '../../components/FormField'; // Adjust path as needed
import './css/multistep.css';
import { useEnumChoices } from '../../utils/enumChoices'  

const EducationInfoForm = ({ formData, setFormData }) => {
  const { enums, loading, error } = useEnumChoices(); 
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validation function
  const validateForm = () => {
    const validationErrors = {};

    // Validate Student Number (e.g., "1234-12345")
    const studentNumberPattern = /^\d{4}-\d{5}$/;
    if (!formData.student_number || !studentNumberPattern.test(formData.student_number)) {
      validationErrors.student_number = 'Student number is required and must be in the format: 1234-12345';
    }

    // Validate current_year_level
    if (!formData.current_year_level) {
      validationErrors.current_year_level = 'Please select your current year level.';
    }

    // Validate college
    if (!formData.college) {
      validationErrors.college = 'Please select your college/department.';
    }

    // Validate degreeProgram
    if (!formData.degree_program) {
      validationErrors.degree_program = 'Please select your degree program.';
    }

    setErrors(validationErrors);
    
    return Object.keys(validationErrors).length === 0;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error}</div>;
  }

  return (
    <div className='form-container'>
      <h2 className='step-title'>Education Information</h2>

      <div className="form-row">
        <div className="form-group">
          <FormField
            label="Student Number "
            name="student_number"
            value={formData.student_number}
            onChange={handleChange}
            required
            error={errors.student_number}  
          />
        </div>
        <div className="form-group">
        <FormField
          label="Current Year Level"
          name="current_year_level"
          type="select"
          value={formData.current_year_level}
          onChange={handleChange}
          required
          error={errors.current_year_level}
          options={
            enums?.year_level?.map((opt) => ({ value: opt.value, label: opt.label })) || []
          }
        />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
        <FormField
          label="College / Department"
          name="college"
          type="select"
          value={formData.college}
          onChange={handleChange}
          required
          error={errors.college}
          options={
            enums?.college?.map((opt) => ({ value: opt.value, label: opt.label })) || []
          }
        />
        </div>
        <div className="form-group">
                  <FormField
          label="Degree Program"
          name="degree_program"
          type="select"
          value={formData.degree_program}
          onChange={handleChange}
          required
          error={errors.degree_program}
          options={
            enums?.degree_program?.map((opt) => ({ value: opt.value, label: opt.label })) || []
          }
        />
        </div>
      </div>
    </div>
  );
};

export default EducationInfoForm;
