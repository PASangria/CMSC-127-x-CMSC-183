import React from 'react';
import { CheckCircle } from 'react-feather'; 
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import "./css_pages/VerifiedPage.css"

export const VerifiedPage = () => {
  const navigate = useNavigate();

  //   useEffect(() => {
//     setTimeout(() => {
//       navigate('/'); 
//     }, 5000); 
//   }, [navigate]);

  return (
    <div>
      <Navbar />
      <div className='className="verified-page"'>
        <div className="content-container">
            {/* Check Circle Icon */}
            <CheckCircle className="check-icon" size={80} />
            
            <h2>Your account has been verified successfully!</h2>
            <p>Please log in to continue.</p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};
