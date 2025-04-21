import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import '../components/SideNav_admin'
import SideNav_admin from '../components/SideNav_admin';

export const AdminSystemSettings = () => {

  return (
    <div>
      <Navbar />
      <SideNav_admin />
      <h1>System Settings</h1>
      <Footer />
    </div>
  );
};
