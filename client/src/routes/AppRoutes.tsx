import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DepartmentPage from '../pages/DepartmentPage';
// Import other pages...

const AppRoutes = () => (
    <Routes>
        {/* Other routes */}
        <Route path="/departments" Component={DepartmentPage} />
        {/* Other routes */}
    </Routes>
);

export default AppRoutes;
