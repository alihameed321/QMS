import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DepartmentPage from '../pages/DepartmentPage';
import ProfilePage from '../pages/ProfilePage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
// Import other pages...

const AppRoutes = () => (
    <Routes>
        {/* Other routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/departments" Component={DepartmentPage} />
        <Route path="/profiles" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Other routes */}
    </Routes>
);

export default AppRoutes;
