import React from 'react';
import DisplayField from '../../components/DisplayField'; 
import '../SetupProfile/css/multistep.css';
import { calculateAge } from '../../utils/helperFunctions';

const SCIFPersonalData = ({ data }) => {
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className='student_personal_info_wrapper'>
      <div className="student_personal_info">
        <p><strong>PERSONAL INFORMATION</strong></p>
        <div className='form-row three-columns'>
          <div className='form-group'>
            <DisplayField label="First Name" value={data.first_name} />
          </div>
          <div className='form-group'>
            <DisplayField label="Last Name" value={data.last_name} />
          </div>
          <div className='form-group'>
            <DisplayField label="Middle Name" value={data.middle_name} />
          </div>
        </div>

        <div className='form-row three-columns'>
          <div className='form-group'>
            <DisplayField label="Nickname" value={data.nickname} />
          </div>
          <div className='form-group'>
            <DisplayField label="Sex" value={data.sex} />
          </div>
          <div className='form-group'>
            <DisplayField label="Age" value={calculateAge(data.birthdate)} />
          </div>
        </div>

        <div className='form-row'>
          <div className='form-group'>
            <DisplayField label="Religion" value={data.religion} />
          </div>
          <div className='form-group'>
            <DisplayField label="Birth Rank" value={data.birth_rank} />
          </div>
        </div>
        <div className='form-row'>
          <div className='form-group'>
            <DisplayField label="Birthdate" value={data.birthdate} />
          </div>
          <div className='form-group'>
            <DisplayField label="Birth Place" value={data.birthplace} />
          </div>
        </div>
        
        <p><strong>PERMANENT ADDRESS</strong></p>
        <div className='form-row'>
          <DisplayField label="Address Line 1" value={data.permanent_address.address_line_1} />
          {data.permanent_address.address_line_2 && (
          <DisplayField label="Address Line 2" value={data.permanent_address.address_line_2 || "None"} />
          )}
          </div>
          <div className='form-row'>
            <DisplayField
                label="Barangay"
                value={`${data.permanent_address.barangay}`}
            />
            <DisplayField label="City/Municipality" value={`${data.permanent_address.city_municipality}`}></DisplayField>
          </div>
          <div className='form-row three-columns'>
            <DisplayField label="Province" value={`${data.permanent_address.province}`}></DisplayField>
            <DisplayField label="Region" value={`${data.permanent_address.region}`}></DisplayField>
            <DisplayField label="ZIP code" value={`${data.permanent_address.zip_code}`}></DisplayField>
          </div>

        <p><strong>CONTACT INFORMATION</strong></p>
        <div className='form-row three-columns'>
          <div className='form-group'>
            <DisplayField label="Landline/Contact Number" value={data.landline || "None"} />
          </div>
          <div className='form-group'>
            <DisplayField label="Cellphone/Mobile Number" value={data.contact_number} />
          </div>
          <div className='form-group'>
            <DisplayField label="Email Address" value={data.email} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SCIFPersonalData;
