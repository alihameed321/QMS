import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DepartmentPage from '../pages/department/DepartmentPage';
import ProfilePage from '../pages/user/ProfilePage';
import HomePage from '../pages/home/HomePage';
import LoginPage from '../pages/user/LoginPage';
import CoursePage from '../pages/course/CoursePage';
import DepartmentDetailPage from '../pages/department/DepartmentDetailPage';
import CourseDetailPage from '../pages/course/CourseDetailPage';
import ClassPage from '../pages/class/ClassPage';
import ClassDetailPage from '../pages/class/ClassDetailPage';
import StudentPage from '../pages/student/StudentPage';
import StudentDetailPage from '../pages/student/StudentDetailPage';
import AttendanceDetailPage from '../pages/attendance/AttendanceDetailPage';
import AttendancePage from '../pages/attendance/AttendancePage';
// Import other pages...

const AppRoutes = () => (
    <Routes>
        {/* Other routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/departments" element={<DepartmentPage />} />
        <Route path="/courses" element={<CoursePage />} />
        <Route path="/profiles" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/departments/:id" element={<DepartmentDetailPage />} />
        <Route path="/courses/:id" element={<CourseDetailPage />} />
        <Route path="/classes" element={<ClassPage />} />
        <Route path="/classes/:id" element={<ClassDetailPage />} />
        <Route path="/students" element={<StudentPage />} />
        <Route path="/students/:id" element={<StudentDetailPage />} />
        <Route path="/attendances" element={<AttendancePage />} />
        <Route path="/attendances/:id" element={<AttendanceDetailPage />} />
        {/* Other routes */}
    </Routes>
);

export default AppRoutes;
