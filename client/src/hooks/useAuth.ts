import { useState, useEffect } from 'react';
import { UserProfile } from '../types/UserProfile';
import { getUserProfile } from '../services/userService';
import jwt_decode from 'jwt-decode';

interface JWTPayload {
  user_id: number;
  exp: number;
}

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const accessToken = localStorage.getItem('access');
        if (!accessToken) {
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        // Decode the token
        const decoded = jwt_decode<JWTPayload>(accessToken);
        
        // Check if token is expired
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem('access');
          localStorage.removeItem('refresh');
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        // Token is valid, fetch user profile
        const profile = await getUserProfile(decoded.user_id);
        setUserProfile(profile);
        setIsAuthenticated(true);
        
        // Store profile in localStorage for RoleBasedRoute
        localStorage.setItem('userProfile', JSON.stringify(profile));
      } catch (err: any) {
        setError(err.message);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const logout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('userProfile');
    setIsAuthenticated(false);
    setUserProfile(null);
  };

  return {
    isAuthenticated,
    userProfile,
    isLoading,
    error,
    logout
  };
};

export default useAuth;
