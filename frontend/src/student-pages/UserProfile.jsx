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
  const { isAuthenticated } = useContext(AuthContext);
  const { request } = useApiRequest();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!isAuthenticated) return;

      try {
        const res = await request('http://localhost:8000/api/forms/student/profile/', { method: 'GET' });

        if (!res.ok) {
          if (res.status === 404) {
            setProfile({});
            setLoading(false);
            return;
          }
          throw new Error('Failed to fetch profile data');
        }

        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError('Error fetching profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [isAuthenticated, request]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?role=student');
    }
  }, [isAuthenticated, navigate]);

  const handleCompleteProfile = () => {
    navigate('/setup-profile');
  };

  if (!isAuthenticated || loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <button onClick={handleCompleteProfile} className="btn-complete-profile">
          Complete Your Profile
        </button>
      </div>
    );
  }

  // If profile is empty (i.e., user hasn't set it up yet)
  if (profile && Object.keys(profile).length === 0) {
    return (
      <div>
      <Navbar />
      <div className="protected_pages">
        <SideNav_student />
      <div className="error-message">
        <p>No profile data available.</p>
        <button onClick={handleCompleteProfile} className="btn-complete-profile">
          Complete Your Profile
        </button>
      </div>
      </div>
      <Footer />
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
