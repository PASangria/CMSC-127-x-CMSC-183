import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import LogoutButton from "../components/LogoutButton"
import Navbar from '../components/NavBar';
import SideNav_student from '../components/SideNav_student';
import Footer from '../components/Footer';
import DashboardTable from '../components/DashboardTable';
import Loader from '../components/Loader';
import { AuthContext } from '../context/AuthContext';
import "./css_pages/userDashboard.css"

export const UserDashboard = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [submittedForms, setSubmittedForms] = useState([]);
  const [pendingActions, setPendingActions] = useState([]);
  const navigate = useNavigate();
  const [isProfileComplete, setIsProfileComplete] = useState(user?.profile?.is_completed);

  useEffect(() => {
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
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('You are not authenticated. Redirecting to the home page...');
        setTimeout(() => {
          window.location.href = '/';
        }, 3000); // Redirect after 3 seconds
      });
  }, []);

  if (loading) return <p>Loading...</p>;

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
      <div className='profile-content'>
      <h1>My Profile</h1>

      {isProfileComplete ? (
        // If profile is complete, show read-only profile information
        <div className="profile-info">
          <h2>Profile Information</h2>
          <p><strong>Name:</strong> {user.profile.name}</p>
          <p><strong>Email:</strong> {user.profile.email}</p>
          <p><strong>Phone:</strong> {user.profile.phone}</p>
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
      </div>
      <Footer />
    </div>
  );
};