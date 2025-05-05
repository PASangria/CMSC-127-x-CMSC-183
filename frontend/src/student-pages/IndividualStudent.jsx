import React from 'react';
import DisplayField from '../components/DisplayField';
import './css/individualStudentInfo.css'

const StudentSideInfo = ({ profileData }) => {
  if (!profileData) {
    return <div>Loading...</div>;  // You can customize this part to show a loading indicator
  }

  const { first_name, last_name, student_number, current_year_level, degree_program, college } = profileData;
  
  // Using first letter of first and last name for avatar
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
      </div>
      <div className='right-student-profile'>
        <div className='student-personal-info'>
            <div className='info-group'>
            <p><strong>PERSONAL INFORMATION</strong></p>
            <div style={{ maxWidth: '400px' }}>
                <DisplayField label="First Name" value={profileData.first_name} />
                <DisplayField label="Last Name" value={profileData.last_name} />
                <DisplayField label="Nickname" value={profileData.nickname} />
                <DisplayField label="Sex" value={profileData.sex} />
                <DisplayField label="Religion" value={profileData.religion} />
                <DisplayField label="Birthdate" value={profileData.birthdate} />
                <DisplayField label="Birthplace" value={profileData.birthplace} />
                <DisplayField label="Contact Number" value={profileData.contact_number} />

                <h3>Permanent Address</h3>
                <DisplayField label="Address Line 1" value={profileData.permanent_address.address_line_1} />
                {profileData.permanent_address.address_line_2 && (
                    <DisplayField label="Address Line 2" value={profileData.permanent_address.address_line_2} />
                )}
                <DisplayField
                    label="Barangay / Municipality"
                    value={`${profileData.permanent_address.barangay}, ${profileData.permanent_address.city_municipality}`}
                />
                <DisplayField
                    label="Province / Region / Zip"
                    value={`${profileData.permanent_address.province}, ${profileData.permanent_address.region} ${profileData.permanent_address.zip_code}`}
                />

                <h3>Address While in UP</h3>
                <DisplayField label="Address Line 1" value={profileData.address_while_in_up.address_line_1} />
                {profileData.address_while_in_up.address_line_2 && (
                    <DisplayField label="Address Line 2" value={profileData.address_while_in_up.address_line_2} />
                )}
                <DisplayField
                    label="Barangay / Municipality"
                    value={`${profileData.address_while_in_up.barangay}, ${profileData.address_while_in_up.city_municipality}`}
                />
                <DisplayField
                    label="Province / Region / Zip"
                    value={`${profileData.address_while_in_up.province}, ${profileData.address_while_in_up.region} ${profileData.address_while_in_up.zip_code}`}
                />
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSideInfo;
