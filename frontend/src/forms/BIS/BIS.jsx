import React, { useContext, useState, useEffect } from 'react';
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
import {  useFormApi } from './BISApi';

const BISForm = () => {
  const { request } = useApiRequest();
  const { profileData } = useContext(AuthContext);
  const {
    createDraftSubmission,
    getFormBundle,
    saveDraft,
    finalizeSubmission,
  } = useFormApi();

  const [formData, setFormData] = useState({
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
  const [submissionId, setSubmissionId] = useState(null);
  const [studentNumber, setStudentNumber] = useState(profileData?.student_number);

  // Loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetching form data
useEffect(() => {
  const fetchFormData = async () => {
    setLoading(true);
    try {
      let response = await getFormBundle(studentNumber);

      // If no submission yet, create one
      if (!response) {
        alert('No submission found. Creating a new one...');
        response = await createDraftSubmission(studentNumber);
      }

      if (response) {
        setFormData({
          socio_economic_status: response.socio_economic_status || {},
          scholastic_status: response.scholastic_status || {},
          preferences: response.preferences || {},
          student_support: response.student_support || {},
          certify: response.certify || false,
        });
        setSubmissionId(response.submission.id);
      } else {
        setError('Failed to create or fetch the form.');
      }
    } catch (err) {
      setError('Error fetching or creating form.');
    } finally {
      setLoading(false);
    }
  };

  if (studentNumber) fetchFormData();
}, [studentNumber]);

const handleSaveDraft = async () => {
  if (!submissionId) {
    alert('Submission ID is missing. Try reloading the page.');
    return;
  }

  setLoading(true);
  try {
    const response = await saveDraft(submissionId, studentNumber, formData);
    if (response?.ok) {
      alert('Draft saved successfully!');
    } else {
      alert('Error saving draft.');
    }
  } catch (err) {
    alert('Failed to save draft.');
  } finally {
    setLoading(false);
  }
};

  // Handle navigation between steps
  const handleNextStep = () => setStep((prev) => prev + 1);
  const handlePreviousStep = () => setStep((prev) => prev - 1);

  // Submit form
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = {
        ...formData,
        submission: submissionId,
        student_number: studentNumber,
      };
      const response = await finalizeSubmission(data);
      if (response) {
        alert('Form submitted successfully!');
      } else {
        alert('Error submitting form.');
      }
    } catch (err) {
      alert('Failed to submit form.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Background rectangle */}
      <div className="background-rectangle"></div>

      <div className="content-wrapper">
        <Navbar />

        <div className="content" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
          <div className="mainStepForm">
            <div className="main-form-info">
              <h1 className="main-form-title">Basic Information Sheet</h1>
              <p className="main-form-subtitle">
                Please PROVIDE the information asked for. The data contained in this form will be kept confidential and will serve as your record. Please fill in the blanks carefully and sincerely.
              </p>
            </div>

            <div className="main-form-card">
              <ProgressBar currentStep={step} totalSteps={5} />

              {step === 0 && <BISPersonalData profileData={profileData} />}
              {step === 1 && (
                <BISSocioeconomic
                  data={{
                    socio_economic_status: formData.socio_economic_status,
                    student_support: formData.student_support
                  }}
                  updateData={(newData) =>
                    setFormData((prev) => ({
                      ...prev,
                      socio_economic_status: { ...prev.socio_economic_status, ...newData.socio_economic_status },
                      student_support: { ...prev.student_support, ...newData.student_support }
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
                {step > 0 && !loading && (
                  <button className="btn-secondary" onClick={handlePreviousStep}>
                    Back
                  </button>
                )}
                <button className="btn-primary" onClick={handleSaveDraft} disabled={loading}>
                  {loading ? 'Saving Draft...' : 'Save Draft'}
                </button>
                {step < 4 && !loading && (
                  <button className="btn-primary" onClick={handleNextStep}>
                    Next
                  </button>
                )}
                {step === 4 && !loading && (
                  <button className="btn-submit" onClick={handleSubmit}>
                    Submit
                  </button>
                )}
                {loading && <div>Loading...</div>}
                {error && <div className="error-message">{error}</div>}
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
