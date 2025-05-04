import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/NavBar';
import SideNav_student from '../components/SideNav_student';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { AuthContext } from '../context/AuthContext';
import '../pages/css_pages/userDashboard.css';

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
      <SideNav_student />
      <div className="profile-content">
        <h1>My Profile</h1>
        {profileData ? (
          <div className="profile-info">
            <h2>Profile Information</h2>
            <p><strong>Student Number:</strong> {profileData.student_number}</p>
            <p><strong>Name:</strong> {profileData.first_name} {profileData.middle_name} {profileData.last_name}</p>
            <p><strong>Nickname:</strong> {profileData.nickname}</p>
            <p><strong>Sex:</strong> {profileData.sex}</p>
            <p><strong>Religion:</strong> {profileData.religion}</p>
            <p><strong>Birthdate:</strong> {profileData.birthdate}</p>
            <p><strong>Birthplace:</strong> {profileData.birthplace}</p>
            <p><strong>Contact Number:</strong> {profileData.contact_number}</p>
            <p><strong>College:</strong> {profileData.college}</p>
            <p><strong>Program:</strong> {profileData.degree_program}</p>
            <p><strong>Year Level:</strong> {profileData.current_year_level}</p>
            <p><strong>Profile Complete:</strong> {profileData.is_complete ? 'Yes' : 'No'}</p>
          </div>
        ) : (
          <p>No profile data available.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};
