import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css_pages/resetpassword.css';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import Modal from '../components/Modal'; 
import '../components/css/Modal.css';

export const ResetPassword = () => {
    const { uid, token } = useParams();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [reNewPassword, setReNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);
        setShowMessageModal(false);
        setIsLoading(true);

        if (newPassword !== reNewPassword) {
            setMessage('Passwords do not match.');
            setIsError(true);
            setShowMessageModal(true);
            setIsLoading(false);
            return;
        }

        try {
            await axios.post('http://localhost:8000/auth/users/reset_password_confirm/', {
                uid,
                token,
                new_password: newPassword,
            });

            setMessage('Password has been reset successfully.');
            setIsError(false);
            setShowMessageModal(true);
        } catch (err) {
            setMessage('Invalid link or password. Please try again.');
            setIsError(true);
            setShowMessageModal(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleModalClose = () => {
        setShowMessageModal(false);
        if (!isError) {
            navigate('/login');
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
                        </div>
                    </div>
                </div>
            </div>

            {isLoading && (
                <Modal>
                    <div className="modal-message-with-spinner">
                        <div className="loading-spinner" />
                        <p className="loading-text">Resetting password... Please wait.</p>
                    </div>
                </Modal>
            )}

            {showMessageModal && !isLoading && (
                <Modal>
                    <div className="modal-message-with-spinner">
                        <p className="loading-text" style={{ fontWeight: 'bold' }}>
                            {isError ? 'Error' : 'Success'}
                        </p>
                        <p>{message}</p>
                        <button className="okay-button" onClick={handleModalClose}>OK</button>
                    </div>
                </Modal>
            )}

            <Footer />
        </div>
    );
};
