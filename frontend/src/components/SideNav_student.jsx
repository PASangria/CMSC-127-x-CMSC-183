import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; // Import the Link component
import { AuthContext } from '../context/AuthContext'; // Import the AuthContext
import './css/sideNav.css';

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
        <Link to="/myprofile">
          <button>My Profile</button>
        </Link>
        <Link to="/user">
          <button>Dashboard</button>
        </Link>
        <Link to="/submitted-forms">
          <button>Submitted Forms</button>
        </Link>
        <Link to="/privacy-setting">
          <button>Privacy Setting</button>
        </Link>
      </div>
    </div>
  );
};

export default SideNav_student;
