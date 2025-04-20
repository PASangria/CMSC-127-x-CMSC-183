import React, { createContext, useEffect, useState } from 'react';
import { getCookie } from '../apiAuth/getCookie';  

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCSRFToken = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/users/csrf/", {
        credentials: "include",
      });
      const data = await res.json();
      return data.csrfToken;
    } catch (err) {
      console.error("CSRF fetch error:", err);
      return null; 
    }
  };

  const login = async (username, password, role, setError) => {
    try {
      const csrfToken = await getCSRFToken();  // Get CSRF token before making the request
  
      const res = await fetch("http://localhost:8000/api/users/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,  // Pass CSRF token in header
        },
        credentials: "include",  // Ensure credentials are sent (cookies)
        body: JSON.stringify({ username, password, role }),
      });
  
      if (!res.ok) {
        const data = await res.json();
  
        // Handling 403 error securely
        if (res.status === 403) {
          console.warn("403 Error: Access Forbidden");
  
          if (setError) setError("Invalid credentials or unauthorized access");
        } else {
          if (setError) setError(data?.detail || "Login failed");
        }
  
        return false;
      }
  
      // Optionally re-check session after login
      await checkAuth();
      return true;
    } catch (err) {
      console.error("Login error", err);
  
      // Generic error message for unexpected failures
      if (setError) setError("Login failed");
  
      return false;
    }
  };
  

  const logout = async () => {
    setLoading(true);
    try {
      const csrfToken = await getCSRFToken();
      if (!csrfToken) throw new Error('CSRF token not found.');

      const res = await fetch("http://localhost:8000/api/users/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        credentials: "include",
      });

      if (res.ok) {
        setUser(null); // Clear user state
      } else {
        const errorData = await res.json();
        console.error('Logout failed:', errorData);
        throw new Error('Logout failed');
      }
    } catch (err) {
      console.error('Logout error:', err);
      alert('An error occurred while logging out. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const checkAuth = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/users/profile/", {
        credentials: "include",  // Ensure cookies are included
      });

      if (res.ok) {
        const userData = await res.json();
        setUser(userData);

        // Store only minimal data in cookies
        document.cookie = `user=${JSON.stringify(userData)}; HttpOnly; Secure; SameSite=Strict`;
        document.cookie = `is_authenticated=true; HttpOnly; Secure; SameSite=Strict`;
        document.cookie = `is_superuser=${userData.is_superuser}; HttpOnly; Secure; SameSite=Strict`;
      } else if (res.status === 401 || res.status === 403) {
        setUser(null);
        // Clear cookies if not authenticated
        document.cookie = `is_authenticated=; Max-Age=-1`;
        document.cookie = `is_superuser=; Max-Age=-1`;
        document.cookie = `user=; Max-Age=-1`;
      } else {
        console.warn("Unexpected checkAuth status:", res.status);
      }
    } catch (err) {
      console.error("checkAuth error:", err);
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
