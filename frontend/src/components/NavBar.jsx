import React, { useState } from 'react';
import LoginModal from './LoginModal'; 

export default function Navbar() {
    const [showLoginModal, setShowLoginModal] = useState(false);

    const openLoginModal = () => setShowLoginModal(true);
    const closeLoginModal = () => setShowLoginModal(false);

    return (
        <>
            <nav className="nav">
                <div className="headerLogo">
                    <div className="headerPhoto">
                        {/* Logo here */}
                    </div>
                    <div className="headerLogoName">
                        <div className="nameUp">
                            <h2>University of the Philippines</h2>
                        </div>
                        <div className="nameDown">
                            <h1>MINDANAO</h1>
                        </div>
                    </div>
                    <div className="navigation">
                        <ul>
                            <li><a href="/">HOME</a></li>
                            <li><a href="/FAQ">FAQ</a></li>
                            <li><a href="/forms">FORMS</a></li>
                            <li><button onClick={openLoginModal} className="link-button">LOGIN</button></li>
                            <li><a href="/signup">SIGNUP</a></li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Modal rendered conditionally */}
            {showLoginModal && <LoginModal onClose={closeLoginModal} />}
        </>
    );
}
