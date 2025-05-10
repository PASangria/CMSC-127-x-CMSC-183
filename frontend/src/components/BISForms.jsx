import React, { useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import "../pages/css_pages/BISForms.css";

const BISForms = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    surname: "",
    firstName: "",
    middleName: "",
    nickname: "",
    year: "",
    program: "",
    meansOfSupport: [],
    scholarship: "",
    otherScholarship: "",
    allowance: "",
    influence: "",
    reasons: "",
    transfer: "",
    intendedCourse: "",
    upcaChoice: "",
    admittedCourse: "",
    certify: false,
    signature: "",
    dateFiled: "",
  });

  const steps = [
    "Personal Data",
    "Socio-Economic Status",
    "School Preference",
    "Present Scholastic",
    "Certify",
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleDraft = () => {
    alert("Your progress has been saved as a draft.");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "meansOfSupport") {
      const newSupport = [...formData.meansOfSupport];
      if (checked) {
        newSupport.push(value);
      } else {
        const index = newSupport.indexOf(value);
        if (index !== -1) newSupport.splice(index, 1);
      }
      setFormData({ ...formData, meansOfSupport: newSupport });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="form-section">
            <h3>Personal Data</h3>
            <div className="form-grid">
              {["surname", "firstName", "middleName", "nickname"].map((field) => (
                <div className="form-group" key={field}>
                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    placeholder=" "
                  />
                  <label>{field.replace(/([A-Z])/g, " $1")}</label>
                </div>
              ))}
              <div className="form-group">
                <select name="year" value={formData.year} onChange={handleChange}>
                  <option value="">Select Year</option>
                  <option value="First">First</option>
                  <option value="Second">Second</option>
                  <option value="Third">Third</option>
                  <option value="Fourth">Fourth</option>
                </select>
                <label>Year</label>
              </div>
              <div className="form-group">
                <select name="program" value={formData.program} onChange={handleChange}>
                  <option value="">Select Program</option>
                  <option value="BS Computer Science">BS Computer Science</option>
                  <option value="BS Biology">BS Biology</option>
                  <option value="BA Communication and Media Arts">BA Communication and Media Arts</option>
                  {/* Add more options as needed */}
                </select>
                <label>Program/Course</label>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="form-section">
            <h3>Socio-Economic Status</h3>
            <div className="form-group checkbox-group">
              {["Self-supporting", "Both parents", "Father only", "Mother only", "Government Funded", "Scholarship", "Combination of", "Others"].map((option) => (
                <label key={option}>
                  <input
                    type="checkbox"
                    name="meansOfSupport"
                    value={option}
                    checked={formData.meansOfSupport.includes(option)}
                    onChange={handleChange}
                  />
                  {option}
                </label>
              ))}
            </div>
            <div className="form-group">
              <input
                type="text"
                name="scholarship"
                value={formData.scholarship}
                onChange={handleChange}
                placeholder=" "
              />
              <label>What Scholarship?</label>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="otherScholarship"
                value={formData.otherScholarship}
                onChange={handleChange}
                placeholder=" "
              />
              <label>Other Scholarships</label>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="allowance"
                value={formData.allowance}
                onChange={handleChange}
                placeholder=" "
              />
              <label>Monthly Allowance</label>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="form-section">
            <h3>School Preference</h3>
            <div className="form-group">
              <input
                type="text"
                name="influence"
                value={formData.influence}
                onChange={handleChange}
                placeholder=" "
              />
              <label>Influenced by</label>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="reasons"
                value={formData.reasons}
                onChange={handleChange}
                placeholder=" "
              />
              <label>Reasons for enrolling in UPMin</label>
            </div>
            <div className="form-group radio-group">
              <p>Plans to transfer to another UP campus?</p>
              <label>
                <input
                  type="radio"
                  name="transfer"
                  value="Yes"
                  checked={formData.transfer === "Yes"}
                  onChange={handleChange}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="transfer"
                  value="No"
                  checked={formData.transfer === "No"}
                  onChange={handleChange}
                />
                No
              </label>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="form-section">
            <h3>Present Scholastic</h3>
            {["intendedCourse", "upcaChoice", "admittedCourse"].map((field) => (
              <div className="form-group" key={field}>
                <select name={field} value={formData[field]} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="Option 1">Option 1</option>
                  <option value="Option 2">Option 2</option>
                </select>
                <label>{field.replace(/([A-Z])/g, " $1")}</label>
              </div>
            ))}
          </div>
        );
      case 4:
        return (
          <div className="form-section">
            <h3>Certify</h3>
            <label>
              <input
                type="checkbox"
                name="certify"
                checked={formData.certify}
                onChange={handleChange}
              />
              I certify that all the data and information stated are true and correct.
            </label>
            <div className="form-group">
              <input
                type="text"
                name="signature"
                value={formData.signature}
                onChange={handleChange}
                placeholder=" "
              />
              <label>Signature</label>
            </div>
            <div className="form-group">
              <input
                type="date"
                name="dateFiled"
                value={formData.dateFiled}
                onChange={handleChange}
              />
              <label>Date Filed</label>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <NavBar />
      <div className="multi-step-form">
        <h2>Basic Information Sheet</h2>
        <div className="progress-bar">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`progress-step ${index <= currentStep ? "active" : ""}`}
            >
              <div className="circle"></div>
              <p>{step}</p>
            </div>
          ))}
        </div>
        {renderStepContent()}
        <div className="form-navigation">
          {currentStep > 0 && (
            <button className="back-button" onClick={handleBack}>
              Back
            </button>
          )}
          <button className="draft-button" onClick={handleDraft}>Draft</button>
          {currentStep < steps.length - 1 ? (
            <button className="next-button" onClick={handleNext}>Next</button>
          ) : (
            <button className="submit-button" onClick={() => alert("Form submitted!")}>Submit</button>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BISForms;
