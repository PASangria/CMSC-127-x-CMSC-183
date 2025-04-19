import React from 'react';
import './Logo.css'; // Import CSS for styling
import logo from '../assets/UPMin_logo.png'; // Adjust the path to your logo file

const Logo = () => {
  return (
    <div className="logo-container">
      <img src={logo} alt="UP Mindanao Logo" className="logo-image" />
      <div className="logo-text">
        <h1>University of the Philippines</h1>
        <h2>MINDANAO</h2>
      </div>
    </div>
  );
};

export default Logo;