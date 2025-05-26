import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './css/SideNav1.css';
import {
  PersonOutline,
  DashboardOutlined,
  AssignmentTurnedInOutlined,
  SettingsOutlined,
  PeopleOutline,
  DescriptionOutlined,
  AnalyticsOutlined,
  BuildOutlined,
  HelpOutline,
  LogoutOutlined
} from '@mui/icons-material';

const SideNav = ({ variant, onLogoutClick }) => {
    const { user, profileData, loading, logout } = useContext(AuthContext);

    useEffect(() => {
        if (!loading && !user) {
            setTimeout(() => {
                window.location.href = '/';
            }, 3000);
        }
    } , [user, loading]);

    if (loading || !user) {
        return (
        <div className="side-navigator">
            {loading ? 'Loading...' : 'You are not authenticated. Redirecting to the home page...'}
        </div>
        );
    }

    const firstName = profileData?.first_name || user?.first_name || 'First';
    const lastName = profileData?.last_name || user?.last_name || 'Last';
    const email = user?.email || 'user@example.com';

    const handleLogout = () => {
        logout(); 
    };

    return (
        <div className="side-navigator">
                <div className="avatar-section">
                    <div className="avatar">
                        {firstName.charAt(0)}{lastName.charAt(0)}
                    </div>
                    <div className="user-info">
                        <h4>{firstName} {lastName}</h4>
                        <p>{email}</p>
                    </div>
                </div>

                <div className="nav-buttons">
                    <div className="nav-buttons-top">
                        {variant === 'student' ? (
                            <>
                                <Link to="/myprofile"><button><PersonOutline /> My Profile</button></Link>
                                <Link to="/student"><button><DashboardOutlined /> Dashboard</button></Link>
                                <Link to="/public-forms"><button><DescriptionOutlined /> Forms</button></Link>
                                <Link to="/user-privacy-setting"><button><SettingsOutlined /> Privacy Settings</button></Link>
                            </>
                        ) : (
                            <>
                                <Link to="/admin"><button><DashboardOutlined /> Dashboard</button></Link>
                                <Link to="/admin-student-list"><button><PeopleOutline /> Student</button></Link>

                                <div className="dropdown">
                                    <button className="dropdown-button"><DescriptionOutlined />Record Management</button>
                                    <div className="dropdown-content">
                                        <Link to="/admin-bis-list"><button><DescriptionOutlined /> Basic Info Sheets</button></Link>
                                        <Link to="/admin-scif-list"><button><DescriptionOutlined /> SCIF</button></Link>
                                        <Link to="/admin-referral-list"><button><DescriptionOutlined /> Referral Forms</button></Link>
                                    </div>
                                </div>
                                <Link to="/admin-reports"><button><AnalyticsOutlined /> Report Analytics</button></Link>
                                <Link to="/admin-audit-log"><button><SettingsOutlined /> System Logs</button></Link>
                                <Link to="/admin-system-settings"><button><BuildOutlined /> System Settings</button></Link>
                            </>
                        )}
                    </div>

                    <div className="nav-buttons-bottom">
                        <Link to="/help"><button><HelpOutline /> Help</button></Link>
                         <button onClick={handleLogout}><LogoutOutlined /> Log out</button>
                    </div>
                </div>
        </div>
    );
};

export default SideNav;