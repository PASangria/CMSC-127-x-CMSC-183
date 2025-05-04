import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../pages/css_pages/setUp.css";
import FormField from '../components/FormField'; 
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import { AuthContext } from '../context/AuthContext';

export const SetUpProfile = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');
  
  const [formData, setFormData] = useState({
    family_name: '',
    first_name: '',
    middle_name: '',
    nickname: '',
    sex: '',
    religion: '',
    birth_rank: '',
    birthdate: '',
    birth_place: '',
    landline_number: '',
    mobile_number: '',
    student_number: '',
    college: '',
    degree_program: '',
    current_year_level: '',
    permanent_region: '',
    permanent_province: '',
    permanent_city_municipality: '',
    permanent_barangay: '',
    permanent_address_line_1: '',
    permanent_address_line_2: '',
    permanent_zip_code: '',
    up_region: '',
    up_province: '',
    up_city_municipality: '',
    up_barangay: '',
    up_address_line_1: '',
    up_address_line_2: '',
    up_zip_code: '',
  });

  const regionOptions = [
    { value: 'REGION_I', label: 'Ilocos Region' },
    { value: 'REGION_II', label: 'Cagayan Valley' },
    { value: 'REGION_III', label: 'Central Luzon' },
    { value: 'REGION_IV_A', label: 'CALABARZON' },
    { value: 'REGION_IV_B', label: 'MIMAROPA' },
    { value: 'REGION_V', label: 'Bicol Region' },
    { value: 'REGION_VI', label: 'Western Visayas' },
    { value: 'REGION_VII', label: 'Central Visayas' },
    { value: 'REGION_VIII', label: 'Eastern Visayas' },
    { value: 'REGION_IX', label: 'Zamboanga Peninsula' },
    { value: 'REGION_X', label: 'Northern Mindanao' },
    { value: 'REGION_XI', label: 'Davao Region' },
    { value: 'REGION_XII', label: 'SOCCSKSARGEN' },
    { value: 'REGION_XIII', label: 'Caraga' },
    { value: 'REGION_CAR', label: 'Cordillera Administrative Region' },
    { value: 'REGION_NCR', label: 'National Capital Region' }
  ];

  const [sameAsPermanent, setSameAsPermanent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentProfile = async () => {
      if (!isAuthenticated) {
        navigate('/login?role=student'); 
      } 

      setLoading(false); 
    };

    fetchStudentProfile();
  }, [isAuthenticated, user, navigate]);

  const handleSameAsPermanentToggle = () => {
    const newValue = !sameAsPermanent;
    setSameAsPermanent(newValue);
  
    if (newValue) {
      setFormData(prev => ({
        ...prev,
        up_region: prev.permanent_region,
        up_province: prev.permanent_province,
        up_city_municipality: prev.permanent_city_municipality,
        up_barangay: prev.permanent_barangay,
        up_address_line_1: prev.permanent_address_line_1,
        up_address_line_2: prev.permanent_address_line_2,
        up_zip_code: prev.permanent_zip_code,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const birthdate = `${formData.birthYear}-${String(formData.birthMonth).padStart(2, '0')}-${String(formData.birthDay).padStart(2, '0')}`;
  
    const payload = {
      student_number: formData.student_number,
      college: formData.college,
      current_year_level: formData.current_year_level,
      degree_program: formData.degreeProgram,
      last_name: formData.family_name,
      first_name: formData.first_name,
      middle_name: formData.middle_name,
      nickname: formData.nickname,
      sex: formData.sex,
      birth_rank: formData.birth_rank,
      birthdate: birthdate,
      birthplace: formData.birth_place,
      contact_number: formData.mobile_number,
      landline_number: formData.landline_number,
      religion: formData.religion,
      permanent_address: {
        address_line_1: formData.permanent_address_line_1,
        address_line_2: formData.permanent_address_line_2,
        barangay: formData.permanent_barangay,
        city_municipality: formData.permanent_city_municipality,
        province: formData.permanent_province,
        region: formData.permanent_region,
        zip_code: formData.permanent_zip_code,
      },
      address_while_in_up: {
        address_line_1: formData.up_address_line_1,
        address_line_2: formData.up_address_line_2,
        barangay: formData.up_barangay,
        city_municipality: formData.up_city_municipality,
        province: formData.up_province,
        region: formData.up_region,
        zip_code: formData.up_zip_code,
      },
      is_complete: true
    };
  
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/api/forms/student/profile/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) throw new Error("Failed to submit profile");
  
      const result = await response.json();
      console.log("Profile submitted successfully:", result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.error("Submission error:", error);
    }
  };
  
  

  // Handle loading and error messages
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  

  return (
    <div className="setup-container">
      <Navbar />

      <div className="setup-content">
        <main className="setup-form">
          <form onSubmit={handleSubmit}>
            <h1>SET UP YOUR PROFILE</h1>  {/* Updated header */}
            <h2 align="left">Personal Information</h2>
            <div className="form-row">
                <div className="form-group">
                  <FormField
                    label="Student Number *"
                    name="student_number"
                    value={formData.student_number}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <select name="current_year_level" value={formData.current_year_level} onChange={handleChange} required>
                    <option value="">Year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                  </select>
                </div>
              </div>
            <div className="form-row">
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
              </div>
            <div className='form-container'>
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
                    label="Nickname*"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row ">
                <div className="form-group">
                  <select name="sex" value={formData.sex} onChange={handleChange} required>
                    <option value="">Sex *</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
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

              <div className="form-row ">
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
                <label className="birthdate-label">Birthdate</label>
                <div className="birthdate-inputs">
                  <div className="form-group">
                    <select name="birthMonth" value={formData.birthMonth} onChange={handleChange} required>
                      <option value="">Month</option>
                      {/* Month Options */}
                      {[...Array(12).keys()].map(i => (
                        <option key={i+1} value={i+1}>{new Date(2025, i).toLocaleString('default', { month: 'long' })}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <select name="birthDay" value={formData.birthDay} onChange={handleChange} required>
                      <option value="">Day</option>
                      {[...Array(31).keys()].map(i => (
                        <option key={i+1} value={i+1}>{i+1}</option>
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

              {/* PERMANENT ADDRESS SECTION */}
              <div className="address-section">
                <label className="address-label">Permanent Address</label>
                <div className="form-row">
                  <div className="form-group">
                    <FormField
                      label="Address Line 1*"
                      name="permanent_address_line_1"
                      value={formData.permanent_address_line_1}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <FormField
                      label="Address Line 2*"
                      name="permanent_address_line_2"
                      value={formData.permanent_address_line_2}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                <div className="form-group">
                  <label htmlFor="permanent_region">Region*</label>
                  <select
                    name="permanent_region"
                    id="permanent_region"
                    value={formData.permanent_region}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Region</option>
                    {regionOptions.map((region) => (
                      <option key={region.value} value={region.value}>
                        {region.label}
                      </option>
                    ))}
                  </select>
                </div>
                  <div className="form-group">
                    <FormField
                      label="Province*"
                      name="permanent_province"
                      value={formData.permanent_province}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row three-columns">
                  <div className="form-group">
                    <FormField
                      label="City/Municipality*"
                      name="permanent_city_municipality"
                      value={formData.permanent_city_municipality}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <FormField
                      label="Barangay*"
                      name="permanent_barangay"
                      value={formData.permanent_barangay}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row three-columns">
                  <div className="form-group">
                    <FormField
                      label="Zip code*"
                      name="permanent_zip_code"
                      value={formData.permanent_zip_code}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* ADDRESS WHILE IN UP SECTION */}
              <div className="address-section">
                <label className="address-label">Address while in UP</label>
                  <label>
                    <input
                      type="checkbox"
                      checked={sameAsPermanent}
                      onChange={handleSameAsPermanentToggle}
                    />
                    &nbsp;Same as Permanent Address
                  </label>
                <div className="form-row">
                  <div className="form-group">
                    <FormField
                      label="Address Line 1*"
                      name="up_address_line_1"
                      value={formData.up_address_line_1}
                      onChange={handleChange}
                      required
                      disabled={sameAsPermanent}
                    />
                  </div>
                  <div className="form-group">
                    <FormField
                      label="Address Line 2*"
                      name="up_address_line_2"
                      value={formData.up_address_line_2}
                      onChange={handleChange}
                      required
                      disabled={sameAsPermanent}
                    />
                  </div>
                </div>
                <div className="form-row">
                <div className="form-group">
                  <label htmlFor="up_region">Region*</label>
                  <select
                    name="up_region"
                    id="up_region"
                    value={formData.up_region}
                    onChange={handleChange}
                    required
                    disabled={sameAsPermanent} 
                  >
                    <option value="">Select Region</option>
                    {regionOptions.map((region) => (
                      <option key={region.value} value={region.value}>
                        {region.label}
                      </option>
                    ))}
                  </select>
                </div>

                  <div className="form-group">
                    <FormField
                      label="Province*"
                      name="up_province"
                      value={formData.up_province}
                      onChange={handleChange}
                      required
                      disabled={sameAsPermanent}
                    />
                  </div>
                </div>

                <div className="form-row three-columns">
                <div className="form-group">
                    <FormField
                      label="City/Municipality*"
                      name="permanent_city_municipality"
                      value={formData.permanent_city_municipality}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <FormField
                      label="Barangay*"
                      name="up_barangay"
                      value={formData.up_barangay}
                      onChange={handleChange}
                      required
                      disabled={sameAsPermanent}
                    />
                  </div>
                </div>

                <div className="form-row three-columns">

                  <div className="form-group">
                    <FormField
                      label="Zip code*"
                      name="up_zip_code"
                      value={formData.up_zip_code}
                      onChange={handleChange}
                      required
                      disabled={sameAsPermanent}
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="next-button">NEXT</button>
            </div>
          </form>
        </main>
      </div>
      <Footer />
    </div>
  );
};
