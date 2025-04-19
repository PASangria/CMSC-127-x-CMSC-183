import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import './sideNav.css';

const SideNav_admin = () => {
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!loading && !user) {
      // Redirect if user is not authenticated
      setTimeout(() => {
        window.location.href = '/';
      }, 3000);
    }
  }, [user, loading]);

  if (loading) return <div className="side-navigator">Loading...</div>;
  if (!user) return <div className="side-navigator">You are not authenticated. Redirecting to the home page...</div>;

  return (
    <div className="side-navigator">
      <div className="avatar-section">
        <div className="avatar">
          {user.first_name?.charAt(0)}{user.last_name?.charAt(0)}
        </div>
        <div className="user-info">
          <h4>{user.first_name} {user.last_name}</h4>
          <p>{user.email}</p>
        </div>
      </div>

      <div className="search-bar">
        <input type="text" placeholder="Search..." />
      </div>

      <div className="nav-buttons">
        <button>Dashboard</button>
        <button>Student</button>

        <div className="dropdown">
          <button className="dropdown-button">Record Management</button>
          <div className="dropdown-content">
            <button>Option 1</button>
            <button>Option 2</button>
          </div>
        </div>

        <button>Report Analytics</button>
        <button>System Settings</button>
      </div>
    </div>
  );
};

export default SideNav_admin;
