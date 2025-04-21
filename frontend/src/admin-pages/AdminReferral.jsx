import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import '../components/SideNav_admin'
import SideNav_admin from '../components/SideNav_admin';

export const AdminReferral = () => {

  return (
    <div>
      <Navbar />
      <SideNav_admin />
      <h1>Referral Forms</h1>
      <Footer />
    </div>
  );
};
