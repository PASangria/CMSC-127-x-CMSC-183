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
import '../SetupProfile/css/multistep.css';
import { useApiRequest } from '../../context/ApiRequestContext';
import { AuthContext } from '../../context/AuthContext';
import { useFormApi } from '../SCIF/SCIFApi';

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
      },
      guardian: {
        first_name: '',
        last_name: '',
        contact_number: '',
        address: '',
        relationship_to_guardian: '',
        language_dialect: [],
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
      },
    ],
    previous_school_record: {
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
    },
    health_data: {
      student_number: '',
      health_condition: '',
      height: '',
      weight: '',
      eye_sight: '',
      hearing: '',
    },
    scholarship: {
      student_number: '',
      scholarships_and_assistance: [],
    },
    personality_traits: {
      student_number: '',
      enrollment_reason: '',
      degree_program_aspiration: false,
      aspiration_explanation: '',
      special_talents: '',
      musical_instruments: '',
      hobbies: '',
      likes_in_people: '',
      dislikes_in_people: '',
    },
    family_relationship: {
      student_number: '',
      closest_to: '',
    },
    counseling_info: {
      student_number: '',
      personal_characteristics: '',
      problem_confidant: '',
      confidant_reason: '',
      anticipated_problems: '',
      previous_counseling: false,
      counseling_location: '',
      counseling_reason: '',
    },
    privacy_consent: {
      student_number: '',
      has_consented: false,
    },
  });


  const [step, setStep] = useState(0);
  const [submissionId, setSubmissionId] = useState(null);
  const [studentNumber, setStudentNumber] = useState(profileData?.student_number);
  console.log(studentNumber);
  console.log(formData);
  console.log("137");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
   
  useEffect(() => {
    const fetchFormData = async () => {
      
      setLoading(true);
      try {
        let response = await getFormBundle(studentNumber);

        if (!response) {
          response = await createDraftSubmission(studentNumber);
        }
        if (response) {

          setFormData((prev) => ({
            family_data: { ...prev.family_data, ...response.family_data },
            siblings: { ...prev.siblings, ...response.siblings },
            previous_school_record: { ...prev.previous_school_record, ...response.previous_school_record },
            health_data: { ...prev.health_data, ...response.health_data },
            scholarship: { ...prev.scholarship, ...response.scholarship },
            personality_traits: { ...prev.personality_traits, ...response.personality_traits },
            family_relationship: { ...prev.family_relationship, ...response.family_relationship },
            counseling_info: { ...prev.counseling_info, ...response.counseling_info },
            privacy_consent: { ...prev.privacy_consent, ...response.privacy_consent },
          }));

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
    console.log(formData + "IN LINE 188")
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
  console.log(formData);
  console.log("200");


  // Handle navigation between steps
  const handleNextStep = () => {
    setStep(prev => prev + 1);
  };
  const handlePreviousStep = () => setStep((prev) => prev - 1);

  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  const handleSubmit = async () => {};
  
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
                  healthCondition: formData.health_data.healthCondition || [], // Ensure healthCondition is an array
                }}
                updateData={(newData) =>
                  setFormData((prev) => ({
                    ...prev,
                    health_data: { ...prev.health_data, ...newData },
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
              {step < 6 && !loading && (
                <button className="btn-primary" onClick={handleNextStep}>
                  Next
                </button>
              )}

              {/* Preview and Submit Button (Visible at step 7) */}
              {step === 6 && !loading && (
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