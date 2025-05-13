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

  let response = await fetchWithToken(token);

  if (response.status === 401) {
    console.log('Access token expired, attempting refresh...');
    
    const { success } = await refreshToken();
    
    if (success) {
      token = getToken();
      response = await fetchWithToken(token); 
    }
  }

  return response;
};
