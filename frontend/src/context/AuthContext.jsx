import { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import * as jwt_Decode from "jwt-decode"; 
 
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token); 
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch (error) {
      console.error("Error decoding token:", error);
      return false;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token && !isTokenExpired(token)) {
      const fetchUserData = async () => {
        try {
          const userResponse = await fetch('http://localhost:8000/auth/users/me/', {
            method: "GET",
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
          });

          if (userResponse.ok) {
            const userData = await userResponse.json();
            setUser(userData);
          } else {
            localStorage.removeItem('access_token'); // Remove only the access_token
            setUser(null);
          }
        } catch (error) {
          console.error('Error fetching user data', error);
          localStorage.removeItem('access_token');
          setUser(null);
        }
      };

      fetchUserData();
    } else {
      localStorage.removeItem('access_token');
      setUser(null);
    }
  }, []);

  const isAuthenticated = user !== null;

  const logout = async (navigate) => {
    try {
      const response = await fetch('http://localhost:8000/auth/token/logout', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}`, 'Content-Type': 'application/json' }
      });
      if (!response.ok) {
        throw new Error('Logout failed');
      }

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      setUser(null);
      console.log('Logout success');
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const login = async (email, password) => {
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/auth/jwt/create/', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      if (data.access) {
        localStorage.setItem('access_token', data.access);
        const userResponse = await fetch('http://localhost:8000/auth/users/me/', {
          method: "GET",
          headers: { 'Authorization': `Bearer ${data.access}`, 'Content-Type': 'application/json' },
        });

        if (!userResponse.ok) {
          throw new Error('Failed to fetch user details');
        }

        const userData = await userResponse.json();
        setUser(userData);
        return true;
      } else {
        throw new Error('No access token received');
      }
    } catch (error) {
      console.error('Login failed', error);
      setError(error.message);
      return false;
    }
  };

  const refreshToken = async () => {
    const refresh = localStorage.getItem('refresh_token');
    if (!refresh) {
      return false;
    }

    try {
      const response = await fetch('http://localhost:8000/auth/jwt/refresh/', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh }),
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const data = await response.json();
      if (data.access) {
        localStorage.setItem('access_token', data.access);
        return true;
      }
    } catch (error) {
      console.error('Error refreshing token', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshToken, error, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
