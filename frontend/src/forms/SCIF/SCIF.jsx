import React, { useState } from 'react';
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

const SCIF = () => {
  const [formData, setFormData] = useState({
    credentials: {
      studentNumber: '',
      email: '',
    },
    personalData: {
      surname: '',
      firstName: '',
      middleName: '',
      birthdate: '',
      sex: '',
    },
    familyData: {
      fatherName: '',
      motherName: '',
      guardianName: '',
    },
    healthData: {
      bloodType: '',
      allergies: '',
      medicalConditions: '',
    },
    previousSchoolRecord: {
      schoolName: '',
      yearGraduated: '',
    },
    scholarships: [],
    otherPersonalData: {
      enrollmentReason: '',
      degreeProgramAspiration: '',
      degreeProgramReason: '',
      specialTalents: '',
      musicalInstruments: '',
      hobbies: '',
      likesInPeople: '',
      dislikesInPeople: '',
      closestTo: [],
      personalCharacteristics: '',
      openUpTo: '',
      potentialProblems: '',
      previousCounseling: [],
      counselingWhen: '',
      counselingToWhom: '',
    },
  });

  const [step, setStep] = useState(0);

  const handleNextStep = () => setStep((prev) => prev + 1);
  const handlePreviousStep = () => setStep((prev) => prev - 1);

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
                data={formData.credentials}
                updateData={(newData) =>
                  setFormData((prev) => ({
                    ...prev,
                    credentials: { ...prev.credentials, ...newData },
                  }))
                }
              />
            )}
            {step === 1 && (
              <SCIFPersonalData
                data={formData.personalData}
                updateData={(newData) =>
                  setFormData((prev) => ({
                    ...prev,
                    personalData: { ...prev.personalData, ...newData },
                  }))
                }
              />
            )}
            {step === 2 && (
              <SCIFFamilyData
                data={formData.familyData}
                updateData={(newData) =>
                  setFormData((prev) => ({
                    ...prev,
                    familyData: { ...prev.familyData, ...newData },
                  }))
                }
              />
            )}
            {step === 3 && (
              <SCIFHealthData
                data={formData.healthData}
                updateData={(newData) =>
                  setFormData((prev) => ({
                    ...prev,
                    healthData: { ...prev.healthData, ...newData },
                  }))
                }
              />
            )}
            {step === 4 && (
              <SCIFPreviousSchoolRecord
                data={formData.previousSchoolRecord}
                updateData={(newData) =>
                  setFormData((prev) => ({
                    ...prev,
                    previousSchoolRecord: { ...prev.previousSchoolRecord, ...newData },
                  }))
                }
              />
            )}
            {step === 5 && (
              <SCIFScholarships
                data={formData.scholarships}
                updateData={(newData) =>
                  setFormData((prev) => ({
                    ...prev,
                    scholarships: newData,
                  }))
                }
              />
            )}
            {step === 6 && (
              <SCIFOtherPersonalData
                data={formData.otherPersonalData}
                updateData={(newData) =>
                  setFormData((prev) => ({
                    ...prev,
                    otherPersonalData: { ...prev.otherPersonalData, ...newData },
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
              {step < 7 && (
                <button className="btn-primary" onClick={handleNextStep}>
                  Next
                </button>
              )}
              {step === 7 && (
                <button
                  className="btn-submit"
                  onClick={() => alert('Form submitted!')}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SCIF;