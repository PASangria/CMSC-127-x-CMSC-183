import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Import the AuthContext
import '../components/css/SideNav.css';

const SideNav_student = () => {
  const { user } = useContext(AuthContext); // Access user from AuthContext

  if (!user) {
    // Show a loading or fallback state if the user is not authenticated yet
    return (
      <div className="side-navigator">
        <p>Loading...</p>
      </div>
    );
  }

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
        <button>My Profile</button>
        <button>Dashboard</button>
        <button>Submitted Forms</button>
        <button>Privacy Setting</button>
      </div>
    </div>
  );
};

export default SideNav_student;
