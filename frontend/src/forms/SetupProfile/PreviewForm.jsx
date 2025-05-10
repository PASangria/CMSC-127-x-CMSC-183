import React from 'react';
import "./css/multistep.css"
import { X } from 'react-feather';


const PreviewModal = ({ data, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
          <button className="modal-close-btn" onClick={onClose}>
            <X size={24} />
        </button>
        <h2>Profile Preview</h2>

        <section>
          <h3>Personal Information</h3>
          <p><strong>Family Name:</strong> {data.family_name}</p>
          <p><strong>First Name:</strong> {data.first_name}</p>
          <p><strong>Middle Name:</strong> {data.middle_name}</p>
          <p><strong>Nickname:</strong> {data.nickname}</p>
          <p><strong>Sex:</strong> {data.sex}</p>
          <p><strong>Religion:</strong> {data.religion}</p>
          <p><strong>Birth Rank:</strong> {data.birth_rank}</p>
          <p><strong>Birthdate:</strong> {data.birthdate}</p>
          <p><strong>Birth Place:</strong> {data.birth_place}</p>
          <p><strong>Landline:</strong> {data.landline_number}</p>
          <p><strong>Mobile:</strong> {data.mobile_number}</p>
        </section>

        <section>
          <h3>Education Information</h3>
          <p><strong>Student Number:</strong> {data.student_number}</p>
          <p><strong>College:</strong> {data.college}</p>
          <p><strong>Degree Program:</strong> {data.degree_program}</p>
          <p><strong>Year Level:</strong> {data.current_year_level}</p>
        </section>

        <section>
          <h3>Permanent Address</h3>
          <p><strong>Region:</strong> {data.permanent_region}</p>
          <p><strong>Province:</strong> {data.permanent_province}</p>
          <p><strong>City/Municipality:</strong> {data.permanent_city_municipality}</p>
          <p><strong>Barangay:</strong> {data.permanent_barangay}</p>
          <p><strong>Address 1:</strong> {data.permanent_address_line_1}</p>
          <p><strong>Address 2:</strong> {data.permanent_address_line_2}</p>
          <p><strong>ZIP Code:</strong> {data.permanent_zip_code}</p>
        </section>

        <section>
          <h3>Address While in UP</h3>
          <p><strong>Region:</strong> {data.up_region}</p>
          <p><strong>Province:</strong> {data.up_province}</p>
          <p><strong>City/Municipality:</strong> {data.up_city_municipality}</p>
          <p><strong>Barangay:</strong> {data.up_barangay}</p>
          <p><strong>Address 1:</strong> {data.up_address_line_1}</p>
          <p><strong>Address 2:</strong> {data.up_address_line_2}</p>
          <p><strong>ZIP Code:</strong> {data.up_zip_code}</p>
        </section>

        <button onClick={onClose} className="btn-secondary">Close</button>
      </div>
    </div>
  );
};

export default PreviewModal;
