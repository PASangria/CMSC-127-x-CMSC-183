import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; 
import logo from '../assets/upmin-logo.svg'; 
import './css/navbar.css'; 
import { ChevronDown } from 'react-feather';

export default function Navbar() {
    const { user, logout, isAuthenticated, hasRole, profileData } = useContext(AuthContext);  
    const [showDropdown, setShowDropdown] = useState(false);
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const nickname = profileData?.nickname || 'User';

    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const userDropdownRef = useRef(null);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Detect outside clicks for dropdowns
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
                setShowUserDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleRoleClick = (role) => {
        navigate(`/login?role=${role}`);
        setShowDropdown(false);
        setIsMenuOpen(false);
    };

    const handleLogout = () => {
        logout(navigate);
        setIsMenuOpen(false); 
    };

    return (
        <>
            <nav className="nav">
                <div className='nav-top'>
                    <div className="headerLogo">
                        <div className="headerPhoto">
                            <img src={logo} alt="UP Min Logo" />
                        </div>
                        <div className="headerLogoName">
                            <h2 className="nameUp">University of the Philippines</h2>
                            <h1 className="nameDown">MINDANAO</h1>
                        </div>
                    </div>
                    <div className="hamburger" onClick={toggleMenu}>
                        &#9776;
                    </div>
                </div>

                <div className={`navigation ${isMenuOpen ? 'open' : ''}`}>
                    <ul>
                        {!isAuthenticated ? (
                            <>
                                <li><Link to="/">HOME</Link></li>
                                <li><Link to="/faq">FAQ</Link></li>
                                <li><Link to="/public-forms">FORMS</Link></li>
                                <div className="dropdown-wrapper" ref={dropdownRef}>
                                    <button 
                                        onClick={() => setShowDropdown(prev => !prev)} 
                                        className={`link-button ${showDropdown ? 'active' : ''}`} >
                                        LOGIN
                                    </button>

                                    {showDropdown && (
                                        <div className="dropdown-menu">
                                            <div className='dropdown-choice' onClick={() => handleRoleClick('student')}>As Student</div>
                                            <div className='dropdown-choice' onClick={() => handleRoleClick('admin')}>As Admin</div>
                                        </div>
                                    )}
                                </div>
                                <li><Link to="/signup">SIGNUP</Link></li>
                            </>
                        )  : (
                            <>
                                {/* Conditional rendering based on user role */}
                                {hasRole('admin') && (
                                    <li>
                                        <Link to="/admin">Admin Dashboard</Link>
                                    </li>
                                )}
                                {hasRole('student') && (
                                    <li>
                                        <Link to="/student">User Dashboard</Link>
                                    </li>
                                )}
                                <li><Link to="/faq">FAQ</Link></li>
                                <li><Link to="/public-forms">FORMS</Link></li>
    
                                <div className="dropdown-wrapper" ref={userDropdownRef}>
                                    <button
                                        onClick={() => setShowUserDropdown(prev => !prev)} 
                                        className={`link-button ${showUserDropdown ? 'active' : ''}`} >
                                        {`HELLO, ${nickname}`}
                                        <ChevronDown className='dropdown-icon'/>
                                    </button>
                                    {showUserDropdown && (
                                        <div className="dropdown-menu">
                                            <div className='dropdown-choice' onClick={handleLogout}>Logout</div> 
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
        </>
    )
}