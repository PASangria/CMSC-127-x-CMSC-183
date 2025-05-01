import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { X } from "react-feather";
import FormField from './FormField';
import './css/loginModal.css';
import SubmitButton from './SubmitButton';
import { AuthContext } from '../context/AuthContext';

const LoginModal = ({ toggleModal, role }) => {
  const {login} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      
    }
    
  }

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

          {/* Use role-dependent label for the username field */}
          <FormField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            required={true}
          />

          <FormField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            required={true}
          />

          <SubmitButton
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
