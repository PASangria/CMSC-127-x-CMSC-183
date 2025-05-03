import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // adjust the path if needed

const ProtectedRoute = ({ children, requireAdmin = false, requireUser = false, requireAuth = false }) => {
  const { user, isAuthenticated, loading, hasRole } = useContext(AuthContext);

  // Handle loading state if the auth context is checking the user
  if (loading) {
    return <div>Loading...</div>; // Optional: show a loader while auth is being checked
  }

  // Prevent logged-in users from accessing login/signup if requireAuth is true
  if (requireAuth && isAuthenticated) {
    return <Navigate to="/" />;
  }

  // Block non-admins from admin-only pages
  if (requireAdmin && !hasRole('admin')) {
    return <Navigate to="/unauthorized" />;
  }

  // Block admins from user-only pages
  if (requireUser && hasRole('admin')) {
    return <Navigate to="/unauthorized" />;
  }

  // If none of the above block access, show the child component
  return children;
};

export default ProtectedRoute;
