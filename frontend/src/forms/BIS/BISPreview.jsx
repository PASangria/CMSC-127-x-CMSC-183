// src/pages/Student/BISPreview.js

import React from 'react';
import './../SetupProfile/css/multistep.css';
import './../../components/css/modal.css'; // For modal styles
import DisplayField from '../../components/DisplayField';

const BISPreview = ({ profileData, formData, onClose }) => {
  const { socio_economic_status, scholastic_status, preferences, student_support, certify } = formData;

  return (
    <div className="modal-overlay">
      <div className="modal-content large-modal">
        <button className="modal-close" onClick={onClose}>×</button>

        <div className="form-container">
          <h1 className="main-form-title">Basic Information Sheet (Preview)</h1>

          {/* PERSONAL DATA */}
          <div className="form-section">
            <h2 className="step-title">Personal Data</h2>
            <p>If you wish to update information in this section, please go to your profile and update it.</p>
            <div className="form-row">
              <DisplayField label="First Name" value={profileData.first_name} />
              <DisplayField label="Last Name" value={profileData.last_name} />
            </div>
            <div className="form-row">
              <DisplayField label="Middle Name" value={profileData.middle_name} />
              <DisplayField label="Nickname" value={profileData.nickname} />
            </div>
            <div className="form-row">
              <DisplayField label="Year" value={profileData.current_year_level} />
              <DisplayField label="Degree Program" value={profileData.degree_program} />
            </div>
          </div>

          {/* SOCIO-ECONOMIC STATUS */}
          <div className="form-section">
            <h2 className="step-title">Socio-Economic Status</h2>
            <DisplayField label="Means of Support" value={(student_support.support || []).join(', ')} />
            {student_support.other_scholarship && <DisplayField label="What Scholarship?" value={student_support.other_scholarship} />}
            {student_support.combination_notes && <DisplayField label="Combination of..." value={student_support.combination_notes} />}
            {student_support.other_notes && <DisplayField label="Others (Specify)" value={student_support.other_notes} />}
            <DisplayField label="Other Scholarships (besides STS)" value={socio_economic_status.scholarships} />
            <DisplayField label="Scholarship Privileges" value={socio_economic_status.scholarship_privileges} />
            <DisplayField label="Monthly Allowance (PHP)" value={socio_economic_status.monthly_allowance} />
            <DisplayField label="Spending Habit" value={socio_economic_status.spending_habit} />
          </div>

          {/* SCHOOL PREFERENCES */}
          <div className="form-section">
            <h2 className="step-title">School Preferences</h2>
            <DisplayField label="Who influenced you to study in UP Mindanao?" value={preferences.influence} />
            <DisplayField label="Reason(s) for enrolling in UP Mindanao" value={preferences.reason_for_enrolling} />
            <DisplayField label="Plans to transfer to another UP campus?" value={preferences.transfer_plans ? 'Yes' : 'No'} />
            {preferences.transfer_reason && <DisplayField label="Why / Why not?" value={preferences.transfer_reason} />}
            <DisplayField label="Plans to shift to another degree program?" value={preferences.shift_plans ? 'Yes' : 'No'} />
            {preferences.shift_plans && (
              <>
                <DisplayField label="Planned Shift Degree" value={preferences.planned_shift_degree} />
                <DisplayField label="Reason for Shifting" value={preferences.reason_for_shifting} />
              </>
            )}
          </div>

          {/* SCHOLASTIC STATUS */}
          <div className="form-section">
            <h2 className="form-title">Present Scholastic Information</h2>
            <DisplayField label="Intended Course (after SHS)" value={scholastic_status.intended_course} />
            <DisplayField label="1st Choice in UPCAT" value={scholastic_status.first_choice_course} />
            <DisplayField label="Admitted Course" value={scholastic_status.admitted_course} />
            {scholastic_status.first_choice_course !== scholastic_status.admitted_course && scholastic_status.next_plan && (
              <DisplayField label="Next Plan (due to different admitted course)" value={scholastic_status.next_plan} />
            )}
          </div>

          {/* PRIVACY CERTIFICATION */}
          <div className="form-section">
            <h2 className="form-title">Privacy Statement</h2>
            <p>
              The University of the Philippines takes your privacy seriously and we are committed to protecting your personal information.
              Read our full privacy policy at <a href="https://privacy.up.edu.ph" target="_blank" rel="noopener noreferrer">https://privacy.up.edu.ph</a>.
            </p>
            <p><strong>Certification:</strong> {certify ? '✔ You have certified and accepted the UP Privacy Notice.' : '✘ Not yet certified.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BISPreview;
