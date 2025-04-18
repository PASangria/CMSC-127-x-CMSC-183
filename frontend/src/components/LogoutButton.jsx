import { getCSRFToken } from '../api/auth';

function LogoutButton({ setUser }) {
  const handleLogout = async () => {
    try {
      const csrfToken = await getCSRFToken();

      const res = await fetch('http://localhost:8000/api/users/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        credentials: 'include',
      });

      if (res.ok) {
        setUser(null); // Clear user state in parent
        window.location.href = '/';
      } else {
        throw new Error('Logout failed');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while logging out. Please try again.');
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}

export default LogoutButton;
