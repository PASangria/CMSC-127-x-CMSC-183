    import React, { useState, useEffect, useContext, useRef } from 'react';
    import { Link, useNavigate, useLocation } from 'react-router-dom';
    import { AuthContext } from '../context/AuthContext';
    import logo from '../assets/upmin-logo.svg';
    import './css/navbar.css';
    import { ChevronDown, Home, User } from 'react-feather';
    import { toast } from 'react-toastify';
    import {
        Dialog,
        DialogTitle,
        DialogContent,
        DialogActions,
        Button,
    } from "@mui/material";

    export default function Navbar() {
        const { user, logout, isAuthenticated, role, profileData, loading } = useContext(AuthContext);
        const [showDropdown, setShowDropdown] = useState(false);
        const [showUserDropdown, setShowUserDropdown] = useState(false);
        const [isMenuOpen, setIsMenuOpen] = useState(false);
        const nickname = profileData?.nickname ?? 'User';
        const fullName = `${profileData?.first_name || user?.first_name || ''} ${profileData?.last_name || user?.last_name || ''}`;
        const idNumber = profileData?.student_id || user?.student_id || '';
        const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

        const navigate = useNavigate();
        const location = useLocation();
        const dropdownRef = useRef(null);
        const userDropdownRef = useRef(null);

        const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
            setLogoutDialogOpen(true); // Open confirmation modal
            setIsMenuOpen(false);      // Close menu
        };

        const confirmLogout = () => {
            logout(navigate);  // Call the logout function from context with navigation
            toast.success("You have been logged out!");
            setLogoutDialogOpen(false);  // Close the confirmation dialog
        };

        const isDashboard = location.pathname.startsWith('/student') || location.pathname.startsWith('/admin');

        if (loading) {
            return (
                <nav className="nav">
                    <div className='nav-top'>
                        <div className="headerLogo">
                            <img src={logo} alt="UP Min Logo" />
                        </div>
                        <p className="navbar-loading">Loading...</p>
                    </div>
                </nav>
            );
        }

        return (
            <>
                <nav className="nav">
                    <div className='nav-top'>
                        <Link to="/" className="headerLogo">
                            <div className="headerPhoto">
                                <img src={logo} alt="UP Min Logo" />
                            </div>
                            <div className="headerLogoName">
                                <h2 className="nameUp">University of the Philippines</h2>
                                <h1 className="nameDown">MINDANAO</h1>
                            </div>
                        </Link>
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
                                    <div className={`dropdown-wrapper ${showDropdown ? 'active' : ''}`} ref={dropdownRef}>
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
                                <>
                                <li>
                                    <Link to={role === 'admin' ? "/admin" : "/student"}>
                                        <Home />
                                    </Link>
                                </li>
                                <li
                                    className={`dropdown-wrapper ${showUserDropdown ? 'active' : ''}`}
                                    ref={userDropdownRef}
                                >
                                    <button
                                        onClick={() => setShowUserDropdown(prev => !prev)}
                                        className={`link-button ${showUserDropdown ? 'active' : ''}`}
                                    >
                                        <User className='dropdown-icon' />
                                        <span className='user-label'>{fullName}</span>
                                        <ChevronDown className={`dropdown-icon ${showUserDropdown ? 'rotate' : ''}`} />
                                    </button>
                                    {showUserDropdown && (
                                        <div className="dropdown-menu user-dropdown">
                                            <div className="user-info-dropdown">
                                                <div className="avatar">{fullName.charAt(0)}</div>
                                                <div>
                                                    <p>{fullName}</p>
                                                    {idNumber && <p>ID: {idNumber}</p>}
                                                </div>
                                            </div>
                                            {role === 'student' && (
                                                <>
                                                    <Link to="/myprofile"><div className='dropdown-choice'>My Profile</div></Link>
                                                    <Link to="/public-forms"><div className='dropdown-choice'>Forms</div></Link>
                                                    <Link to="/submitted-forms"><div className='dropdown-choice'>Submitted Forms</div></Link>
                                                    <Link to="/privacy-setting"><div className='dropdown-choice'>Privacy Setting</div></Link>
                                                </>
                                            )}
                                            {role === 'admin' && (
                                                <>
                                                    <Link to="/admin"><div className='dropdown-choice'>Dashboard</div></Link>
                                                    <Link to="/admin-student-list"><div className='dropdown-choice'>Student List</div></Link>
                                                    <Link to="/admin-bis-list"><div className='dropdown-choice'>Basic Info Sheet</div></Link>
                                                    <Link to="/admin-scif-list"><div className='dropdown-choice'>Student Cumulative Info</div></Link>
                                                    <Link to="/admin-referral-list"><div className='dropdown-choice'>Referral Form</div></Link>
                                                    <Link to="/admin-reports"><div className='dropdown-choice'>Report Analytics</div></Link>
                                                    <Link to="/admin-system-settings"><div className='dropdown-choice'>System Settings</div></Link>
                                                </>
                                            )}
                                            <div className='dropdown-choice' onClick={handleLogout}>Logout</div>
                                        </div>
                                    )}
                                </li>
                            </>
                            )}
                        </ul>
                    </div>
                </nav>

                <Dialog
                    open={logoutDialogOpen}
                    onClose={() => setLogoutDialogOpen(false)}
                >
                    <DialogTitle>Confirm Logout</DialogTitle>
                    <DialogContent>Are you sure you want to log out?</DialogContent>
                    <DialogActions>
                        <Button onClick={() => setLogoutDialogOpen(false)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={confirmLogout} color="error">
                            Log Out
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }