// frontend/src/pages/HomePage/index.jsx
import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import "./css_pages/pages.css"


export const HomePage = () => {
  return (
    <div>
      <NavBar />
      <h1>Welcome to the Home Page</h1>
      <RegisterModal />
      <Footer /> 
      <div className="homeBackground"></div>
    </div>
  );
};

export default HomePage;
