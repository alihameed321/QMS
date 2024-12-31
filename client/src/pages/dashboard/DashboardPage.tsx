import React from 'react';
import { useAuthContext } from '../../context/AuthContext';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { USER_ROLES } from '../../types/UserProfile';

const DashboardPage: React.FC = () => {
  const { userProfile } = useAuthContext();

  const getStatistics = () => {
    // This would typically come from an API
    return {
      totalStudents: 150,
      totalTeachers: 25,
      activeClasses: 12,
      attendanceRate: 92,
    };
  };

  const stats = getStatistics();

  const StatCard: React.FC<{ title: string; value: number; subtitle: string; trend?: number }> = ({
    title,
    value,
    subtitle,
    trend
  }) => (
    <Card className="bg-white dark:bg-gray-800">
      <div className="px-4 py-5 sm:p-6">
        <dt className="text-base font-normal text-gray-900 dark:text-gray-300">{title}</dt>
        <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
          <div className="flex items-baseline text-2xl font-semibold text-blue-600 dark:text-blue-400">
            {value}
            <span className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              {subtitle}
            </span>
          </div>
          {trend && (
            <div className={`inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium ${
              trend > 0 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
            }`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
            </div>
          )}
        </dd>
      </div>
    </Card>
  );

  const renderAdminDashboard = () => (
    <div className="space-y-6">
      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          subtitle="students"
          trend={5}
        />
        <StatCard
          title="Total Teachers"
          value={stats.totalTeachers}
          subtitle="teachers"
        />
        <StatCard
          title="Active Classes"
          value={stats.activeClasses}
          subtitle="classes"
          trend={2}
        />
        <StatCard
          title="Attendance Rate"
          value={stats.attendanceRate}
          subtitle="%"
          trend={-1}
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card
          title="Recent Activity"
          subtitle="Latest system activities"
          actions={
            <Button variant="secondary" size="sm">
              View All
            </Button>
          }
        >
          <div className="space-y-4">
            {/* Activity list would go here */}
            <p className="text-gray-500 dark:text-gray-400">Loading activities...</p>
          </div>
        </Card>

        <Card
          title="Upcoming Events"
          subtitle="Schedule for next 7 days"
          actions={
            <Button variant="secondary" size="sm">
              View Calendar
            </Button>
          }
        >
          <div className="space-y-4">
            {/* Events list would go here */}
            <p className="text-gray-500 dark:text-gray-400">Loading events...</p>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderTeacherDashboard = () => (
    <div className="space-y-6">
      {/* Teacher-specific content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          title="My Classes"
          subtitle="Currently active classes"
          actions={
            <Button variant="primary" size="sm">
              Take Attendance
            </Button>
          }
        >
          <div className="space-y-4">
            {/* Class list would go here */}
            <p className="text-gray-500 dark:text-gray-400">Loading classes...</p>
          </div>
        </Card>

        <Card
          title="Today's Schedule"
          subtitle="Upcoming classes"
        >
          <div className="space-y-4">
            {/* Schedule would go here */}
            <p className="text-gray-500 dark:text-gray-400">Loading schedule...</p>
          </div>
        </Card>

        <Card
          title="Recent Submissions"
          subtitle="Latest student work"
        >
          <div className="space-y-4">
            {/* Submissions would go here */}
            <p className="text-gray-500 dark:text-gray-400">Loading submissions...</p>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderStudentDashboard = () => (
    <div className="space-y-6">
      {/* Student-specific content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          title="My Classes"
          subtitle="Currently enrolled classes"
        >
          <div className="space-y-4">
            {/* Class list would go here */}
            <p className="text-gray-500 dark:text-gray-400">Loading classes...</p>
          </div>
        </Card>

        <Card
          title="Upcoming Assignments"
          subtitle="Due this week"
        >
          <div className="space-y-4">
            {/* Assignments would go here */}
            <p className="text-gray-500 dark:text-gray-400">Loading assignments...</p>
          </div>
        </Card>

        <Card
          title="My Attendance"
          subtitle="Last 30 days"
        >
          <div className="space-y-4">
            {/* Attendance chart would go here */}
            <p className="text-gray-500 dark:text-gray-400">Loading attendance...</p>
          </div>
        </Card>
      </div>
    </div>
  );

  const getDashboardContent = () => {
    switch (userProfile?.user_type) {
      case USER_ROLES.ADMIN:
        return renderAdminDashboard();
      case USER_ROLES.TEACHER:
        return renderTeacherDashboard();
      case USER_ROLES.STUDENT:
        return renderStudentDashboard();
      default:
        return <p>Unknown user role</p>;
    }
  };

  return (
    <div>
      <PageHeader
        title={`Welcome, ${userProfile?.username || 'User'}!`}
        subtitle="Here's what's happening in your account"
        actions={
          <Button
            variant="primary"
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            }
          >
            Quick Action
          </Button>
        }
      />
      {getDashboardContent()}
    </div>
  );
};

export default DashboardPage;
