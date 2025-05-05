import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/NavBar';
import SideNav_student from '../components/SideNav_student';
import Footer from '../components/Footer';
import DashboardTable from '../components/DashboardTable';
import Loader from '../components/Loader';
import { AuthContext } from '../context/AuthContext';
import './css/userDashboard.css'

export const UserDashboard = () => {

    const [submittedForms, setSubmittedForms] = useState([]);
    const [pendingActions, setPendingActions] = useState([]);

  return (
    <div className="profile-dashboard">
      <Navbar />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div className='profile-container'>
          <SideNav_student />
          <div style={{ flex: 1, padding: '20px', minWidth: 0 }}>
            <DashboardTable
              submittedForms={submittedForms}
              pendingActions={pendingActions}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
