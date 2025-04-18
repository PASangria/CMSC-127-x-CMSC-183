import { useState } from 'react';
import { getCSRFToken } from '../api/auth';

function LogoutButton({ setUser }) {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      // Ensure CSRF cookie is set before attempting logout
      const csrfToken = await getCSRFToken();
      console.log('Fetched CSRF Token:', csrfToken); // Debug log to verify CSRF token
      
      if (!csrfToken) {
        throw new Error('CSRF token not found. Make sure getCSRFToken() calls the CSRF endpoint and includes credentials.');
      }

      // Perform logout
      const res = await fetch('http://localhost:8000/api/users/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken, // Send CSRF token in header
        },
        credentials: 'include', // Ensure cookies are sent
      });

      if (res.ok) {
        setUser(null); // Clear user state in parent
        window.location.href = '/'; // Redirect to home
      } else {
        const errorData = await res.json();
        console.error('Logout failed:', errorData);
        throw new Error('Logout failed: ' + (errorData?.message || 'Unknown error'));
      }
    } catch (err) {
      console.error('Logout error:', err);
      alert('An error occurred while logging out. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleLogout} disabled={loading}>
      {loading ? 'Logging out...' : 'Logout'}
    </button>
  );
}

export default LogoutButton;
