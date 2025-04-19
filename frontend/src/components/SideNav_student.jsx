import React from 'react';
import './SideNav.css';

const SideNav_student = ({ user }) => {
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
        <button>My Profile</button>
        <button>Dashboard</button>
        <button>Submitted Forms</button>
        <button>Privacy Setting</button>
      </div>
    </div>
  );
};

export default SideNav_student;