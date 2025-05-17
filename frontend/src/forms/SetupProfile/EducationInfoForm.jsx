import React, { useState, useEffect } from 'react';
import FormField from '../../components/FormField'; // Adjust path as needed
import './css/multistep.css';
import { useEnumChoices } from '../../utils/enumChoices'  

const EducationInfoForm = ({ formData, setFormData }) => {
  const { enums, loading, error } = useEnumChoices(); 
  const [errors, setErrors] = useState({});
  const academicYearPattern = /^20\d{2}-20\d{2}$/;

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

    if (!formData.date_initial_entry || !academicYearPattern.test(formData.date_initial_entry)) {
      validationErrors.date_initial_entry = 'Format must be YYYY-YYYY using years from 2000 onward (e.g., 2023-2024).';
    } else {
      const [startYear, endYear] = formData.date_initial_entry.split('-').map(Number);
      if (endYear !== startYear + 1) {
        validationErrors.date_initial_entry = 'The second year must be the first year plus one (e.g., 2023-2024).';
      } 
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
       <div className="form-row">
        <div className="form-group">
          <FormField
            label="Academic Year of Initial Entry (e.g., 2023-2024)"
            name="date_initial_entry"
            value={formData.date_initial_entry}
            onChange={handleChange}
            required
            error={errors.date_initial_entry}
            placeholder="2023-2024"
          />
        </div>
        <div className="form-group">
          <FormField
            label="Semester"
            name="date_initial_entry_sem"
            type="select"
            value={formData.date_initial_entry_sem}
            onChange={handleChange}
            required
            error={errors.semester}
            options={
              enums?.semester?.map((opt) => ({ value: opt.value, label: opt.label })) || []
            }
          />
        </div>
      </div>
    </div>
  );
};

export default EducationInfoForm;
