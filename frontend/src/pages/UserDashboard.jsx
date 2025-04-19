import React, { useEffect, useState } from 'react';
// import LogoutButton from "../components/LogoutButton"
import Navbar from '../components/NavBar';
import SideNav_student from '../components/SideNav_student';
import Footer from '../components/Footer';

export const UserDashboard = () => {
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
      <Navbar />
      <SideNav_student />
      <Footer />
    
    </div>
  );
};
