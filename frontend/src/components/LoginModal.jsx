import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getCookie } from "../api/getCookie";

const LoginModal = () => {
  const navigate = useNavigate();

  const [csrfToken, setCsrfToken] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch("http://localhost:8000/api/users/csrf/", {
      credentials: "include",
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:8000/api/users/login/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"), 
      },
      credentials: 'include',
      body: JSON.stringify({ username, password })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Login failed');
        }
        return response.json();
      })
      .then(() => {
        navigate('/user');
      })
      .catch((err) => {
        console.error(err);
        setError('Username or password is incorrect.');
      });
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label>
            <input type="checkbox" /> Remember me
          </label>
        </div>

        <button type="submit">Log In</button>
      </form>

      <div>
        <Link to="/forgot-password">Forgot password?</Link>
        <br />
        <Link to="/signup">Don't have an account? Sign Up</Link>
      </div>
    </div>
  );
};

export default LoginModal;