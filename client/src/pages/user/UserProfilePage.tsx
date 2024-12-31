import React, { useState } from 'react';
import UserProfileList from '../../components/features/userProfile/UserProfileList';
import { UserProfile } from '../../types/UserProfile';

const UserProfilePage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  const handleEdit = (profile: UserProfile) => {
    // Additional logic for editing if needed
    console.log('Editing profile:', profile);
  };

  const handleDelete = (id: number) => {
    // Additional logic for deletion if needed
    console.log('Deleted profile:', id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <UserProfileList
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default UserProfilePage;
