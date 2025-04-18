import { useEffect, useState } from 'react';
import { getCookie } from '../api/getCookie';

export const useLogin = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/api/users/csrf/", {
      credentials: "include",
    });
  }, []);

  const login = async (username, password, role) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8000/api/users/login/', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie("csrftoken"),
        },
        credentials: 'include',
        body: JSON.stringify({ username, password, role }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Login failed');
      }

      const data = await response.json();

      // 🔐 Save auth info to localStorage
      localStorage.setItem("is_superuser", data.is_superuser);
      localStorage.setItem("username", data.username);

      return data;
    } catch (err) {
      setError(err.message || 'Username or password is incorrect.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { login, error, loading };
};
