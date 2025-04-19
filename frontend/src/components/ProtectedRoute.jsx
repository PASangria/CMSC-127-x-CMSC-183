// components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import Unauthorized from '../pages/Unauthorized';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const isSuperuser = localStorage.getItem("is_superuser") === "true";

  if (requireAdmin && !isSuperuser) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
