import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import Navbar from '../components/NavBar';
import SideNav_admin from '../components/SideNav_admin';
import Footer from '../components/Footer';
import DefaultLayout from '../components/DefaultLayout'

export const AdminDashboard = () => {
  const {user} = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/" replace />
  }
 

  return (
    <div>
      <DefaultLayout variant="admin">

        {user && <p>Welcome, {user.email}!</p>}
      </DefaultLayout>
    
    </div>
  );
};
