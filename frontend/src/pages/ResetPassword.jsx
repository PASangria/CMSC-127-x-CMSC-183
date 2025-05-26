import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css_pages/resetpassword.css';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';

export const ResetPassword = () => {
    const { uid, token } = useParams();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [reNewPassword, setReNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== reNewPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            await axios.post('http://localhost:8000/auth/users/reset_password_confirm/', {
                uid,
                token,
                new_password: newPassword,
            });

            setMessage('Password has been reset successfully.');
            setError('');
            window.location.href = "/login"; 
        } catch (err) {
            setError('Invalid link or password. Please try again.');
            setMessage('');
        }
    };

    return (
        <div className="signup-page-wrapper">
            <Navbar />
            <div className="signup">
                <div className="signup__container">
                    <div className="signup__content fade-in-up">
                        <div className="signup__left fade-in-up">
                            <h1 className="hero-title">
                                Reset your <span className="highlighted-text">Password</span>
                            </h1>
                        </div>
                        <div className="signup__right fade-in-up">
                            <h2 className="signup__header">Set a New Password</h2>
                            <form onSubmit={handleSubmit} className="signup__form">
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    className="form-input"
                                    style={{ marginBottom: '20px' }}
                                />
                                <input
                                    type="password"
                                    placeholder="Confirm New Password"
                                    value={reNewPassword}
                                    onChange={(e) => setReNewPassword(e.target.value)}
                                    required
                                    className="form-input"
                                    style={{ marginBottom: '20px' }}
                                />
                                <button type="submit" className="submit-button">
                                    Set New Password
                                </button>
                            </form>
                            {message && <p className="message success">{message}</p>}
                            {error && <p className="message error">{error}</p>}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
