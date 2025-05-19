import React, { useContext, useState, useEffect } from 'react';
import { useApiRequest } from '../../context/ApiRequestContext';
import { AuthContext } from '../../context/AuthContext';
import BISPersonalData from './BISPersonalData';
import BISSocioeconomic from './BISSocioeconomic';
import BISPreferences from './BISPreferences';
import BISPresentScholastic from './BISPresentScholastic';
import BISCertify from './BISCertify';
import BISPreview from './BISPreview';
import ProgressBar from '../../components/ProgressBar';
import Navbar from '../../components/NavBar';
import Footer from '../../components/Footer';
import '../SetupProfile/css/multistep.css';
import {  useFormApi } from './BISApi';
import {
  validatePreferences,
  validateScholasticStatus, 
  validateSocioEconomicStatus,
  validateSupport
} from '../../utils/BISValidation'
import Button from '../../components/UIButton'

const BISForm = () => {
  const { request } = useApiRequest();
  const { profileData } = useContext(AuthContext);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);  
  const {
    createDraftSubmission,
    getFormBundle,
    saveDraft,
    finalizeSubmission,
  } = useFormApi();

  const [formData, setFormData] = useState({
    socio_economic_status: {
      student_number: '',
      has_scholarship: false,
      scholarships: '',
      scholarship_privileges: '',
      monthly_allowance: '',
      spending_habit: '',
    },
    scholastic_status: {
      student_number: '',
      intended_course: '',
      first_choice_course: '',
      admitted_course: '',
      next_plan: '',
    },
    preferences: {
      student_number: '',
      influence: '',
      reason_for_enrolling: '',
      transfer_plans: false,
      transfer_reason: '',
      shift_plans: false,
      planned_shift_degree: '',
      reason_for_shifting: '',
    },
    student_support: {
      student_number: '',
      support: [],
      other_notes: '',
      other_scholarship: '',
      combination_notes: '',
    },
    privacy_consent: {
      student_number: '',
      has_consented: false
    }
  });

  const [step, setStep] = useState(0);
  const [submissionId, setSubmissionId] = useState(null);
  const [studentNumber, setStudentNumber] = useState(profileData?.student_number);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [readOnly, setReadOnly] = useState(false);

  const validateStep = (step, formData) => {
  switch (step) {
    case 1: 
      const errors = [
      ...validateSocioEconomicStatus(formData),
      ...validateSupport(formData)
    ];
      return errors;
    case 2: 
      return validatePreferences(formData);
    case 3: 
      return validateScholasticStatus(formData);
    case 4:
      if (!formData.privacy_consent.has_consented) {
        alert('You must agree to the Privacy Notice to proceed.');
        return false; 
      }
      return true; 
    default:
      return true;
  }
};


useEffect(() => {
  const fetchFormData = async () => {
    setLoading(true);
    try {
      let response = await getFormBundle(studentNumber);

      if (!response) {
        response = await createDraftSubmission(studentNumber);
      }

      if (response) {
        setFormData({
          socio_economic_status: response.socio_economic_status || {},
          scholastic_status: response.scholastic_status || {},
          preferences: response.preferences || {},
          student_support: response.student_support || {},
          privacy_consent: response.privacy_consent || false,
        });
        setSubmissionId(response.submission.id);

         if (response.submission.status === 'submitted') {
            setReadOnly(true);
          }

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

  const handleNextStep = () => {
    const errors = validateStep(step, formData);

    if (errors.length > 0) {
      alert("Please fix the following errors:\n\n" + errors.join("\n"));
      return;
    }

    setStep(prev => prev + 1);
  };
  
  const handlePreviousStep = () => setStep((prev) => prev - 1);

  const handlePreview = () => {
    setIsPreviewOpen(true);
  };


const handleSubmit = async () => {
  if (!formData?.privacy_consent?.has_consented) {
    alert('You must agree to the Privacy Statement to submit the form.');
    return; 
  }

  setLoading(true);
  try {
    const result = await finalizeSubmission(submissionId, studentNumber, formData);

    if (result.success) {
      alert(result.data.message || 'Form submitted successfully!');
    } else {
      // Handle specific error messages based on response
      if (result.status === 400 && result.data.errors) {
        alert('Validation errors:\n' + JSON.stringify(result.data.errors, null, 2));
      } else if (result.data.error) {
        alert(`Error: ${result.data.error}`);
      } else if (result.data.message) {
        alert(`Error: ${result.data.message}`);
      } else {
        alert('Unknown error occurred.');
      }
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
                  readOnly={readOnly}
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
                  readOnly={readOnly}
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
                  readOnly={readOnly}
                />
              )}
              {step === 4 && (
                <BISCertify
                  data={formData}
                  updateData={(isChecked) =>
                    setFormData((prev) => ({
                      ...prev,
                      privacy_consent: {
                        ...prev.privacy_consent,
                        has_consented: isChecked, 
                      },
                    }))
                  }
                  readOnly={readOnly}
                />
              )}

              <div className="main-form-buttons">
                {/* Step 1: Only 'Next' button */}
                {step === 0 && !loading && (
                  <Button variant="primary" onClick={handleNextStep}>
                    Next
                  </Button>
                )}

                {/* Steps 2-4: 'Back', 'Save Draft', and 'Next' buttons */}
                {step >= 1 && step <= 3 && !loading && (
                  <>
                    <Button variant="secondary" onClick={handlePreviousStep}>
                      Back
                    </Button>
                    {!readOnly && (
                    <Button
                      variant="tertiary"
                      onClick={handleSaveDraft}
                      disabled={loading}
                      style={{ marginLeft: '0.5rem' }}
                    >
                      {loading ? 'Saving Draft...' : 'Save Draft'}
                    </Button>
                  )}
                    <Button
                      variant="primary"
                      onClick={handleNextStep}
                      style={{ marginLeft: '0.5rem' }}
                    >
                      Next
                    </Button>
                  </>
                )}

                {/* Step 5: 'Back', 'Save Draft', 'Preview', and 'Submit' buttons */}
                {step === 4 && !loading && (
                  <>
                    <Button variant="secondary" onClick={handlePreviousStep}>
                      Back
                    </Button>
                    {!readOnly && (
                    <Button
                      variant="tertiary"
                      onClick={handleSaveDraft}
                      disabled={loading}
                      style={{ marginLeft: '0.5rem' }}
                    >
                      {loading ? 'Saving Draft...' : 'Save Draft'}
                    </Button>
                  )}

                  <Button
                    variant="tertiary"
                    onClick={handlePreview}
                    style={{ marginLeft: '0.5rem' }}
                  >
                    Preview
                  </Button>

                  {isPreviewOpen && (
                    <BISPreview
                      profileData={profileData}
                      formData={formData}
                      onClose={() => setIsPreviewOpen(false)}
                    />
                  )}

                  {!readOnly && (
                    <Button
                      variant='primary'
                      onClick={handleSubmit}
                      style={{ marginLeft: '0.5rem' }}
                    >
                      Submit
                    </Button>
                  )}

                  </>
                )}

                {/* Loading Indicator */}
                {loading && <div>Loading...</div>}

                {/* Error Message */}
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
