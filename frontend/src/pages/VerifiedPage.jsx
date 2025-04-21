import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, AlertCircle } from 'react-feather'; // Add AlertCircle for unverified users
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import './css_pages/VerifiedPage.css';
import { AuthContext } from '../context/AuthContext';

export const VerifiedPage = () => {
  const [message, setMessage] = useState('');
  const [icon, setIcon] = useState(<CheckCircle className="check-icon" size={80} />); // Default icon is CheckCircle
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(AuthContext);  

  useEffect(() => {
    if (isAuthenticated) {
      setMessage('Your email has been verified, and you are now logged in. Continue exploring your account!');
      setIcon(<CheckCircle className="check-icon" size={80} />); // Use check icon for verified user
      return;  
    }

    // Get query params from the URL
    const urlParams = new URLSearchParams(location.search);
    const status = urlParams.get('status');

    // Show the appropriate message based on verification status
    if (status === 'verified') {
      setMessage('Your email address has been verified! Please log in to continue and start using your account.');
      setIcon(<CheckCircle className="check-icon" size={80} />); 
    } else {
      setMessage("Looks like you're not verified yet. Check your inbox for the verification link and complete your sign-up!");
      setIcon(<AlertCircle className="alert-icon" size={80} />); 
    }
  }, [location.search, isAuthenticated, navigate]);

  return (
    <div>
      <Navbar />
      <div className="verified-page">
        <div className="content-container">
          {icon} {/* Render the dynamic icon */}
          <h2>{message}</h2>
        </div>
      </div>
      <Footer />
    </div>
  );
};
