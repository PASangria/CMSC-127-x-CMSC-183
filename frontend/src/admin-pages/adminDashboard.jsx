import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import Navbar from '../components/NavBar';
import SideNav_admin from '../components/SideNav_admin';
import Footer from '../components/Footer';

export const AdminDashboard = () => {
  const {user} = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/" replace />
  }
 

  return (
    <div>
      <Navbar />
      <SideNav_admin />
      {user && <p>Welcome, {user.email}!</p>}
      <Footer />
    
    </div>
  );
};
