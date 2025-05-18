import React, { useState, useContext, useEffect } from 'react';
import Navbar from '../../components/NavBar';
import Footer from '../../components/Footer';
import ProgressBar from '../../components/ProgressBar';
import SCIFCredentials from './SCIFCredentials';
import SCIFPersonalData from './SCIFPersonalData';
import SCIFFamilyData from './SCIFFamilyData';
import SCIFHealthData from './SCIFHealthData';
import SCIFPreviousSchoolRecord from './SCIFPreviousSchoolRecord';
import SCIFScholarships from './SCIFScholarships';
import SCIFOtherPersonalData from './SCIFOtherPersonalData';
import SCIFCertify from './SCIFCertify';
import '../SetupProfile/css/multistep.css';
import { useApiRequest } from '../../context/ApiRequestContext';
import { AuthContext } from '../../context/AuthContext';
import { useFormApi } from '../SCIF/SCIFApi';
import {
  validateParent,
  validateGuardian,
  validateSibling,
  validateHealthData,
  validatePrivacyConsent,
  validatePreviousSchool,
  validatePersonalityTraits,
  validateFamilyRelationship,
  validateCounselingInfo
} from '../../utils/SCIFValidation';
import Loader from '../../components/Loader';

const SCIF = () => {
  const { request } = useApiRequest();
  const { profileData } = useContext(AuthContext);
   const [isPreviewOpen, setIsPreviewOpen] = useState(false);  
    const {
      createDraftSubmission,
      getFormBundle,
      saveDraft,
      finalizeSubmission,
    } = useFormApi();
      const [step, setStep] = useState(0);
      const [submissionId, setSubmissionId] = useState(null);
      const [studentNumber, setStudentNumber] = useState(profileData?.student_number);

      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);
      const [submissionStatus, setSubmissionStatus] = useState(null);
  


  
  const [formData, setFormData] = useState({
    family_data: {
      student_number: '',
      mother: {
        first_name: '',
        last_name: '',
        age: '',
        job_occupation: '',
        company_agency: '',
        company_address: '',
        highest_educational_attainment: '',
        contact_number: '',
        submission: '',
      },
      father: {
        first_name: '',
        last_name: '',
        age: '',
        job_occupation: '',
        company_agency: '',
        company_address: '',
        highest_educational_attainment: '',
        contact_number: '',
        submission: '',
      },
      guardian: {
        first_name: '',
        last_name: '',
        contact_number: '',
        address: '',
        relationship_to_guardian: '',
        language_dialect: [],
        submission: '',
      },
    },
    siblings: [
      {
        first_name: '',
        last_name: '',
        sex: '',
        age: '',
        job_occupation: '',
        company_school: '',
        educational_attainment: '',
        students: [], 
        submission: '',
      },
    ],
    previous_school_record: [
    {
      student_number: '',
      school: {
        name: '',
        school_address: {
          address_line_1: '',
          barangay: '',
          city_municipality: '',
          province: '',
          region: '',
          zip_code: '',
        },
      },
      education_level: '',
      start_year: '',
      end_year: '',
      honors_received: '',
      senior_high_gpa: '',
      submission: '',

    },
    ],
    health_data: {
      student_number: '',
      health_condition: '',
      height: '',
      weight: '',
      eye_sight: '',
      hearing: '',
      physical_disabilities: '',
      common_ailments: '',
      last_hospitalization: '',
      reason_of_hospitalization: '',
      submission: '',
    },
    scholarship: {
      student_number: '',
      scholarships_and_assistance: [],
      submission: '',
    },
    personality_traits: {
      student_number: '',
      enrollment_reason: '',
      degree_program_aspiration: '',
      aspiration_explanation: '',
      special_talents: '',
      musical_instruments: '',
      hobbies: '',
      likes_in_people: '',
      dislikes_in_people: '',
      submission: '',
    },
    family_relationship: {
      student_number: '',
      closest_to: '',
      specify_other: '',
      submission: '',
    },
    counseling_info: {
      student_number: '',
      personal_characteristics: '',
      problem_confidant: '',
      confidant_reason: '',
      anticipated_problems: '',
      previous_counseling: '',
      counseling_location: '',
      counseling_reason: '',
      submission: '',
    },
    privacy_consent: {
      student_number: '',
      has_consented: false,
      submission: '',
    },
  });

  const validateStep = (step, formData, submissionStatus) => {
    switch (step) {
      case 2:
        const errors = [
              ...validateParent(formData),
              ...validateGuardian(formData),
              ...validateSibling(formData)
            ];
        
        return errors;
      case 3:
          return validateHealthData(formData);
      case 4:
          return validatePreviousSchool(formData);
      case 5:
        return true;
      case 6:
        const personalDataErrors = [
          ...validatePersonalityTraits(formData),
          ...validateFamilyRelationship(formData),
          ...validateCounselingInfo(formData),
        ];

        if (personalDataErrors.length > 0) {
          return personalDataErrors;
        }
        return true;

      case 7:
        const consentErrors = validatePrivacyConsent(formData);
        if (consentErrors.length > 0) {
          return consentErrors;
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
        // Create draft submission if no form data exists
        const submissionId = await createDraftSubmission(studentNumber);

        if (submissionId) {
          // Set the submissionId state after creation
          response = await getFormBundle(studentNumber);
        }
      } else {
        if (response.submission) {
          const submissionId = response.submission?.id;
          setSubmissionId(submissionId);
          setSubmissionStatus(response.submission.status);  // Set the status of the submission
        }
      }

      // Fill the form data with the fetched response
      setFormData((prev) => ({
        family_data: {
          ...prev.family_data,
          ...response.family_data,
          submission: submissionId,
          student_number: studentNumber,
        },
        siblings: Array.isArray(response.siblings)
          ? response.siblings.map((sibling) => ({
              ...sibling,
              submission: submissionId,
              students: sibling.students?.length ? sibling.students : [studentNumber],
            }))
          : [],
        previous_school_record: Array.isArray(response.previous_school_record)
          ? response.previous_school_record.map((record) => ({
              ...record,
              submission: submissionId,
              student_number: studentNumber,
            }))
          : [],
        health_data: {
          ...prev.health_data,
          ...response.health_data,
          submission: submissionId,
          student_number: studentNumber,
        },
        scholarship: {
          ...prev.scholarship,
          ...response.scholarship,
          submission: submissionId,
          student_number: studentNumber,
        },
        personality_traits: {
          ...prev.personality_traits,
          ...response.personality_traits,
          submission: submissionId,
          student_number: studentNumber,
        },
        family_relationship: {
          ...prev.family_relationship,
          ...response.family_relationship,
          submission: submissionId,
          student_number: studentNumber,
        },
        counseling_info: {
          ...prev.counseling_info,
          ...response.counseling_info,
          submission: submissionId,
          student_number: studentNumber,
        },
        privacy_consent: {
          ...prev.privacy_consent,
          ...response.privacy_consent,
          submission: submissionId,
          student_number: studentNumber,
        },
      }));
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

    if (Array.isArray(errors) && errors.length > 0) {
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

if (loading || !submissionId) {
  return <Loader />
}

  return (
    <>
      <Navbar />
      <div className="background-rectangle"></div>
      <div className="content-wrapper">
        <div className="mainStepForm">
          <div className="main-form-info">
            <h1 className="main-form-title">Student Cumulative Information Sheet</h1>
            <p className="main-form-subtitle">
              Please fill out the form below to complete your profile.
            </p>
          </div>
          <div className="main-form-card">
            <ProgressBar currentStep={step} totalSteps={8} />
            {step === 0 && (
              <SCIFCredentials
                data={profileData}
              />
            )}
            {step === 1 && (
              <SCIFPersonalData
                data={profileData}
              />
            )}
            {step === 2 && (
              <SCIFFamilyData
                data={{
                  family_data: formData.family_data,
                  siblings: formData.siblings,
                }}
                updateData={(sectionKey, newData) =>
                  setFormData((prev) => ({
                    ...prev,
                    [sectionKey]: newData,
                  }))
                }
              />
          )}
            {step === 3 && (
              <SCIFHealthData
                data={{
                  ...formData.health_data,
                }}
                updateData={(newData) =>
                  setFormData((prev) => ({
                    ...prev,
                    health_data: {
                      ...prev.health_data,
                      ...newData,
                      student_number: studentNumber,
                      submission: submissionId,
                    },
                  }))
                }
              />
            )}
            {step === 4 && (
              <SCIFPreviousSchoolRecord
                data={formData.previous_school_record}
                updateData={(newData) =>
                  setFormData((prev) => ({
                    ...prev,
                    previous_school_record: { ...prev.previous_school_record, ...newData },
                  }))
                }
              />
            )}
            {step === 5 && (
              <SCIFScholarships
                data={formData.scholarship}
                updateData={(newData) =>
                  setFormData((prev) => ({
                    ...prev,
                    scholarship: newData,
                  }))
                }
              />
            )}
            {step === 6 && (
              <SCIFOtherPersonalData
                data={{
                  personality_traits: formData.personality_traits,
                  family_relationship: formData.family_relationship,
                  counseling_info: formData.counseling_info,
                }}
                updateData={(sectionKey, newData) =>
                  setFormData((prev) => ({
                    ...prev,
                    [sectionKey]: { ...prev[sectionKey], ...newData },
                  }))
                }
              />
            )}
            {step === 7 && (
                <SCIFCertify
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
                />
              )}
            <div className="main-form-buttons">
              {/* Back Button */}
              {step > 0 && !loading && (
                <button className="btn-secondary" onClick={handlePreviousStep}>
                  Back
                </button>
              )}

              {/* Save Draft Button */}
              <button className="btn-primary" onClick={handleSaveDraft} disabled={loading}>
                {loading ? 'Saving Draft...' : 'Save Draft'}
              </button>

              {/* Next Button (Visible until step 6) */}
              {step < 7 && !loading && (
                <button className="btn-primary" onClick={handleNextStep}>
                  Next
                </button>
              )}

              {/* Preview and Submit Button (Visible at step 7) */}
              {step === 7 && !loading && (
                <>
                  <button className="btn-primary" onClick={handlePreview}>
                    Preview
                  </button>
                  {isPreviewOpen && (
                    <BISPreview
                      profileData={profileData}  
                      formData={formData}
                      onClose={() => setIsPreviewOpen(false)}
                    />
                  )}
                  <button className="btn-submit" onClick={handleSubmit}>
                    Submit
                  </button>
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
    </>
  );
};

export default SCIF;