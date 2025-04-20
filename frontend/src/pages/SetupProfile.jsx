import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./css_pages/SignUp.css"
import FormField from '../components/FormField'; 
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';

export const SetupProfile = () => {
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    nickname: '',
    gender: '',
    age: '',
    religion: '',
    birthMonth: '',
    birthDay: '',
    birthYear: '',
    birthPlace: '',
    birthRank: '',
    region: '',
    province: '',
    municipality: '',
    city: '',
    barangay: '',
    street: '',
    houseNo: '',
    zipCode: '',
    college: 'CSM',
    degreeProgram: '',
    year: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="signup-container">
    <Navbar />

      <div className="signup-content">
        <aside className="signup-sidebar">
          <div className="project-info">CMSC 127 Project</div>
          <h1>SET UP YOUR PROFILE</h1>
        </aside>

        <main className="signup-form">
          <form onSubmit={handleSubmit}>
            <h2 align="left">Personal Information</h2>
            
            <div className="form-row">
            <div className="form-group">
                <FormField
                label="Last Name*"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                />
            </div>
              <div className="form-group">
                <FormField
                    label="First Name*"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <FormField
                label="Middle Name"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <FormField
                    label="Nickname*"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                    required
                />
              </div>
            </div>

            <div className="form-row three-columns">
              <div className="form-group">
                <select name="gender" value={formData.gender} onChange={handleChange} required>
                  <option value="">Gender *</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="form-group">
                <FormField
                label="Age*"
                name="age"
                value={formData.age}
                onChange={handleChange}
                type="number"
                min="0"
                />
              </div>
              <div className="form-group">
                <FormField
                    label="Religion*"
                    name="religion"
                    value={formData.religion}
                    onChange={handleChange}
                    required
                />
              </div>
            </div>

            <div className="birthdate-group">
              <label className="birthdate-label">Birthdate</label>
              <div className="birthdate-inputs">
                <div className="form-group">
                  <select name="birthMonth" value={formData.birthMonth} onChange={handleChange} required>
                    <option value="">Month</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </select>
                </div>
                <div className="form-group">
                  <select name="birthDay" value={formData.birthDay} onChange={handleChange} required>
                    <option value="">Day</option>
                    {Array.from({length: 31}, (_, i) => i + 1).map(day => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <select name="birthYear" value={formData.birthYear} onChange={handleChange} required>
                    <option value="">Year</option>
                    {Array.from({length: 100}, (_, i) => new Date().getFullYear() - i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <FormField
                    label="Birth Place*"
                    name="birthPlace"
                    value={formData.birthPlace}
                    onChange={handleChange}
                    required
                />
              </div>
              <div className="form-group">
                <select name="birthRank" value={formData.birthRank} onChange={handleChange}>
                  <option value="">Birth Rank</option>
                  {/* Add ranks */}
                </select>
              </div>
            </div>

            <div className="address-section">
              <label className="address-label">Permanent Address</label>
              <div className="form-row">
                <div className="form-group">
                  <FormField
                    label="Region*"
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    required
                />
                </div>
                <div className="form-group">
                  <FormField
                    label="Province*"
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    required
                />
                </div>
              </div>

              <div className="form-row three-columns">
                <div className="form-group">
                  <FormField
                    label="Municipality*"
                    name="municipality"
                    value={formData.municipality}
                    onChange={handleChange}
                    required
                />
                </div>
                <div className="form-group">
                  <FormField
                    label="City*"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                />
                </div>
                <div className="form-group">
                  <FormField
                    label="Barangay*"
                    name="barangay"
                    value={formData.religion}
                    onChange={handleChange}
                    required
                />
                </div>
              </div>

              <div className="form-row three-columns">
                <div className="form-group">
                  <FormField
                    label="Street*"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    required
                />
                </div>
                <div className="form-group">
                  <FormField
                    label="House No.*"
                    name="houseNo"
                    value={formData.houseNo}
                    onChange={handleChange}
                    required
                />
                </div>
                <div className="form-group">
                <FormField
                    label="Zip code*"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                />
                </div>
              </div>
            </div>

            <div className="form-row three-columns">
              <div className="form-group">
                <select name="college" value={formData.college} onChange={handleChange} required>
                  <option value="">College/Department</option>
                  <option value="CSM">CSM</option>
                  <option value="CHSS">CHSS</option>
                  <option value="SOM">SOM</option>
                </select>
              </div>
              <div className="form-group">
                <select name="degreeProgram" value={formData.degreeProgram} onChange={handleChange} required>
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
              </div>
              <div className="form-group">
                <select name="year" value={formData.year} onChange={handleChange} required>
                  <option value="">Year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>
            </div>

            <button type="submit" className="next-button">NEXT</button>
          </form>
        </main>
      </div>
      <Footer />
    </div>
  );
};
