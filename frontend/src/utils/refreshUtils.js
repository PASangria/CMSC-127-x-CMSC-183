import { jwtDecode } from 'jwt-decode';  
import { getRefreshToken, setRefreshToken, removeRefreshToken, removeToken, setToken } from './cookieUtils';

export const isRefreshTokenExpired = (refreshToken) => {
  try {
    const decoded = jwtDecode(refreshToken);
    return decoded.exp < Date.now() / 1000;
  } catch (err) {
    return true;
  }
};

export const refreshToken = async () => {
  const refresh = getRefreshToken();
  
  if (!refresh || isRefreshTokenExpired(refresh)) {
    return { success: false, message: 'Refresh token is invalid or expired.' };
  }

  try {
    const res = await fetch('http://localhost:8000/auth/jwt/refresh/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh })
    });

    if (!res.ok) {
      throw new Error(`Token refresh failed with status: ${res.status}`);
    }

    const data = await res.json();
    if (!data.access) {
      throw new Error('No new access token received');
    }

    setToken(data.access);
    setRefreshToken(data.refresh || refresh); 
    return { success: true, message: 'Token refresh successful' };
  } catch (err) {
    removeToken();
    removeRefreshToken();

    return { success: false, message: err.message || 'An error occurred during token refresh' };
  }
};
