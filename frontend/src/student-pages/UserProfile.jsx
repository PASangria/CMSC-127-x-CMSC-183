import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/NavBar';
import SideNav_student from '../components/SideNav_student';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { AuthContext } from '../context/AuthContext';
import { useApiRequest } from '../context/ApiRequestContext'; 
import StudentSideInfo from './IndividualStudent';
import './css/userDashboard.css';

export const UserProfile = () => {
  const { isAuthenticated, profileData } = useContext(AuthContext);
  const { request } = useApiRequest(); 
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      if (isAuthenticated) {
        try {
          const res = await request('http://localhost:8000/api/forms/student/profile/', { method: 'GET' });

          if (!res.ok) {
            throw new Error('Failed to fetch profile data');
          }

          const data = await res.json();
          setProfile(data);
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      }
    };

    fetchProfileData();
  }, [isAuthenticated, request]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?role=student');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const handleCompleteProfile = () => {
    navigate('/setup-profile');
  };

  // If the profile data is not yet available, show the loader
  if (profile === null) {
    return <Loader />;
  }

  // If the profile exists but is empty, prompt the user to complete their profile
  if (Object.keys(profile).length === 0) {
    return (
      <div className="error-message">
        <p>No profile data available.</p>
        <button onClick={handleCompleteProfile} className="btn-complete-profile">
          Complete Your Profile
        </button>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="protected_pages">
        <SideNav_student />
        <div className="profile-content">
          <h1>My Profile</h1>
          <StudentSideInfo profileData={profile} />
        </div>
      </div>
      <Footer />
    </div>
  );
};
