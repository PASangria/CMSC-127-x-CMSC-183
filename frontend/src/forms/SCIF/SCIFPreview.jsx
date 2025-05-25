import React from "react";
import ReactDOM from "react-dom";
import "./../SetupProfile/css/multistep.css";
import "./../../components/css/modal.css";
import SCIFCredentials from "./SCIFCredentials";
import SCIFPersonalData from "./SCIFPersonalData";
import SCIFFamilyData from "./SCIFFamilyData";
import SCIFHealthData from "./SCIFHealthData";
import SCIFPreviousSchoolRecord from "./SCIFPreviousSchoolRecord";
import SCIFScholarships from "./SCIFScholarships";
import SCIFOtherPersonalData from "./SCIFOtherPersonalData";
import SCIFCertify from "./SCIFCertify";
import { X } from "react-feather";

const SCIFPreview = ({ profileData, formData, onClose }) => {
  const modalContent = (
    <div className="modal-overlay">
      <div className="modal-content large-modal">
        <button className="modal-close-btn" onClick={onClose}>
          <X size={24} />
        </button>
          <h1 className="step-title">Student Cumulative Information File</h1>
          <p className="step-info" style={{textAlign: "left"}}>(Preview)</p>
          <SCIFCredentials data={profileData} />
          <SCIFPersonalData data={profileData} />
          <SCIFFamilyData
            data={{
              family_data: formData.family_data,
              siblings: formData.siblings,
            }}
            readOnly={true}
          />
          <SCIFHealthData
            data={{
              ...formData.health_data,
            }}
            readOnly={true}
          />
          <SCIFPreviousSchoolRecord
            data={formData.previous_school_record}
            readOnly={true}
          />
          <SCIFScholarships data={formData.scholarship} readOnly={true} />
          <SCIFOtherPersonalData
            data={{
              personality_traits: formData.personality_traits,
              family_relationship: formData.family_relationship,
              counseling_info: formData.counseling_info,
            }}
            readOnly={true}
          />
          <SCIFCertify data={formData} readOnly={true}  style={{padding: 0}}/>
        </div>
      </div>
  );
  return ReactDOM.createPortal(modalContent, document.body);
};

export default SCIFPreview;
