import React, { useContext, useEffect, useState } from 'react';
import { useApiRequest } from '../../context/ApiRequestContext';
import { AuthContext } from '../../context/AuthContext';
import BISPersonalData from './BISPersonalData';
import ProgressBar from '../../components/ProgressBar';
import Navbar from '../../components/NavBar';
import Footer from '../../components/Footer';

const BISForm = () => {
  const { request } = useApiRequest();
  const { profileData } = useContext(AuthContext);  

  const [formData, setFormData] = useState({
  socio_economic_status: {
    has_scholarship: false,
    scholarships: '',
    scholarship_privileges: '',
    monthly_allowance: '',
    spending_habit: ''
  },
  scholastic_status: {
    intended_course: '',
    first_choice_course: '',
    admitted_course: '',
    next_plan: ''
  },
  preferences: {
    influence: '',
    reason_for_enrolling: '',
    transfer_plans: false,
    transfer_reason: '',
    shift_plans: false,
    planned_shift_degree: '',
    reason_for_shifting: ''
  },
  student_support: {
    support: [],
    other_notes: '',
    other_scholarship: '',
    combination_notes: ''
  }
});


  const [submissionId, setSubmissionId] = useState(null);
  const [step, setStep] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    const loadOrCreateDraft = async () => {
      const res = await request('http://localhost:8000/api/forms/basic-information-sheet/');

      if (res && res.ok) {
        const data = await res.json();
        setSubmissionId(data.id);
        setFormData(data);  // Optional: Merge into formData shape
      } else {
        // If not found, create it
        const createRes = await request('/api/forms/basic-information/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });

        if (createRes?.ok) {
          const createData = await createRes.json();
          setSubmissionId(createData.id);
        }
      }
    };

    loadOrCreateDraft();
  }, [request]);

  const handleNextStep = () => { setStep(prev => prev + 1); };
  const handlePreviousStep = () => { setStep(prev => prev - 1); };

  const handleSaveAsDraft = async () => {
    const res = await request('http://localhost:8000/api/forms/basic-information-sheet/', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res?.ok) alert("Draft saved.");
    else alert("Failed to save draft.");
  };

  const handleSubmit = async () => {
    const patchRes = await request('http://localhost:8000/api/forms/basic-information-sheet/', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (patchRes?.ok) {
      const finalizeRes = await request('http://localhost:8000/api/forms/finalize/${submissionId}/', {
        method: 'POST',
      });

      if (finalizeRes?.ok) alert("Form submitted!");
      else alert("Submission failed.");
    } else {
      alert("Save before submit failed.");
    }
  };

  const updateSection = (section) => (newData) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...newData
      }
    }));
  };

  return (
    <div>
      <Navbar />
      <div className='background-rectangle'></div>
      <div className="content-wrapper">
      <div className="mainStepForm">
        <div className='main-form-info'>
                    <h1 className="main-form-title">BASIC INFORMATION SHEET</h1>
                    <p className="main-form-subtitle">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>
        <div className="main-form-card">
          <div className='main-form'>
            <ProgressBar currentStep={step} />

        {/* STEP FORMS */}
        {step === 0 && <BISPersonalData profileData={profileData} />}

        {/* BUTTONS */}
        <div className="main-form-buttons">
          <button className="btn-secondary" onClick={handleSaveAsDraft}>Save as Draft</button>

          {step > 0 && <button className="btn-secondary" onClick={handlePreviousStep}>Back</button>}
          {step < 4 && <button className="btn-primary" onClick={handleNextStep}>Next</button>}

          {step === 4 && (
            <>
              <button className="btn-primary" onClick={() => setIsPreviewOpen(true)}>Preview</button>
              <button className="btn-submit" onClick={handleSubmit}>Submit</button>
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

export default BISForm;
