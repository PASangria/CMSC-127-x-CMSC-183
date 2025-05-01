import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { CheckCircle, AlertCircle } from 'react-feather'; // Add AlertCircle for unverified users
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import './css_pages/VerifiedPage.css';

export const VerifiedPage = () => {
  const { uid, token } = useParams();
  const [message, setMessage] = useState('Verifying your email...');
  const [icon, setIcon] = useState(<CheckCircle className="check-icon" size={80} />); // Default icon is CheckCircle
  const location = useLocation();
  const navigate = useNavigate(); 

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch('http://localhost:8000/auth/users/activation/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ uid, token }),
        });

        if (response.ok) {
          setMessage('Your email has been verified! You can now log in.');
          setIcon(<CheckCircle className="check-icon" size={80} />);
        } else {
          setMessage('Verification failed. The link may be invalid or expired.');
          setIcon(<AlertCircle className="alert-icon" size={80} />);
        }
      } catch (error) {
        setMessage('An error occurred during verification.');
        setIcon(<AlertCircle className="alert-icon" size={80} />);
      }
    };

    if (uid && token) {
      verifyEmail();
    }
  }, [uid, token]);

  

  return (
    <div>
      <Navbar />
      <div className="verified-page">
        <div className="content-container">
          {icon} 
          <h2>{message}</h2>
          {message.includes("verified") && (
          <button
            onClick={() => navigate('/')}
            className="continue-button"
          >
            Continue to Login
          </button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
