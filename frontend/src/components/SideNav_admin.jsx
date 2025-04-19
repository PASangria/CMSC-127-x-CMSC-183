import React from 'react';
import './SideNav.css';

const SideNav_admin = ({ user }) => {
  return (
    <div className="side-navigator">
      <div className="avatar-section">
        <div className="avatar">{user.name[0]}</div>
        <div className="user-info">
          <h4>{user.name}</h4>
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