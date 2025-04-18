// frontend/src/pages/HomePage/index.jsx
import React from 'react';
import LoginModal from '../components/LoginModal';
import RegisterModal from '../components/RegisterModal';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <RegisterModal />
    </div>
  );
};

export default HomePage;
