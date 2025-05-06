import { getToken, setToken } from './cookieUtils';
import { refreshToken } from './refreshUtils'; 
import { AuthContext } from '../context/AuthContext';


export const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp < Date.now() / 1000;
  } catch (err) {
    console.error("Token decode error:", err);
    return true; 
  }
};

export const apiRequest = async (url, options = {}, context) => {
  let token = getToken();

  let response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    console.log('Access token expired, attempting refresh...');
    const success = await refreshToken();

    if (success) {
      token = getToken();  
      response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
     
      context.logout();
      return null; 
    }
  }

  return response;
};
