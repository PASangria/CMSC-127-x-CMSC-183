import React from 'react';
import '../forms/SetupProfile/css/multistep.css';
import './css/pdfStyle.css';

const BISProfileView = ({ profileData, formData }) => {
  if (!formData) return <div>Loading...</div>;

  const {
    student_support,
    socio_economic_status,
    preferences,
    scholastic_status,
    privacy_consent,
  } = formData;

  const supportOptions = [
    { key: 'self_supporting', label: 'Self-supporting' },
    { key: 'both_parents', label: 'Both parents' },
    { key: 'father_only', label: 'Father only' },
    { key: 'mother_only', label: 'Mother only' },
    { key: 'scholarship', label: `Scholarship (${student_support.other_scholarship || 'Unspecified'})` },
    { key: 'combination', label: `Combination (${student_support.combination_notes || 'Unspecified'})` },
    { key: 'others', label: `Others (${student_support.other_notes || 'Unspecified'})` },
    { key: 'government_funded', label: 'Government Funded' },
  ];

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '40px' }} className='pdf'>
      <div className='pdfHeader'>
      <div className='left'>
          <img src='../assets/UP_logo.jpg'></img>
        </div><div className='center'><h2 style={{ textAlign: 'center', lineHeight: 1.5 }}>
        UNIVERSITY OF THE PHILIPPINES MINDANAO<br />
        Office of Student Affairs<br />
        COUNSELING AND TESTING SECTION
      </h2>
      <p>
        Mintal, Tugbok District, Davao City 8022, Philippines<br />
        Telefax: 082-293-1353, 0918-918-4934 • Email: cts_osa.upmindanao@up.edu.ph
      </p></div>
      <div className='right'>
      <p><strong>OSA-CTS Form No. 02</strong> | <em>Revised 2022</em></p>
      </div>
      </div>
      <h3>BASIC INFORMATION SHEET</h3>
      <p><em>Note: Please PROVIDE the information asked for. The data contained in this form will be kept confidential and will serve as your record. Please fill in the blanks carefully and sincerely.</em></p>

      <div style={{ marginTop: '30px', fontWeight: 'bold' }}>
        I. PERSONAL DATA
        <div style={{ display: 'flex', marginTop: '10px', gap: '20px', whiteSpace: 'nowrap' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px', flex: 2 }}>
            1. Name:
            <input
              type="text"
              value={`${profileData.last_name}, ${profileData.first_name} ${profileData.middle_name}`}
              readOnly
              style={{ flex: 1 }}
            />
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px', flex: 1 }}>
            2. Nickname:
            <input
              type="text"
              value={profileData.nickname}
              readOnly
              style={{ flex: 1 }}
            />
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px', flex: 1.5 }}>
            3. Year & Course:
            <input
              type="text"
              value={`${profileData.current_year_level} - ${profileData.degree_program}`}
              readOnly
              style={{ flex: 1 }}
            />
          </label>
        </div>
      </div>

      <div style={{ marginTop: '30px', fontWeight: 'bold' }}>II. SOCIO-ECONOMIC STATUS</div>
      <div>
        <p>4. What is your means of support for your college education?</p>
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {supportOptions.map(({ key, label }) => {
            const isChecked = Array.isArray(student_support?.support) && student_support.support.includes(key);
            return (
              <li key={key}>
                <label>
                  <input type="checkbox" checked={isChecked} readOnly />
                  {' '}{label}
                </label>
              </li>
            );
          })}
        </ul>
      </div>
      <label>5. Other scholarships (aside from UP STS): <input type="text" value={socio_economic_status.scholarships} readOnly /></label>
      <label>6. Privileges from no. (5): <input type="text" value={socio_economic_status.scholarship_privileges} readOnly /></label>
      <label>7. Monthly allowance from family: <input type="text" value={`₱${socio_economic_status.monthly_allowance}`} readOnly /></label>
      <label>8. What do you spend much on? <textarea rows="2" value={socio_economic_status.spending_habit} readOnly /></label>

      <div style={{ marginTop: '30px', fontWeight: 'bold' }}>III. SCHOOL PREFERENCES</div>
      <label>9. Who influenced you to study in UP Mindanao? <input type="text" value={preferences.influence} readOnly /></label>
      <label>10. Reason/s for enrolling in UP Mindanao: <textarea rows="3" value={preferences.reason_for_enrolling} readOnly /></label>
      <label>11. Plan to transfer to another UP Campus by 2nd year? <input type="text" value={preferences.transfer_plans ? 'Yes' : 'No'} readOnly /></label>
      <label>12. Why or why not? <textarea rows="2" value={preferences.transfer_reason} readOnly /></label>
      <label>13. Plan to shift to another degree program by 2nd year? <input type="text" value={preferences.shift_plans ? 'Yes' : 'No'} readOnly /></label>
      {preferences.shift_plans && (
        <>
          <label>14. If yes, what degree program? <input type="text" value={preferences.planned_shift_degree} readOnly /></label>
          <label>15. Why? <textarea rows="2" value={preferences.reason_for_shifting} readOnly /></label>
        </>
      )}

      <div style={{ marginTop: '30px', fontWeight: 'bold' }}>IV. PRESENT SCHOLASTIC STATUS</div>
      <label>16. Intended course after SHS: <input type="text" value={scholastic_status.intended_course} readOnly /></label>
      <label>17. 1st choice in UPCA/UPCAT: <input type="text" value={scholastic_status.first_choice_course} readOnly /></label>
      <label>18. Course admitted: <input type="text" value={scholastic_status.admitted_course} readOnly /></label>
      <label>19. If different, next plan? <textarea rows="2" value={scholastic_status.next_plan || 'N/A'} readOnly /></label>

      <div className="signature" style={{ marginTop: '40px' }}>
        <p>20. I certify that all facts and information stated in this form are true and correct.</p>
        <p>21. Signature: ____________________________</p>
        <label>22. Date Filed: <input type="date" value={new Date().toLocaleDateString('en-CA')} readOnly /></label>
      </div>

      <div style={{ marginTop: '30px', fontWeight: 'bold' }}>Privacy Statement</div>
      <div style={{ border: '1px solid black', padding: '10px' }}>
        <p>The University of the Philippines takes your privacy seriously and we are committed to protecting your personal information. For the UP Privacy Policy, please visit <a href="https://privacy.up.edu.ph" target="_blank" rel="noopener noreferrer">https://privacy.up.edu.ph</a></p>
        <p>
          I have read the University of the Philippines’ Privacy Notice for Students. I understand that for the UP System to carry out its mandate under the 1987 Constitution, the UP Charter, and other laws, the University must necessarily process my personal and sensitive personal information. Therefore, I recognize the authority of the University of the Philippines to process my personal and sensitive personal information, pursuant to the UP Privacy Notice and applicable laws.
        </p>
      </div>

      <label>Name of Student: <input type="text" value={profileData.first_name + ' ' + profileData.last_name} readOnly /></label>
      <label>Signature of Student: <input type="text" /></label>
      <label>Date Signed: <input type="date" /></label>
    </div>
  );
};

export default BISProfileView;
