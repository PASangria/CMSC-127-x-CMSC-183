import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './css/sideNav.css';

const SideNav_admin = () => {
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!loading && !user) {
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
        {/* Add Links to the buttons */}
        <Link to="/admin">
          <button>Dashboard</button>
        </Link>
        <Link to="/admin-student-list">
          <button>Student</button>
        </Link>

        <div className="dropdown">
          <button className="dropdown-button">Record Management</button>
          <div className="dropdown-content">
            <Link to="/admin-bis-list">
              <button>Basic Information Sheet</button>
            </Link>
            <Link to="/admin-scif-list">
              <button>Student Cumulative Information</button>
            </Link>
            <Link to="/admin-referral-list">
              <button>Referral Form</button>
            </Link>
          </div>
        </div>

        <Link to="/admin-reports">
          <button>Report Analytics</button>
        </Link>
        <Link to="/admin-system-settings">
          <button>System Settings</button>
        </Link>
      </div>
    </div>
  );
};

export default SideNav_admin;
