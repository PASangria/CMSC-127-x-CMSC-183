import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PublicOnlyRoute = ({ children }) => {
  const { isAuthenticated, user } = useContext(AuthContext);

  if (isAuthenticated) {
    if (user?.is_superuser) {
      return <Navigate to="/admin" />;
    }
    return <Navigate to="/user" />;
  }

  return children;
};

export default PublicOnlyRoute;
