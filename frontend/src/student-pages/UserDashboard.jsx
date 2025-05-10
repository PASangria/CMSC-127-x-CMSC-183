import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/NavBar';
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
      <div className="dashboard-content">
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div className='profile-container'>
            <div className='fade-in-up' style={{ flex: 1, padding: '20px', minWidth: 0 }}>
              <DashboardTable
                submittedForms={submittedForms}
                pendingActions={pendingActions}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
