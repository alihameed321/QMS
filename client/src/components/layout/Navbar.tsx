import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile, logout } = useAuthContext();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-semibold text-gray-800">
              QMS System
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {userProfile && (
              <>
                <div className="text-gray-700">
                  <span className="font-medium">{userProfile.username}</span>
                  <span className="mx-2">|</span>
                  <span className="text-blue-600">{userProfile.role}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
