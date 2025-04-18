import React, { useEffect, useState } from 'react';
import LogoutButton from "../components/LogoutButton"

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/users/profile/', {
      credentials: 'include',  // Ensure cookies (like session cookies) are sent
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Not authenticated');
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('You are not authenticated. Redirecting to the home page...');
        setTimeout(() => {
          window.location.href = '/';
        }, 3000); // Redirect after 3 seconds
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {error && <p>{error}</p>}
      <h2>Welcome, {user.first_name} {user.last_name}!</h2>
      <p><strong>Student Number:</strong> {user.username}</p> {/* Assuming 'username' is the student number */}
      <p><strong>Email:</strong> {user.email}</p>

      <LogoutButton setUser={setUser} />
    
    </div>
  );
};

export default UserPage;