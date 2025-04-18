import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/upmin-logo.svg'; 
import LoginModal from './LoginModal'; 
import './css/navbar.css'; 

export default function Navbar() {
    const [showLoginModal, setShowLoginModal] = useState(false);

    const openLoginModal = () => setShowLoginModal(true);
    const closeLoginModal = () => setShowLoginModal(false);

    return (
        <>
            <nav className="nav">
                <div className="headerLogo">
                    <div className="headerPhoto">
                        <img src={logo} alt="UP Min Logo" />
                    </div>
                    <div className="headerLogoName">
                        <h2  className="nameUp">University of the Philippines</h2>
                        <h1 className="nameDown">MINDANAO</h1>
                    </div>
                    </div>
                    <div className="navigation">
                        <ul>
                            <li> 
                                <Link to="/">HOME</Link>
                            </li>
                            <li>
                                <Link to="/faq">FAQ</Link>
                            </li>
                            <li><Link to="/forms">FORMS</Link></li>
                            <li><button onClick={openLoginModal} className="link-button">LOGIN</button></li>
                            <li><Link to="/signup">SIGNUP</Link></li>
                        </ul>
                    </div>
            </nav>

            {/* Modal rendered conditionally */}
            {showLoginModal && <LoginModal toggleModal={closeLoginModal} />}
        </>
    );
}
