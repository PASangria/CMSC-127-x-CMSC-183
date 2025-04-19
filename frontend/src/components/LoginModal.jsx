// components/LoginModal.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { X } from "react-feather";
import FormField from './FormField';
import ErrorMessage from './ErrorMessage';
import { useLogin } from '../hooks/useLogin';
import './css/loginModal.css';
import SubmitButton from './SubmitButton';

const LoginModal = ({ toggleModal, role }) => {
  const navigate = useNavigate();
  const { login, error, loading } = useLogin();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // You can pass the role to the login logic if needed
    const result = await login(username, password, role); 
    
    if (result) {
      // Redirect based on role
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    }
  };

  const roleLabel = role === 'admin' ? 'Admin' : 'Student';

  return (
    <div className="modal-overlay">
      <div className="login-modal relative">
        {/* Close Button */}
        <div className="absolute top-2 right-2 z-10">
          <button
            onClick={toggleModal}
            className="p-1 rounded-full text-gray-400 bg-transparent hover:bg-gray-100 hover:text-gray-600 transition duration-150 close-button"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        
        <h2 className="login-header">Login as {roleLabel}</h2>
        
        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {error && <ErrorMessage message={error} />}
          <FormField
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            name="username"
            required={true}
          />
          <FormField
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            name="password"
            required={true}
          />

          <SubmitButton
            loading={loading}
            text="Log In"
            loadingText="Logging in..."
          />

          <div className="extra-links">
            <Link to="#">Forgot password?</Link>
            <a href="/signup">{"Don't have an account? Sign Up"}</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
