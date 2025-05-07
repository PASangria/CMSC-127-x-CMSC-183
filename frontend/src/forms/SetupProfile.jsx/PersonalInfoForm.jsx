import React from 'react';
import FormField from '../../components/FormField'; // Adjust path as needed
import './css/multistep.css'
import ProgressBar from '../../components/ProgressBar';

const PersonalInfoForm = ({ formData, setFormData, step }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className='form-container'>
      
      <h2 className='step-title'>Personal Information</h2>

      <div className="form-row">
        <div className="form-group">
          <FormField
            label="Last Name*"
            name="family_name"
            value={formData.family_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <FormField
            label="First Name*"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <FormField
            label="Middle Name"
            name="middle_name"
            value={formData.middle_name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <FormField
            label="Nickname"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Sex*</label>
          <select name="sex" value={formData.sex} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <FormField
            label="Religion"
            name="religion"
            value={formData.religion}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <FormField
            label="Mobile Number*"
            name="mobile_number"
            value={formData.mobile_number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <FormField
            label="Landline Number"
            name="landline_number"
            value={formData.landline_number}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="birthdate-group">
        <label className="birthdate-label">Birthdate*</label>
        <div className="birthdate-inputs">
          <div className="form-group">
            <select name="birthMonth" value={formData.birthMonth} onChange={handleChange} required>
              <option value="">Month</option>
              {[...Array(12).keys()].map(i => (
                <option key={i + 1} value={i + 1}>
                  {new Date(2025, i).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <select name="birthDay" value={formData.birthDay} onChange={handleChange} required>
              <option value="">Day</option>
              {[...Array(31).keys()].map(i => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <select name="birthYear" value={formData.birthYear} onChange={handleChange} required>
              <option value="">Year</option>
              {[...Array(100).keys()].map(i => (
                <option key={2025 - i} value={2025 - i}>{2025 - i}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <FormField
            label="Birth Place*"
            name="birth_place"
            value={formData.birth_place}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <FormField
            label="Birth Rank*"
            name="birth_rank"
            value={formData.birth_rank}
            onChange={handleChange}
            type="number"
            min="1"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
