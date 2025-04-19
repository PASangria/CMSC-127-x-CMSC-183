// frontend/src/pages/HomePage.jsx
import React from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import RegisterModal from '../components/RegisterModal';
import "./HomePage.css"

const HomePage = () => {
  return (
    <div className="home-container">
      <Navbar />
      <main className="home-content">
        <h1>Welcome to the Home Page</h1>
        <RegisterModal />
      </main>
      <Footer />
      <div className="homeBackground"></div>
    </div>
  );
};

export default HomePage;
