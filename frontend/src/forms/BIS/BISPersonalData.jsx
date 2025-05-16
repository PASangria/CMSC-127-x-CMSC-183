import React, { useContext } from 'react';
import '../SetupProfile/css/multistep.css'
import DisplayField from '../../components/DisplayField';

const BISPersonalData = ({ profileData }) => {

    if (!profileData) return <div>Loading...</div>;

    return (
        <div className='form-container'>
            <h2 className='step-title'>Personal Data</h2>
            <p>If you wish to update information in this section, please go to your profile and update it. </p>
            <div className='form-row'>
                <div className='form-group'><DisplayField label="First Name" value={profileData.first_name} /></div>
                <div className='form-group'><DisplayField label="Last Name" value={profileData.last_name} /></div>
            </div>
            <div className='form-row'>
                <div className='form-group'><DisplayField label="Middle Name" value={profileData.middle_name} /></div>
                <div className='form-group'><DisplayField label="Nickname" value={profileData.nickname} /></div>
            </div>
            <div className='form-row'>
                <div className='form-group'><DisplayField label="Year" value={profileData.current_year_level} /></div>
                <div className='form-group'><DisplayField label="Degree Program" value={profileData.degree_program} /></div>
            </div>
        </div>
    );
};


export default BISPersonalData;