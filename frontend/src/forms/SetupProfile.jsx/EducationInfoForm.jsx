import React, { useState } from 'react';
import FormField from '../../components/FormField'; // Adjust path as needed
import './css/multistep.css';

const EducationInfoForm = ({ formData, setFormData }) => {
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
    if (!formData.degreeProgram) {
      validationErrors.degreeProgram = 'Please select your degree program.';
    }

    setErrors(validationErrors);
    
    return Object.keys(validationErrors).length === 0;
  };

  return (
    <div className='form-container'>
      <h2 className='step-title'>Education Information</h2>

      <div className="form-row">
        <div className="form-group">
          <FormField
            label="Student Number *"
            name="student_number"
            value={formData.student_number}
            onChange={handleChange}
            required
            error={errors.student_number}  // Show error if present
          />
        </div>
        <div className="form-group">
          <select
            name="current_year_level"
            value={formData.current_year_level}
            onChange={handleChange}
            required
          >
            <option value="">Year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
          {errors.current_year_level && <span className="error-message">{errors.current_year_level}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <select
            name="college"
            value={formData.college}
            onChange={handleChange}
            required
          >
            <option value="">College/Department</option>
            <option value="CSM">CSM</option>
            <option value="CHSS">CHSS</option>
            <option value="SOM">SOM</option>
          </select>
          {errors.college && <span className="error-message">{errors.college}</span>}
        </div>
        <div className="form-group">
          <select
            name="degreeProgram"
            value={formData.degreeProgram}
            onChange={handleChange}
            required
          >
            <option value="">Degree Program</option>
            <option value="BA Communication and Media Arts">BA Communication and Media Arts</option>
            <option value="BA English">BA English</option>
            <option value="BS Anthropology">BS Anthropology</option>
            <option value="BS Applied Mathematics">BS Applied Mathematics</option>
            <option value="BS Architecture">BS Architecture</option>
            <option value="BS Biology">BS Biology</option>
            <option value="BS Computer Science">BS Computer Science</option>
            <option value="BS Data Science">BS Data Science</option>
            <option value="BS Food Technology">BS Food Technology</option>
            <option value="BS Sports Science">BS Sports Science</option>
          </select>
          {errors.degreeProgram && <span className="error-message">{errors.degreeProgram}</span>}
        </div>
      </div>
    </div>
  );
};

export default EducationInfoForm;
