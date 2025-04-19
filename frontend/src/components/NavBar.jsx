import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Import the AuthContext
import logo from '../assets/upmin-logo.svg'; 
import LoginModal from './LoginModal'; 
import './css/navbar.css'; 
import { ChevronDown } from 'react-feather';

export default function Navbar() {
    const { user, logout, isAuthenticated } = useContext(AuthContext);  // Accessing AuthContext
    const [showDropdown, setShowDropdown] = useState(false);
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const location = useLocation();
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

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get("showLogin") === "true") {
            setShowLoginModal(true);
        }
    }, [location.search]);

    const handleRoleClick = (role) => {
        setSelectedRole(role);
        setShowDropdown(false);
        setShowLoginModal(true);
        setIsMenuOpen(false);
    };

    const handleLogout = () => {
        logout();  // Using the logout function from AuthContext
        navigate('/');  // Redirecting to home after logout
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
                        <li><Link to="/">HOME</Link></li>
                        <li><Link to="/faq">FAQ</Link></li>
                        <li><Link to="/forms">FORMS</Link></li>

                        {!isAuthenticated ? (
                            <>
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
                        ) : (
                            <div className="dropdown-wrapper" ref={userDropdownRef}>
                               <button
                                    onClick={() => setShowUserDropdown(prev => !prev)} 
                                    className={`link-button ${showUserDropdown ? 'active' : ''}`} >
                                    {`HELLO, ${user?.username || 'Account'}`}
                                    <ChevronDown className='dropdown-icon'/>
                                </button>
                                {showUserDropdown && (
                                    <div className="dropdown-menu">
                                        <div className='dropdown-choice' onClick={handleLogout}>Logout</div> 
                                    </div>
                                )}
                            </div>
                        )}
                    </ul>
                </div>
            </nav>

            {showLoginModal && (
                <LoginModal
                    role={selectedRole}
                    toggleModal={() => setShowLoginModal(false)}
                />
            )}
        </>
    );
}
