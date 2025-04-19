import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // adjust the path if needed

const ProtectedRoute = ({ children, requireAdmin = false, requireUser = false, requireAuth = false }) => {
  const { user, isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // Optional: show a loader while auth is being checked
  }

  const isSuperuser = user?.is_superuser || false;

  // Prevent logged-in users from accessing login/signup if requireAuth is true
  if (requireAuth && isAuthenticated) {
    return <Navigate to="/" />;
  }

  // Block non-admins from admin-only pages
  if (requireAdmin && !isSuperuser) {
    return <Navigate to="/unauthorized" />;
  }

  // Block admins from user-only pages
  if (requireUser && isSuperuser) {
    return <Navigate to="/unauthorized" />;
  }

  // If none of the above block access, show the child component
  return children;
};

export default ProtectedRoute;
