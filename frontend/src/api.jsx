import axios from 'axios';

// Setup the base URL for your backend API
const api = axios.create({
  baseURL: 'http://localhost:8000/login/api/', 
});

export default api;
