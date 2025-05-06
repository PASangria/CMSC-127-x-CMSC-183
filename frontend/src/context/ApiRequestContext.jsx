// src/context/ApiRequestContext.js
import { createContext, useContext } from 'react';
import { apiRequest } from '../utils/apiUtils';

export const ApiRequestContext = createContext(null);

export const ApiRequestProvider = ({ children }) => {
  const request = async (url, options = {}) => {
    try {
      const response = await apiRequest(url, options);
      return response;
    } catch (error) {
      console.error("API request error:", error);
      return null;
    }
  };

  return (
    <ApiRequestContext.Provider value={{ request }}>
      {children}
    </ApiRequestContext.Provider>
  );
};

export const useApiRequest = () => useContext(ApiRequestContext);
