import { createContext, useState, useEffect, useContext } from "react";
import PropTypes from 'prop-types';
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [role, setRole] = useState(() => {
    // Check for saved role in localStorage (or decide to extract from token if needed)
    const savedRole = localStorage.getItem('role');
    return savedRole !== null ? savedRole : null;
  });

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

  const setRoleFromToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      const userRole = decoded.role; 
      setRole(userRole);
      localStorage.setItem('role', userRole); 
    } catch (error) {
      console.error("Error decoding token for role:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token && !isTokenExpired(token)) {
      setRoleFromToken(token);  // Set the role when token is valid
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
            localStorage.removeItem('access_token');
            setUser(null);
            setRole(null);
          }
        } catch (error) {
          console.error('Error fetching user data', error);
          localStorage.removeItem('access_token');
          setUser(null);
          setRole(null);
        }
      };

      fetchUserData();
    } else {
      localStorage.removeItem('access_token');
      setUser(null);
      setRole(null);
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

      setTimeout(() => {
        navigate('/');
      }, 2000);
      
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("role"); 

      setUser(null);
      setRole(null);
      console.log('Logout success');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const login = async (email, password) => {
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/api/users/auth/jwt/create/', {
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
        setRoleFromToken(data.access);  // Extract the role from the token

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
        setRoleFromToken(data.access);  // Extract the role from the new token

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
      }
    } catch (error) {
      console.error('Error refreshing token', error);
      return false;
    }
  };

  const hasRole = (requiredRole) => {
    return role === requiredRole;
  };

  return (
    <AuthContext.Provider value={{
      user,
      role,
      login,
      logout,
      refreshToken,
      error,
      isAuthenticated,
      hasRole,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
