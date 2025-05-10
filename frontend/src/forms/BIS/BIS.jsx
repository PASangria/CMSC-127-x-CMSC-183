import React, { useContext, useState } from 'react';
import { useApiRequest } from '../../context/ApiRequestContext';
import { AuthContext } from '../../context/AuthContext';
import BISPersonalData from './BISPersonalData';
import BISSocioeconomic from './BISSocioeconomic';
import BISPreferences from './BISPreferences';
import BISPresentScholastic from './BISPresentScholastic';
import BISCertify from './BISCertify';
import ProgressBar from '../../components/ProgressBar';
import Navbar from '../../components/NavBar';
import Footer from '../../components/Footer';
import '../SetupProfile/css/multistep.css';

const BISForm = () => {
  const { request } = useApiRequest();
  const { profileData } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    personalData: {
      surname: '',
      firstName: '',
      middleName: '',
      nickname: '',
      year: '',
      programCourse: '',
    },
    socio_economic_status: {
      has_scholarship: false,
      scholarships: '',
      scholarship_privileges: '',
      monthly_allowance: '',
      spending_habit: '',
    },
    scholastic_status: {
      intended_course: '',
      first_choice_course: '',
      admitted_course: '',
      next_plan: '',
    },
    preferences: {
      influence: '',
      reason_for_enrolling: '',
      transfer_plans: false,
      transfer_reason: '',
      shift_plans: false,
      planned_shift_degree: '',
      reason_for_shifting: '',
    },
    student_support: {
      support: [],
      other_notes: '',
      other_scholarship: '',
      combination_notes: '',
    },
    certify: false,
  });

  const [step, setStep] = useState(0);

  const handleNextStep = () => setStep((prev) => prev + 1);
  const handlePreviousStep = () => setStep((prev) => prev - 1);

  return (
    <>
      {/* Background rectangle behind everything */}
      <div className="background-rectangle"></div>

      <div className="content-wrapper">
        <Navbar />

        <div className="content" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
          <div className="mainStepForm">
            <div className="main-form-info">
              <h1 className="main-form-title">Basic Information Sheet</h1>
              <p className="main-form-subtitle">
                Please fill out the form below to complete your profile.
              </p>
            </div>

            <div className="main-form-card">
              <ProgressBar currentStep={step} totalSteps={5} />

              {step === 0 && (
                <BISPersonalData
                  data={formData.personalData}
                  updateData={(newData) =>
                    setFormData((prev) => ({
                      ...prev,
                      personalData: { ...prev.personalData, ...newData },
                    }))
                  }
                />
              )}
              {step === 1 && (
                <BISSocioeconomic
                  data={formData.socio_economic_status}
                  updateData={(newData) =>
                    setFormData((prev) => ({
                      ...prev,
                      socio_economic_status: { ...prev.socio_economic_status, ...newData },
                    }))
                  }
                />
              )}
              {step === 2 && (
                <BISPreferences
                  data={formData.preferences}
                  updateData={(newData) =>
                    setFormData((prev) => ({
                      ...prev,
                      preferences: { ...prev.preferences, ...newData },
                    }))
                  }
                />
              )}
              {step === 3 && (
                <BISPresentScholastic
                  data={formData.scholastic_status}
                  updateData={(newData) =>
                    setFormData((prev) => ({
                      ...prev,
                      scholastic_status: { ...prev.scholastic_status, ...newData },
                    }))
                  }
                />
              )}
              {step === 4 && (
                <BISCertify
                  data={formData.certify}
                  updateData={(newData) =>
                    setFormData((prev) => ({
                      ...prev,
                      certify: newData,
                    }))
                  }
                />
              )}

              <div className="main-form-buttons">
                {step > 0 && (
                  <button className="btn-secondary" onClick={handlePreviousStep}>
                    Back
                  </button>
                )}
                {step < 4 && (
                  <button className="btn-primary" onClick={handleNextStep}>
                    Next
                  </button>
                )}
                {step === 4 && (
                  <button className="btn-submit" onClick={() => alert('Form submitted!')}>
                    Submit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default BISForm;
