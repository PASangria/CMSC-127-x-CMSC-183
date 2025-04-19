// frontend/src/pages/HomePage/index.jsx
import React from 'react';
import LoginModal from '../components/LoginModal';
import RegisterModal from '../components/RegisterModal';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <h1>Welcome to the Home Page</h1>
      <RegisterModal />
      <Footer /> 
    </div>
  );
};

export default HomePage;
