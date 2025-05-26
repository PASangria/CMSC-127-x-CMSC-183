import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import './css_pages/forgotpassword.css';
import { useNavigate } from 'react-router-dom';

export const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/auth/users/reset_password/', {
                email,
            });
            setMessage('Password reset email sent. Check your inbox.');
            setError('');
        } catch (err) {
            setError('Something went wrong. Please try again.');
            setMessage('');
        }
    };

    const navigate = useNavigate();

    const handleCancel = () => {
        navigate('/login');
    };

    return (
        <>
            <Navbar />
            <div className="signup">
                <div className="signup__container">
                    <div className="signup__content fade-in-up">
                        <div className="signup__left fade-in-up">
                            <h1 className="hero-title">
                                Forgot your <span className="highlighted-text">Password?</span>
                            </h1>
                        </div>
                        <div className="signup__right fade-in-up">
                            <h2 className="signup__header">Reset Your Password</h2>
                            <form onSubmit={handleSubmit} className="signup__form">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className={`form-input ${error ? 'error' : ''}`}
                                />
                                {message && <p className="success-message">{message}</p>}
                                {error && <p className="error-message">{error}</p>}
                                <div className="button-group" style={{marginTop: "20px"}}>
                                    <button type="submit" className="submit-button" style={{marginBottom: "0"}}>Send Reset Link</button>
                                    <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    );
};