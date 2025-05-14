import React, { useState } from 'react';
import PersonalInfoForm from './PersonalInfoForm'; 
import EducationInfoForm from './EducationInfoForm';
import AddressInfoForm from './AddressInfoForm';
import { validateStep } from '../../utils/formValidationUtils';
import { apiRequest } from '../../utils/apiUtils';
import Navbar from '../../components/NavBar';
import Footer from '../../components/Footer';
import ProgressBar from '../../components/ProgressBar';
import PreviewModal from './PreviewForm';

const MultiStepForm = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [step, setStep] = useState(1); 
    const [sameAsPermanent, setSameAsPermanent] = useState(false);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);  

   const [formData, setFormData] = useState({
      // Personal Information
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
      // Education
      student_number: '',
      college: '',
      degree_program: '',
      current_year_level: '',
      date_initial_entry: '',
      date_initial_entry_sem: '',
      // Permanent Address
      permanent_region: '',
      permanent_province: '',
      permanent_city_municipality: '',
      permanent_barangay: '',
      permanent_address_line_1: '',
      permanent_address_line_2: '',
      permanent_zip_code: '',
      // Address While In UP
      up_region: '',
      up_province: '',
      up_city_municipality: '',
      up_barangay: '',
      up_address_line_1: '',
      up_address_line_2: '',
      up_zip_code: '',
    });

  // Handle navigation to the next step
  const handleNextStep = () => {
    const isValid = validateStep(step, formData);

    if (isValid) {
      setStep(prevStep => prevStep + 1);
    } else {
      alert("Please fill in all required fields correctly.");
    }
  };

  const handlePreviousStep = () => {
    setStep(prevStep => prevStep - 1);
  };

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

  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const birthdate = `${formData.birthYear}-${String(formData.birthMonth).padStart(2, '0')}-${String(formData.birthDay).padStart(2, '0')}`;
  
    const payload = {
      student_number: formData.student_number,
      college: formData.college,
      current_year_level: formData.current_year_level,
      degree_program: formData.degree_program,
      date_initial_entry: formData.date_initial_entry,
      date_initial_entry_sem: formData.date_initial_entry_sem,
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
  
      const response = await apiRequest("http://localhost:8000/api/forms/student/profile/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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

  
  return (
    <div>
        <Navbar />
        
        {/* Background Rectangle */}
        <div className="background-rectangle"></div>

        <div className="content-wrapper">

            <div className="mainStepForm">
                <div className='main-form-info'>
                    <h1 className="main-form-title">SETUP YOUR PROFILE</h1>
                    <p className="main-form-subtitle">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>

                <div className="main-form-card">
                    <div className='main-form'>
                        <ProgressBar currentStep={step} className="progress-bar"/>
                        {step === 1 && <PersonalInfoForm formData={formData} setFormData={setFormData} step={step}/>}
                        {step === 2 && <EducationInfoForm formData={formData} setFormData={setFormData} step={step}/>}
                        {step === 3 && <AddressInfoForm  formData={formData}
                        setFormData={setFormData}
                        addressLabel="Permanent Address"
                        disabled={false}
                        prefix="permanent"/>}
                        {step === 4 && <AddressInfoForm    formData={formData}
                        setFormData={setFormData}
                        addressLabel="Address while in UP"
                        checkboxLabel="Same as Permanent Address"
                        sameAsPermanent={sameAsPermanent}
                        handleSameAsPermanentToggle={handleSameAsPermanentToggle}
                        disabled={sameAsPermanent}
                        prefix="up"/>}
                        <div className="main-form-buttons">
                        {/* Step 1: Only 'Next' button */}
                        {step === 1 && (
                            <button className="btn-primary" onClick={handleNextStep}>
                            Next
                            </button>
                        )}

                        {/* Steps 2-4: 'Back' and 'Next' buttons */}
                        {step >= 2 && step <= 4 && (
                            <>
                            <button className="btn-secondary" onClick={handlePreviousStep}>
                                Back
                            </button>
                            <button className="btn-primary" onClick={handleNextStep}>
                                Next
                            </button>
                            </>
                        )}

                        {/* Step 5: 'Back', 'Preview', and 'Submit' buttons */}
                        {step === 5 && (
                            <>
                            <button className="btn-secondary" onClick={handlePreviousStep}>
                                Back
                            </button>
                            <button className="btn-primary" onClick={handlePreview}>
                                Preview
                            </button>
                            {isPreviewOpen && (
                              <PreviewModal data={formData} onClose={() => setIsPreviewOpen(false)} />
                            )}
                            <button className="btn-submit" onClick={handleSubmit}>
                                Submit
                            </button>
                            </>
                        )}
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <Footer />
    </div>
);
};

export default MultiStepForm;