import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DepartmentPage from '../pages/department/DepartmentPage';
import ProfilePage from '../pages/user/ProfilePage';
import HomePage from '../pages/home/HomePage';
// import LoginPage from '../pages/user/LoginPage';
import CoursePage from '../pages/course/CoursePage';
import DepartmentDetailPage from '../pages/department/DepartmentDetailPage';
import CourseDetailPage from '../pages/course/CourseDetailPage';
import ClassPage from '../pages/class/ClassPage';
import ClassDetailPage from '../pages/class/ClassDetailPage';
import StudentPage from '../pages/student/StudentPage';
import StudentDetailPage from '../pages/student/StudentDetailPage';
import AttendanceDetailPage from '../pages/attendance/AttendanceDetailPage';
import AttendancePage from '../pages/attendance/AttendancePage';
import AvailabilityPage from '../pages/availability/AvailabilityPage';
import AvailabilityDetailPage from '../pages/availability/AvailabilityDetailPage';
// import ProfilePage from '../pages/profile/ProfilePage';
import LoginPage from '../pages/auth/LoginPage';
const AppRoutes = () => (
    <Routes>
        {/* Core Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profiles" element={<ProfilePage />} />

        {/* Department Routes */}
        <Route path="/departments" element={<DepartmentPage />} />
        <Route path="/departments/:id" element={<DepartmentDetailPage />} />

        {/* Course Routes */}
        <Route path="/courses" element={<CoursePage />} />
        <Route path="/courses/:id" element={<CourseDetailPage />} />

        {/* Class Routes */}
        <Route path="/classes" element={<ClassPage />} />
        <Route path="/classes/:id" element={<ClassDetailPage />} />

        {/* Student Routes */}
        <Route path="/students" element={<StudentPage />} />
        <Route path="/students/:id" element={<StudentDetailPage />} />

        {/* Attendance Routes */}
        <Route path="/attendances" element={<AttendancePage />} />
        <Route path="/attendances/:id" element={<AttendanceDetailPage />} />

        {/* Availability Routes */}
        <Route path="/availabilities" element={<AvailabilityPage />} />
        <Route path="/students/:id/availability" element={<AvailabilityDetailPage />} />
    </Routes>
);

export default AppRoutes;
