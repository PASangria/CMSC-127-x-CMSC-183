import React, { useState } from 'react';
import { useApiRequest } from '../context/ApiRequestContext';
import { useAuth } from '../context/AuthContext';
import './css_pages/resetpassword.css';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';

export const ChangePassword = () => {
    const { request } = useApiRequest();
    const { logout } = useAuth(); 
    const [currentPassword, setCurrentPassword] = useState('');
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
            const res = await request('http://localhost:8000/auth/users/set_password/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    current_password: currentPassword,
                    new_password: newPassword,
                    re_new_password: reNewPassword,
                }),
            });

            if (!res.ok) {
                const errData = await res.json();
                const firstError = Object.values(errData)[0]?.[0] || 'Password change failed.';
                setError(firstError);
                setMessage('');
                return;
            }

            setMessage('Password changed successfully.');
            setError('');
            setCurrentPassword('');
            setNewPassword('');
            setReNewPassword('');

            logout(); 

        } catch (err) {
            console.error(err);
            setError('An unexpected error occurred.');
        }
    };

    return (
        <>
        <Navbar />
        <div className="signup-page-wrapper">
            <div className="signup">
                <div className="signup__container">
                    <div className="signup__content fade-in-up">
                        <div className="signup__left fade-in-up">
                            <h1 className="hero-title">
                                Change <span className="highlighted-text">Password</span>
                            </h1>
                        </div>
                        <div className="signup__right fade-in-up">
                            <h2 className="signup__header">Update Your Password</h2>
                            <form onSubmit={handleSubmit} className="signup__form">
                                <input
                                    type="password"
                                    placeholder="Current Password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    required
                                    className="form-input"
                                />
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    className="form-input"
                                />
                                <input
                                    type="password"
                                    placeholder="Confirm New Password"
                                    value={reNewPassword}
                                    onChange={(e) => setReNewPassword(e.target.value)}
                                    required
                                    className="form-input"
                                />
                                <button type="submit" className="submit-button">
                                    Change Password
                                </button>
                            </form>
                            {message && <p className="message success">{message}</p>}
                            {error && <p className="message error">{error}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </>
    );
};
