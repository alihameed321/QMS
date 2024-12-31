import React, { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useAuthContext } from '../../context/AuthContext';
import { USER_ROLES } from '../../types/UserProfile';

const ProfilePage: React.FC = () => {
  const { userProfile } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: userProfile?.username || '',
    email: userProfile?.email || '',
    firstName: userProfile?.first_name || '',
    lastName: userProfile?.last_name || '',
    phone: userProfile?.phone || '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile update logic here
    setIsEditing(false);
  };

  const breadcrumbs = [
    { name: 'Dashboard', href: '/' },
    { name: 'Profile' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Profile Settings"
        subtitle="Manage your account settings and preferences"
        breadcrumbs={breadcrumbs}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Summary Card */}
        <Card className="lg:col-span-1">
          <div className="text-center p-6">
            <div className="relative inline-block">
              <div className="h-32 w-32 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-4xl font-bold text-gray-600 dark:text-gray-300 mx-auto">
                {userProfile?.username.charAt(0).toUpperCase()}
              </div>
              <button className="absolute bottom-0 right-0 rounded-full bg-white dark:bg-gray-800 p-2 shadow-lg border border-gray-200 dark:border-gray-700">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">
              {userProfile?.username}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {Object.entries(USER_ROLES).find(
                ([_, value]) => value === userProfile?.user_type
              )?.[0] || 'User'}
            </p>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4">
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Email
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                  {formData.email}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Phone
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                  {formData.phone}
                </dd>
              </div>
            </dl>
          </div>
        </Card>

        {/* Profile Edit Form */}
        <Card className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="form-input"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="form-input"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-input"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              {isEditing ? (
                <>
                  <Button
                    variant="secondary"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                  >
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button
                  variant="primary"
                  onClick={() => setIsEditing(true)}
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  }
                >
                  Edit Profile
                </Button>
              )}
            </div>
          </form>
        </Card>

        {/* Security Settings */}
        <Card
          className="lg:col-span-3"
          title="Security Settings"
          subtitle="Manage your password and security preferences"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between py-4">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Password
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Last changed 3 months ago
                </p>
              </div>
              <Button variant="secondary">
                Change Password
              </Button>
            </div>

            <div className="flex items-center justify-between py-4 border-t border-gray-200 dark:border-gray-700">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Two-Factor Authentication
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Button variant="secondary">
                Enable 2FA
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
