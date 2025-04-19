import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/upmin-logo.svg'; 
import LoginModal from './LoginModal'; 
import './css/navbar.css'; 

export default function Navbar() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const dropdownRef = useRef(null);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Handle outside click to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleRoleClick = (role) => {
        setSelectedRole(role);
        setShowDropdown(false);
        setShowLoginModal(true);
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
                            <h2  className="nameUp">University of the Philippines</h2>
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
                            <div className="dropdown-wrapper" ref={dropdownRef}>
                            <button onClick={() => setShowDropdown(prev => !prev)} className="link-button">
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
