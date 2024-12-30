import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000'; // Adjust to your server

// 1. Login (Obtain tokens)
export async function login(username: string, password: string) {
  const response = await axios.post(`${API_BASE_URL}/api/token/`, {
    username,
    password,
  });
  return response.data; 
  // typically { access: '...', refresh: '...' }
}

// 2. Refresh token (optional if you want auto-refresh logic)
export async function refreshToken(refresh: string) {
  const response = await axios.post(`${API_BASE_URL}/api/token/refresh/`, {
    refresh,
  });
  return response.data; 
  // typically { access: '...' }
}

// 3. Logout
// If you're storing tokens in localStorage, you can just remove them
export function logout() {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
}
