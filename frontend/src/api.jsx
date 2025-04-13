import axios from 'axios';

// Setup the base URL for your backend API
const api = axios.create({
  baseURL: 'http://localhost:8000/login/api/',  // Change this to your Django API URL
});

export default api;
