import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
            setTimeout(() => navigate('/login'), 3000); // redirect to login
        } catch (err) {
            console.error(err.response?.data);
            setError('Invalid link or password. Please try again.');
            setMessage('');
        }
    };

    return (
        <div>
            <h2>Reset Your Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={reNewPassword}
                    onChange={(e) => setReNewPassword(e.target.value)}
                    required
                />
                <button type="submit">Set New Password</button>
            </form>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};
