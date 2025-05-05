import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/NavBar';
import SideNav_student from '../components/SideNav_student';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { AuthContext } from '../context/AuthContext';
import StudentSideInfo from './IndividualStudent';
import './css/userDashboard.css';

export const UserProfile = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const token = localStorage.getItem('access_token');
    if (!token) {
      setError('You are not authenticated. Redirecting...');
      return;
    }

    fetch('http://localhost:8000/api/forms/student/profile/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) {
            setError('Student profile not found.');
            setLoading(false);
            return null;
          }
          throw new Error('Profile fetch failed.');
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setProfileData(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Error fetching profile. Please try again.');
        setLoading(false);
      });
  }, [isAuthenticated, navigate]);

  const handleCompleteProfile = () => {
    navigate('/setup-profile');
  };

  if (loading) return <Loader />;

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

  return (
    <div>
      <Navbar />
        <div class="protected_pages">
        <SideNav_student />
        <div className="profile-content">
          <h1>My Profile</h1>
          {profileData ? (
            <>
            <StudentSideInfo profileData={profileData} />
            </>
          ) : (
            <p>No profile data available.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
