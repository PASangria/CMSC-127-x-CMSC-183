import React from 'react';
import '../forms/SetupProfile/css/multistep.css';
import DisplayField from '../components/DisplayField';

const BISProfileView = ({ profileData, formData }) => {
  if (!formData) return <div>Loading...</div>;  // Check for formData

  const { student_support, socio_economic_status, preferences, scholastic_status, privacy_consent } = formData;

  const renderSupportSources = () => {
    if (!student_support?.support?.length) return 'None';
    return student_support.support.map((item) => {
      switch (item) {
        case 'scholarship':
          return `Scholarship (${student_support.other_scholarship || 'Unspecified'})`;
        case 'combination':
          return `Combination (${student_support.combination_notes || 'Unspecified'})`;
        case 'others':
          return `Others (${student_support.other_notes || 'Unspecified'})`;
        default:
          return item.replace('_', ' ');
      }
    }).join(', ');
  };

  return (
    <div className='form-container'>
      <h2 className='step-title'>Basic Information Sheet</h2>

      {/* Personal Data */}
      <section>
        <h3>Personal Data</h3>
        <div className='form-row'>
          <DisplayField label="First Name" value={profileData.first_name} />
          <DisplayField label="Last Name" value={profileData.last_name} />
        </div>
        <div className='form-row'>
          <DisplayField label="Middle Name" value={profileData.middle_name} />
          <DisplayField label="Nickname" value={profileData.nickname} />
        </div>
        <div className='form-row'>
          <DisplayField label="Year Level" value={profileData.current_year_level} />
          <DisplayField label="Degree Program" value={profileData.degree_program} />
        </div>
      </section>

      {/* Socioeconomic Status */}
      <section>
        <h3>Socioeconomic Status</h3>
        <DisplayField label="Means of Support" value={renderSupportSources()} />
        <DisplayField label="Other Scholarships" value={socio_economic_status.scholarships} />
        <DisplayField label="Scholarship Privileges" value={socio_economic_status.scholarship_privileges} />
        <DisplayField label="Monthly Allowance" value={`₱${socio_economic_status.monthly_allowance}`} />
        <DisplayField label="Spending Priorities" value={socio_economic_status.spending_habit} />
      </section>

      {/* School Preferences */}
      <section>
        <h3>School Preferences</h3>
        <DisplayField label="Influence to Study in UPMin" value={preferences.influence} />
        <DisplayField label="Reason for Enrolling in UPMin" value={preferences.reason_for_enrolling} />
        <DisplayField label="Transfer Plans" value={preferences.transfer_plans ? 'Yes' : 'No'} />
        <DisplayField label="Reason for Transfer Plans" value={preferences.transfer_reason} />
        <DisplayField label="Shifting Plans" value={preferences.shift_plans ? 'Yes' : 'No'} />
        {preferences.shift_plans && (
          <>
            <DisplayField label="Planned Shift Degree" value={preferences.planned_shift_degree} />
            <DisplayField label="Reason for Shifting" value={preferences.reason_for_shifting} />
          </>
        )}
      </section>

      {/* Present Scholastic Info */}
      <section>
        <h3>Present Scholastic Information</h3>
        <DisplayField label="Intended Course After SHS" value={scholastic_status.intended_course} />
        <DisplayField label="UPCAT 1st Choice" value={scholastic_status.first_choice_course} />
        <DisplayField label="Admitted Course" value={scholastic_status.admitted_course} />
        {scholastic_status.first_choice_course !== scholastic_status.admitted_course && (
          <DisplayField label="Next Plan" value={scholastic_status.next_plan || 'N/A'} />
        )}
      </section>

      {/* Privacy Agreement */}
      <section>
        <h3>Privacy Statement</h3>
        <p>{privacy_consent?.has_consented ? '✓ Certified: The student agrees to the UP Privacy Notice.' : '✗ Not Certified'}</p>
      </section>
    </div>
  );
};

export default BISProfileView;
