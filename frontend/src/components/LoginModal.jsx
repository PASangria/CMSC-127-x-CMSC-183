import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { X } from "react-feather";
import FormField from './FormField';
import ErrorMessage from './ErrorMessage';
import './css/loginModal.css';
import SubmitButton from './SubmitButton';
import { useContext } from 'react';
import { AuthContext } from "../context/AuthContext";

const LoginModal = ({ toggleModal, role }) => {
  const { login, loading, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setUsernameError(false);
    setPasswordError(false);
  
    let hasError = false;
  
    if (!username) {
      setUsernameError(true);
      hasError = true;
    }
  
    if (!password) {
      setPasswordError(true);
      hasError = true;
    }
  
    if (hasError) return;
  
    const result = await login(username, password, role);
  
    if (result) {
      navigate(role === 'admin' ? '/admin' : '/user');
    } else {
      setError('Invalid username or password.');
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
          label="Student Number"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          name="username"
          required={true}
          error={usernameError}
        />

        <FormField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          required={true}
          error={passwordError}
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
