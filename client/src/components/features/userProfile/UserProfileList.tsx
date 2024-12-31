// src/components/features/userProfile/UserProfileList.tsx
import React, { useEffect, useState } from 'react';
import { getUserProfiles, deleteUserProfile } from '../../../services/userService';
import { UserProfile } from '../../../types/UserProfile';
import UserProfileForm from './UserProfileForm';

interface UserProfileListProps {
  onEdit?: (profile: UserProfile) => void;
  onDelete?: (id: number) => void;
}

const UserProfileList: React.FC<UserProfileListProps> = ({ onEdit, onDelete }) => {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchProfiles = async () => {
    try {
      setIsLoading(true);
      const data = await getUserProfiles();
      setProfiles(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch profiles');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleEdit = (profile: UserProfile) => {
    setSelectedProfile(profile);
    setIsEditing(true);
    if (onEdit) {
      onEdit(profile);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this profile?')) {
      return;
    }

    try {
      await deleteUserProfile(id);
      setProfiles(profiles.filter(profile => profile.id !== id));
      if (onDelete) {
        onDelete(id);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to delete profile');
    }
  };

  const handleFormSuccess = (profile: UserProfile) => {
    setIsEditing(false);
    setSelectedProfile(null);
    fetchProfiles(); // Refresh the list
  };

  if (isLoading) {
    return <div className="text-center">Loading profiles...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        {/* <h2 className="text-2xl font-bold">User Profiles</h2> */}
        <button
          onClick={() => setIsEditing(true)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Create New Profile
        </button>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                {selectedProfile ? 'Edit Profile' : 'Create New Profile'}
              </h3>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setSelectedProfile(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <UserProfileForm
              initialData={selectedProfile || {}}
              onSuccess={handleFormSuccess}
            />
          </div>
        </div>
      )}

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              {profile.avatar && (
                <img
                  src={profile.avatar}
                  alt={profile.username}
                  className="w-12 h-12 rounded-full"
                />
              )}
              <div>
                <h3 className="font-semibold">{profile.username}</h3>
                <p className="text-sm text-gray-600">{profile.email}</p>
                <span className="inline-block px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">
                  {profile.role}
                </span>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <p><strong>Contact:</strong> {profile.contact}</p>
              {profile.department && (
                <p><strong>Department:</strong> {profile.department}</p>
              )}
              {profile.gender && (
                <p><strong>Gender:</strong> {profile.gender}</p>
              )}
            </div>

            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => handleEdit(profile)}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(profile.id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfileList;
