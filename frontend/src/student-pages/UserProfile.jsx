import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/NavBar';
import SideNav_student from '../components/SideNav_student';
import Footer from '../components/Footer';
import DashboardTable from '../components/DashboardTable';
import Loader from '../components/Loader';
import { AuthContext } from '../context/AuthContext';
import '../pages/css_pages/userDashboard.css'

export const UserProfile = () => {
  const {user, isAuthenticated } = useContext(AuthContext);
  const [isProfileComplete, setIsProfileComplete] = useState(null); // Start with null for loading state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login'); // Redirect to login if not authenticated
    } else {
      // Fetch user profile details
      fetch('http://localhost:8000/api/users/profile/', {
        credentials: 'include',  // Ensure cookies (like session cookies) are sent
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Not authenticated');
          }
          return res.json();
        })
        .then((data) => {
          setIsProfileComplete(data?.profile?.is_completed);
          setLoading(false); // Once data is fetched, set loading to false
        })
        .catch((err) => {
          console.error(err);
          setError('You are not authenticated. Redirecting to the home page...');
          setTimeout(() => {
            window.location.href = '/';
          }, 3000); // Redirect after 3 seconds
        });
    }
  }, [isAuthenticated, navigate]);

  const handleCompleteProfile = () => {
    navigate('/setup-profile');
  };

  if (loading) {
    return <Loader />;  // Show loading spinner while fetching the user data
  }

  if (error) {
    return <div>{error}</div>;  // Show error message if something went wrong
  }

  return (
    <div>
      <Navbar />
      <SideNav_student />
      <div className='profile-content'>
          <h1>My Profile</h1>

          {isProfileComplete === null ? (
            <p>Loading...</p> // Show loading state if isProfileComplete is null
          ) : isProfileComplete ? (
            // If profile is complete, show read-only profile information
            <div className="profile-info">
              <h2>Profile Information</h2>
              <p><strong>Name:</strong> {user?.profile?.name}</p>
              <p><strong>Email:</strong> {user?.profile?.email}</p>
              <p><strong>Phone:</strong> {user?.profile?.phone}</p>
              {/* Display other profile fields */}
            </div>
          ) : (
            // If profile is not complete, prompt to complete profile
            <div className="profile-incomplete">
              <p>Your profile is incomplete. Please complete it to continue using all features.</p>
              <button onClick={handleCompleteProfile} className="btn-complete-profile">
                Complete Your Profile
              </button>
            </div>
          )}
        </div>
      <Footer />
    </div>
  );
};
