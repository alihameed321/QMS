import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(username, password);
      // data = { access: '...', refresh: '...' }
      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);
      // Redirect to home or dashboard
      navigate('/dashboard');
    } catch (err: any) {
      setError('Invalid credentials');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
        </label>
        <br />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default LoginPage;
