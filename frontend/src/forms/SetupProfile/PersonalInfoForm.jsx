import React from 'react';
import FormField from '../../components/FormField'; // Adjust path if needed
import './css/multistep.css';

const PersonalInfoForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const monthOptions = [...Array(12).keys()].map(i => ({
    value: i + 1,
    label: new Date(2025, i).toLocaleString('default', { month: 'long' })
  }));

  const dayOptions = [...Array(31).keys()].map(i => ({
    value: i + 1,
    label: i + 1
  }));

  const yearOptions = [...Array(100).keys()].map(i => {
    const year = 2025 - i;
    return { value: year, label: year };
  });

  return (
    <div className='form-container'>
      <h2 className='step-title'>Personal Information</h2>

      <div className="form-row">
        <FormField
          label="Last Name"
          name="family_name"
          value={formData.family_name}
          onChange={handleChange}
          required
        />
        <FormField
          label="First Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <FormField
          label="Middle Name"
          name="middle_name"
          value={formData.middle_name}
          onChange={handleChange}
        />
        <FormField
          label="Nickname"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
        />
      </div>

      <div className="form-row">
        <FormField
          label="Sex"
          name="sex"
          type="select"
          value={formData.sex}
          onChange={handleChange}
          required
          options={[
            { value: '', label: 'Select Sex' },
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' }
          ]}
        />
        <FormField
          label="Religion"
          name="religion"
          value={formData.religion}
          onChange={handleChange}
        />
      </div>

      <div className="birthdate-group">
        <label className="birthdate-label">Birthdate *</label>
        <div className="birthdate-inputs">
          <FormField
            label="Month"
            name="birthMonth"
            type="select"
            value={formData.birthMonth}
            onChange={handleChange}
            required
            options={[{ value: '', label: 'Month' }, ...monthOptions]}
          />
          <FormField
            label="Day"
            name="birthDay"
            type="select"
            value={formData.birthDay}
            onChange={handleChange}
            required
            options={[{ value: '', label: 'Day' }, ...dayOptions]}
          />
          <FormField
            label="Year"
            name="birthYear"
            type="select"
            value={formData.birthYear}
            onChange={handleChange}
            required
            options={[{ value: '', label: 'Year' }, ...yearOptions]}
          />
        </div>
      </div>

      <div className="form-row">
        <FormField
          label="Birth Place"
          name="birth_place"
          value={formData.birth_place}
          onChange={handleChange}
          required
        />
        <FormField
          label="Birth Rank"
          name="birth_rank"
          type="number"
          min="1"
          value={formData.birth_rank}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-row">
      <FormField
        label="Mobile Number"
        name="mobile_number"
        value={formData.mobile_number}
        onChange={handleChange}
        required
      />
      <FormField
        label="Landline Number"
        name="landline_number"
        value={formData.landline_number}
        onChange={handleChange}
        placeholder="Optional"
      />
    </div>
    </div>
  );
};

export default PersonalInfoForm;
