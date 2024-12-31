import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserProfile, USER_ROLES } from '../../types/UserProfile';

interface RoleBasedRouteProps {
  element: JSX.Element;
  allowedRoles: number[];
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ element, allowedRoles }) => {
  // First check if user is authenticated
  const accessToken = localStorage.getItem('access');
  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  // Get user profile from localStorage (you might want to use a context instead)
  const userProfileStr = localStorage.getItem('userProfile');
  if (!userProfileStr) {
    return <Navigate to="/login" />;
  }

  try {
    const userProfile: UserProfile = JSON.parse(userProfileStr);
    
    // Check if user's role is allowed
    if (!allowedRoles.includes(userProfile.user_type)) {
      // Redirect to home page or show unauthorized message
      return <Navigate to="/" />;
    }

    return element;
  } catch (error) {
    // If there's an error parsing the profile, redirect to login
    return <Navigate to="/login" />;
  }
};

export const AdminRoute: React.FC<{ element: JSX.Element }> = ({ element }) => (
  <RoleBasedRoute element={element} allowedRoles={[USER_ROLES.ADMIN]} />
);

export const TeacherRoute: React.FC<{ element: JSX.Element }> = ({ element }) => (
  <RoleBasedRoute element={element} allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.TEACHER]} />
);

export const StudentRoute: React.FC<{ element: JSX.Element }> = ({ element }) => (
  <RoleBasedRoute element={element} allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.TEACHER, USER_ROLES.STUDENT]} />
);

export const ParentRoute: React.FC<{ element: JSX.Element }> = ({ element }) => (
  <RoleBasedRoute element={element} allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.PARENT]} />
);

export const ManagerRoute: React.FC<{ element: JSX.Element }> = ({ element }) => (
  <RoleBasedRoute element={element} allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.MANAGER]} />
);

export default RoleBasedRoute;
