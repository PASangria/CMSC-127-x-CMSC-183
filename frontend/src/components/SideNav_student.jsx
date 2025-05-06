import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; // Import the Link component
import { AuthContext } from '../context/AuthContext'; // Import the AuthContext
import './css/sideNav.css';

const SideNav_student = () => {
  const { user, profileData } = useContext(AuthContext);

  const firstName = profileData?.first_name || user?.first_name || 'First';
  const lastName = profileData?.last_name || user?.last_name || 'Last';
  const email = user?.email || 'user@example.com';


  if (!user) {
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
          {firstName.charAt(0)}{lastName.charAt(0)}
        </div>
        <div className="user-info">
          <h4>{firstName} {lastName}</h4>
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
        <Link to="/student">
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
