import React, { useState, useContext, useEffect } from 'react'; 
import { useNavigate, Link, useLocation } from 'react-router-dom';
import FormField from '../components/FormField';
import './css_pages/loginPage.css'; 
import SubmitButton from '../components/SubmitButton';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 
  const navigate = useNavigate();
  const location = useLocation();
  
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get('role');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); 

    try {
      const success = await login(email, password);
      if (success) {
        if (role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/student');
        }
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  const roleLabel = role === 'admin' ? 'Admin' : 'Student';

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-header">Login as {roleLabel}</h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
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

          {error && <div className="error-message">{error}</div>}

          <div className="extra-links">
            <Link to="/forgot-password">Forgot password?</Link>
            <a href="/signup">{"Don't have an account? Sign Up"}</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
