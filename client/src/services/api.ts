import axios from 'axios';

// Create an Axios instance with default settings
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000', // Adjust this based on your Django server URL
    headers: {
        'Content-Type': 'application/json',
    },
});


// Request interceptor to attach token if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });


export default api; // Export the Axios instance for use in other files
