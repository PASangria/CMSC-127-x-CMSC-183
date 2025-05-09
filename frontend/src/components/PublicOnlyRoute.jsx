import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PublicOnlyRoute = ({ children }) => {
  const { isAuthenticated, role } = useContext(AuthContext);

  if (isAuthenticated) {
    if (role == 'admin') {
      return <Navigate to="/admin" />;
    }
    return <Navigate to="/student" />;
  }

  return children;
};

export default PublicOnlyRoute;
