import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, requireAdmin = false, requireUser = false, requireAuth = false }) => {
  const { role, isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login?role=student" />;
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
