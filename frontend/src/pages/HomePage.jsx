// frontend/src/pages/HomePage/index.jsx
import React from 'react';
import NavBar from '../components/NavBar';
import "./css_pages/pages.css"

export const HomePage = () => {
  return (
    <div>
      <NavBar />
      <div className="homeBackground"></div>
    </div>
  );
};

export default HomePage;
