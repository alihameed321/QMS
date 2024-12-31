import axios from 'axios';
import { refreshToken, logout } from './authService';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't tried to refresh token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshTokenValue = localStorage.getItem('refresh');
        if (!refreshTokenValue) {
          throw new Error('No refresh token available');
        }

        // Try to refresh the token
        const response = await refreshToken(refreshTokenValue);
        
        // Update the original request with new token
        originalRequest.headers.Authorization = `Bearer ${response.access}`;
        
        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, logout and redirect to login
        await logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
