// src/utils/apiUtils.js
import { getToken } from './cookieUtils';
import { refreshToken } from './refreshUtils';

export const apiRequest = async (url, options = {}) => {
  let token = getToken();
  
  const fetchWithToken = async (token) => {
    const res = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  };

  // First attempt with the current token
  let response = await fetchWithToken(token);

  // Handle 401 Unauthorized, i.e., expired token
  if (response.status === 401) {
    console.log('Access token expired, attempting refresh...');
    
    const { success } = await refreshToken();
    
    if (success) {
      token = getToken(); // Get the new token
      response = await fetchWithToken(token);  // Retry the request with the new token
    }
  }

  return response;
};
