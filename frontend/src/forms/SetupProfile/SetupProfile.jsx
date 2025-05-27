import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PersonalInfoForm from "./PersonalInfoForm";
import EducationInfoForm from "./EducationInfoForm";
import AddressInfoForm from "./AddressInfoForm";

import { apiRequest } from "../../utils/apiUtils";
import ProgressBar from "../../components/ProgressBar";
import PreviewModal from "./PreviewForm";
import Button from "../../components/UIButton";
import ToastMessage from "../../components/ToastMessage";
import ConfirmDialog from "../../components/ConfirmDialog";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../../components/Loader";
import { useApiRequest } from "../../context/ApiRequestContext";
import {
  validatePersonalInfo,
  validateEducation,
  validateAddress
} from "../../utils/formValidationUtils";
import DefaultLayout from "../../components/DefaultLayout";

function formatAddress(data, type) {
  return {
    line1: data[`${type}_address_line_1`],
    barangay: data[`${type}_barangay`],
    city_municipality: data[`${type}_city_municipality`],
    province: data[`${type}_province`],
    region: data[`${type}_region`],
    zip: data[`${type}_zip_code`],
  };
}

const MultiStepForm = () => {
  const { request } = useApiRequest();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);
  const [sameAsPermanent, setSameAsPermanent] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const navigate = useNavigate();
  const { profileData, setProfileData } = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    family_name: "",
    first_name: "",
    middle_name: "",
    nickname: "",
    sex: "",
    religion: "",
    birth_rank: "",
    birthdate: "",
    birth_place: "",
    landline_number: "",
    mobile_number: "",
    // Education
    student_number: "",
    college: "",
    degree_program: "",
    current_year_level: "",
    date_initial_entry: "",
    date_initial_entry_sem: "",
    // Permanent Address
    permanent_region: "",
    permanent_province: "",
    permanent_city_municipality: "",
    permanent_barangay: "",
    permanent_address_line_1: "",
    permanent_address_line_2: "",
    permanent_zip_code: "",
    // Address While In UP
    up_region: "",
    up_province: "",
    up_city_municipality: "",
    up_barangay: "",
    up_address_line_1: "",
    up_address_line_2: "",
    up_zip_code: "",
  });

  useEffect(() => {
    if (profileData === undefined) return;

    if (profileData?.is_complete) {
      navigate("/myprofile");
    } else {
      setLoading(false);
    }
  }, [profileData]);

  if (loading || profileData === undefined) {
    return <Loader />;
  }

  const validateStep = async (step, formData, sameAsPermanent = false, request) => {
  switch (step) {
    case 1:
      return validatePersonalInfo(formData);

    case 2:
      return await validateEducation(formData, request);

    case 3:
      return validateAddress(formatAddress(formData, 'permanent'), 'permanent');

    case 4:
      if (sameAsPermanent) return {};
      return validateAddress(formatAddress(formData, 'up'), 'up');

    case 5:
      return {};

    default:
      return {};
  }
};

  const handleNextStep = async() => {
    const validationErrors = await validateStep(step, formData, sameAsPermanent, request);
    if (
      validationErrors &&
      typeof validationErrors === "object" &&
      !Array.isArray(validationErrors) &&
      Object.keys(validationErrors).length > 0
    ) {
      setErrors(validationErrors);
      return;
    }

    if (Array.isArray(validationErrors) && validationErrors.length > 0) {
      const errorObj = {};
      validationErrors.forEach((err, index) => {
        errorObj[`error_${index}`] = err;
      });
      setErrors(errorObj);
      return;
    }

    setErrors(null);
    setStep((prev) => prev + 1);
  };


  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSameAsPermanentToggle = () => {
    const newValue = !sameAsPermanent;
    setSameAsPermanent(newValue);

    if (newValue) {
      setFormData((prev) => ({
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
    const birthdate = `${formData.birthYear}-${String(
      formData.birthMonth
    ).padStart(2, "0")}-${String(formData.birthDay).padStart(2, "0")}`;

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
      is_complete: true,
    };

    try {
      setLoading(true);

      const response = await apiRequest(
        "http://localhost:8000/api/forms/student/profile/create/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error("Failed to submit profile");

      const result = await response.json();
      setProfileData(result);
      setLoading(false);
      setShowSuccessToast(true);
      setTimeout(() => {
        navigate("/myprofile", { state: { showSuccess: true } });
      }, 2000);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const handleConfirmSubmit = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmCancel = () => {
    setShowConfirmDialog(false);
  };

  const handleConfirmAction = () => {
    setShowConfirmDialog(false);
    handleSubmit();
  };

  return (
      <DefaultLayout variant="student">

      {/* Background Rectangle */}
      <div className="background-rectangle"></div>

      <div className="content-wrapper">
        <div className="mainStepForm">
          <div className="main-form-info">
            <h1 className="main-form-title">SETUP YOUR PROFILE</h1>
            <p className="main-form-subtitle" style={{margin: "20px 0"}}>
              Please complete this profile accurately. 
              Your information will help the Office of Student Affairs provide the 
              appropriate guidance, support, and services during your stay at UP Mindanao.
            </p>
          </div>

          <div className="main-form-card">
            <div className="main-form">
              <ProgressBar currentStep={step} className="progress-bar" />
              {step === 1 && (
                <PersonalInfoForm
                  formData={formData}
                  setFormData={setFormData}
                  step={step}
                  errors={errors}
                  setErrors={setErrors}
                />
              )}
              {step === 2 && (
                <EducationInfoForm
                  formData={formData}
                  setFormData={setFormData}
                  step={step}
                  errors={errors}
                  setErrors={setErrors}
                />
              )}
              {step === 3 && (
                <AddressInfoForm
                  formData={formData}
                  setFormData={setFormData}
                  addressLabel="Permanent Address"
                  disabled={false}
                  prefix="permanent"
                  errors={errors}
                  setErrors={setErrors}
                />
              )}
              {step === 4 && (
                <AddressInfoForm
                  formData={formData}
                  setFormData={setFormData}
                  addressLabel="Address while in UP"
                  checkboxLabel="Same as Permanent Address"
                  sameAsPermanent={sameAsPermanent}
                  handleSameAsPermanentToggle={handleSameAsPermanentToggle}
                  disabled={sameAsPermanent}
                  prefix="up"
                />
              )}
              <div className="main-form-buttons">
                {/* Step 1: Only 'Next' button */}
                {step === 1 && (
                  <Button variant="primary" onClick={handleNextStep}>
                    Next
                  </Button>
                )}

                {/* Steps 2-4: 'Back' and 'Next' buttons */}
                {step >= 2 && step <= 3 && (
                  <>
                    <Button variant="secondary" onClick={handlePreviousStep}>
                      Back
                    </Button>
                    <Button
                      variant="primary"
                      onClick={handleNextStep}
                      style={{ marginLeft: "0.5rem" }}
                    >
                      Next
                    </Button>
                  </>
                )}

                {/* Step 5: 'Back', 'Preview', and 'Submit' buttons */}
                {step === 4 && (
                  <>
                    <Button variant="secondary" onClick={handlePreviousStep}>
                      Back
                    </Button>
                    <Button
                      variant="primary"
                      onClick={handlePreview}
                      style={{ marginLeft: "0.5rem" }}
                    >
                      Preview
                    </Button>
                    {isPreviewOpen && (
                      <PreviewModal
                        data={formData}
                        onClose={() => setIsPreviewOpen(false)}
                      />
                    )}
                    <Button
                      variant="primary"
                      onClick={handleConfirmSubmit}
                      style={{ marginLeft: "0.5rem" }}
                    >
                      Submit
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <ConfirmDialog
          title="Are you sure?"
          message="Please confirm that you want to submit your form."
          onConfirm={handleConfirmAction}
          onCancel={handleConfirmCancel}
        />
      )}

      {/* Success Toast */}
      {showSuccessToast && (
        <ToastMessage
          message="Your form has been successfully submitted!"
          onClose={() => setShowSuccessToast(false)}
          duration={5000}
        />
      )}
    </DefaultLayout>
  );
};

export default MultiStepForm;
