import React from 'react';
import DisplayField from '../components/DisplayField';
import './css/individualStudentInfo.css'

const StudentSideInfo = ({ profileData }) => {
  if (!profileData) {
    return <div>Loading...</div>; 
  }

  const { first_name, last_name, student_number, current_year_level, degree_program, college, email, date_initial_entry, date_initial_entry_sem } = profileData;
  
  const firstName = first_name || "N/A";
  const lastName = last_name || "N/A";

  return (
    <div className='student_profile_wrapper'>
    <div className="student_side_info">
      {/* Avatar: Displaying the initials of the student */}
      <div className="bigger_avatar">
        {firstName.charAt(0)}{lastName.charAt(0)}
      </div>

      {/* Student Information: Student Number */}
      <div className="student_side_educ_info">
        <p>{student_number}</p>
        <p>------------------------------</p>
        <strong>Student Number:</strong>
      </div>

      {/* Current Year Level */}
      <div className="student_side_educ_info">
        <p>{current_year_level}</p>
        <p>------------------------------</p>
        <strong>Current Year Level:</strong>
      </div>

      {/* Degree Program */}
      <div className="student_side_educ_info">
        <p>{degree_program}</p>
        <p>------------------------------</p>
        <strong>Degree Program:</strong>
      </div>
      
      {/* College */}
      <div className="student_side_educ_info">
        <p>{college}</p>
        <p>------------------------------</p>
        <strong>College:</strong>
      </div>

      <div className="student_side_educ_info">
        <p>{email}</p>
        <p>------------------------------</p>
        <strong>UP Mail:</strong>
      </div>
      <div className="student_side_educ_info">
        <p>{date_initial_entry_sem}- AY {date_initial_entry}</p>
        <p>------------------------------</p>
        <strong>Date of Initial Entry:</strong>
      </div>
      </div>
      <div className='right-student-profile'>
        <div className='student-personal-info'>
            <div className='info-group'>
            <p><strong>PERSONAL INFORMATION</strong></p>
            <div>
              <div className='form-row three-columns'>
                <div className='form-group'><DisplayField label="First Name" value={profileData.first_name} /></div>
                <div className='form-group'><DisplayField label="Last Name" value={profileData.last_name} /></div>
                <DisplayField label="Middle Name" value={profileData.middle_name} />
                
              </div>
              <div className='form-row three-columns'>
                <DisplayField label="Nickname" value={profileData.nickname} />
                <DisplayField label="Sex" value={profileData.sex} />
                <DisplayField label="Religion" value={profileData.religion} />
              </div>
              <div className='form-row three-columns'>
                <DisplayField label="Birthdate" value={profileData.birthdate} />
                <DisplayField label="Birth Place" value={profileData.birthplace} />
                <DisplayField label="Birth Rank" value={profileData.birth_rank} />
              </div>
              <div className='form-row'>
                <DisplayField label="Contact Number" value={profileData.contact_number} />
                <DisplayField label="Landline Number" value={profileData.landline_number || "None"} />
              </div>  
                <p><strong>PERMANENT ADDRESS</strong></p>
                <DisplayField label="Address Line 1" value={profileData.permanent_address.address_line_1} />
                {profileData.permanent_address.address_line_2 && (
                <DisplayField label="Address Line 2" value={profileData.permanent_address.address_line_2 || "None"} />
                )}
                <div className='form-row'>
                  <DisplayField
                      label="Barangay"
                      value={`${profileData.permanent_address.barangay}`}
                  />
                  <DisplayField label="City/Municipality" value={`${profileData.permanent_address.city_municipality}`}></DisplayField>
                </div>
                <div className='form-row three-columns'>
                  <DisplayField label="Province" value={`${profileData.permanent_address.province}`}></DisplayField>
                  <DisplayField label="Region" value={`${profileData.permanent_address.region}`}></DisplayField>
                  <DisplayField label="ZIP code" value={`${profileData.permanent_address.zip_code}`}></DisplayField>
                </div>

                <p><strong>ADDRESS WHILE IN UP</strong></p>
                <DisplayField label="Address Line 1" value={profileData.address_while_in_up.address_line_1} />
                {profileData.permanent_address.address_line_2 && (
                <DisplayField label="Address Line 2" value={profileData.address_while_in_up.address_line_2 || "None"} />
                )}
                <div className='form-row'>
                  <DisplayField
                      label="Barangay"
                      value={`${profileData.address_while_in_up.barangay}`}
                  />
                  <DisplayField label="City/Municipality" value={`${profileData.address_while_in_up.city_municipality}`}></DisplayField>
                </div>
                <div className='form-row three-columns'>
                  <DisplayField label="Province" value={`${profileData.address_while_in_up.province}`}></DisplayField>
                  <DisplayField label="Region" value={`${profileData.address_while_in_up.region}`}></DisplayField>
                  <DisplayField label="ZIP code" value={`${profileData.address_while_in_up.zip_code}`}></DisplayField>
                </div>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSideInfo;
