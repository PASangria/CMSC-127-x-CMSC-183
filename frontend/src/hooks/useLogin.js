import { useEffect, useState } from 'react';
import { getCookie } from '../api/getCookie';

export const useLogin = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Ensure CSRF is fetched before logging in
    fetch("http://localhost:8000/api/users/csrf/", {
      credentials: "include",
    });
  }, []);

  const login = async (username, password) => {
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
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      return await response.json(); // Optional: return user/token/etc.
    } catch (err) {
      setError('Username or password is incorrect.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { login, error, loading };
};
