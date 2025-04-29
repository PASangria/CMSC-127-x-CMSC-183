import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Loader } from 'react-feather';
import './BISForms.css';

const BISForms = () => {
  console.log('BISForms component rendering'); // Debug log
  
  useEffect(() => {
    console.log('BISForms component mounted');
    return () => {
      console.log('BISForms component unmounted');
    };
  }, []);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Personal Data
    lastName: '',
    firstName: '',
    middleName: '',
    studentNumber: '',
    birthDate: '',
    civilStatus: '',
    sex: '',
    citizenship: '',
    religion: '',
    
    // Socio-economic Status
    familyIncome: '',
    scholarship: '',
    workingStudent: false,
    disability: '',
    
    // School Preferences
    course: '',
    yearLevel: '',
    semester: '',
    academicYear: '',
    reasonForStopping: '',
    planToReturnToSchool: '',
    dateOfReturn: '',
    
    // Present Schedule
    subjects: '',
    schedule: '',
    
    attachments: null
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await axios.post('http://127.0.0.1:8000/api/bis-forms/', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess('Form submitted successfully!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while submitting the form');
    } finally {
      setIsSubmitting(false);
    }
  };

  try {
    return (
      <div className="bis-form-container">
        <div className="bis-header">
          <img src="/up-mindanao-logo.png" alt="UP Mindanao Logo" className="logo" />
          <div className="header-text">
            <h1>Basic Information Sheet</h1>
            <p>Please fill out all required fields (*)</p>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit}>
          <section className="form-section">
            <h2>I. Personal Data</h2>
            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="middleName">Middle Name</label>
                <input
                  type="text"
                  id="middleName"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-field">
                <label htmlFor="studentNumber">Student Number *</label>
                <input
                  type="text"
                  id="studentNumber"
                  name="studentNumber"
                  value={formData.studentNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="birthDate">Birth Date *</label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="civilStatus">Civil Status *</label>
                <select
                  id="civilStatus"
                  name="civilStatus"
                  value={formData.civilStatus}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="widowed">Widowed</option>
                  <option value="separated">Separated</option>
                </select>
              </div>

              <div className="form-field">
                <label>Sex *</label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="sex"
                      value="male"
                      checked={formData.sex === 'male'}
                      onChange={handleChange}
                    />
                    Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="sex"
                      value="female"
                      checked={formData.sex === 'female'}
                      onChange={handleChange}
                    />
                    Female
                  </label>
                </div>
              </div>
            </div>
          </section>

          <section className="form-section">
            <h2>II. Socio-economic Status</h2>
            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="familyIncome">Annual Family Income *</label>
                <input
                  type="text"
                  id="familyIncome"
                  name="familyIncome"
                  value={formData.familyIncome}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label>Are you a working student? *</label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="workingStudent"
                      value="yes"
                      checked={formData.workingStudent === true}
                      onChange={(e) => handleChange({
                        target: {
                          name: 'workingStudent',
                          type: 'checkbox',
                          checked: e.target.value === 'yes'
                        }
                      })}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="workingStudent"
                      value="no"
                      checked={formData.workingStudent === false}
                      onChange={(e) => handleChange({
                        target: {
                          name: 'workingStudent',
                          type: 'checkbox',
                          checked: e.target.value === 'yes'
                        }
                      })}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>
          </section>

          <section className="form-section">
            <h2>III. School Preferences</h2>
            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="course">Course *</label>
                <select
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Course</option>
                  <option value="BSCS">BS Computer Science</option>
                  <option value="BSIT">BS Information Technology</option>
                  <option value="BSECE">BS Electronics and Communications Engineering</option>
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="yearLevel">Year Level *</label>
                <select
                  id="yearLevel"
                  name="yearLevel"
                  value={formData.yearLevel}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Year Level</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="semester">Semester *</label>
                <select
                  id="semester"
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Semester</option>
                  <option value="1">1st Semester</option>
                  <option value="2">2nd Semester</option>
                  <option value="3">Summer</option>
                </select>
              </div>
            </div>
          </section>

          <section className="form-section">
            <h2>IV. Present Schedule</h2>
            <div className="form-grid">
              <div className="form-field full-width">
                <label htmlFor="subjects">List of Subjects</label>
                <textarea
                  id="subjects"
                  name="subjects"
                  value={formData.subjects}
                  onChange={handleChange}
                  placeholder="Enter your subjects and their schedules"
                  rows="4"
                />
              </div>
            </div>
          </section>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader className="spinner" />
                  Submitting...
                </>
              ) : (
                'Submit Form'
              )}
            </button>
          </div>
        </form>
      </div>
    );
  } catch (error) {
    console.error('Error rendering BISForms:', error);
    return (
      <div style={{ 
        padding: '20px', 
        margin: '20px', 
        backgroundColor: '#fff',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2>Something went wrong</h2>
        <p>Please try refreshing the page</p>
      </div>
    );
  }
};

export { BISForms }; 