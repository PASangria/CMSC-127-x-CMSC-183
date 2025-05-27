import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Loader from './Loader';

const ProtectedRoute = ({ children, requireAdmin = false, requireUser = false, requireAuth = true }) => {
  const { role, isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return < Loader />;
  }

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (requireAdmin && role !== 'admin') {
    return <Navigate to="/unauthorized" />;
  }

  if (requireUser && role === 'admin') {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
