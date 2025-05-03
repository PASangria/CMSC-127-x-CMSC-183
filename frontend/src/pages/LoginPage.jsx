import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import FormField from '../components/FormField';  
import SubmitButton from '../components/SubmitButton';
import './css_pages/loginPage.css'; 

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      // Redirect user to the dashboard or other page upon success
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-page-content">
        <h2 className="login-header">Login</h2>

        <form onSubmit={handleSubmit} className="login-form">

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
            text={loading ? "Logging in..." : "Log In"}
            loadingText="Logging in..."
            disabled={loading}
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

export default LoginPage;
