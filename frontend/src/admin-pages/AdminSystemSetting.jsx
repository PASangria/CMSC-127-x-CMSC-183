import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import '../components/SideNav_admin'
import SideNav_admin from '../components/SideNav_admin';
import DefaultLayout from '../components/DefaultLayout';
import { ChangePassword } from '../pages/ChangePassword';

export const AdminSystemSettings = () => {

  return (
    <>
    <DefaultLayout variant="admin">
      <ChangePassword />
    </DefaultLayout>
    </>
  );
};
