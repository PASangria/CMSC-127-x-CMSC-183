  import React, { useEffect, useState } from 'react';
  import { getCSRFToken } from '../api/auth'; // Ensure you have this API call to get the CSRF token.
  import { useNavigate } from 'react-router-dom';

  const LoginModal = () => {
    const [csrfToken, setCsrfToken] = useState('');
    const [studentNumber, setStudentNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      getCSRFToken().then(setCsrfToken).catch(console.error);
    }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      // Validate the student number format manually before sending it
      const studentNumberPattern = /^\d{4}-\d{5}$/;
      if (!studentNumberPattern.test(studentNumber)) {
        setError('Invalid student number format. Use the format 2024-32466');
        return;
      }
    
      if (!csrfToken) {
        setError('CSRF token is missing. Please try again.');
        return;
      }
    
      try {
        const res = await fetch('http://localhost:8000/api/users/login/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
          },
          credentials: 'include',
          body: JSON.stringify({ studentNumber, password }),
        });
    
        if (res.ok) {
          navigate('/user');
        } else {
          const errorData = await res.json();
          setError(errorData.detail || 'Login failed');
        }
      } catch (err) {
        console.error('Login error:', err.message);
        setError('An error occurred. Please try again.');
      }
    };    

    return (
      <div className="login-modal">
        <h2>Login</h2>

        <form onSubmit={handleSubmit} noValidate>
          {/* Display error if present */}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <div className="form-group">
            <label htmlFor="studentNumber">Student Number:</label>
            <input
              type="text"
              id="studentNumber"
              name="studentNumber"
              value={studentNumber}
              onChange={(e) => setStudentNumber(e.target.value)}
              required
              pattern="^\d{4}-\d{5}$" // Optional HTML pattern validation
              title="Please enter a valid student number in the format 2024-32466"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Log In</button>
        </form>
      </div>
    );
  };

  export default LoginModal;
