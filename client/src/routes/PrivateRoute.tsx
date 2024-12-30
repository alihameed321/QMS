// src/routes/PrivateRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  element: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const accessToken = localStorage.getItem('access');
  return accessToken ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
