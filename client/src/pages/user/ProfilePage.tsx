import React, { useState } from "react";
import UserProfileList from "../../components/features/userProfile/UserProfileList";
import UserProfileForm from "../../components/features/userProfile/UserProfileForm";
import { UserProfile } from "../../types/UserProfile";

const ProfilePage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Partial<UserProfile> | null>(null);

  const handleCreateClick = () => {
    setSelectedProfile(null);
    setShowForm(true);
  };

  const handleEditClick = (profile: UserProfile) => {
    setSelectedProfile(profile);
    setShowForm(true);
  };

  const handleFormSuccess = (profile: UserProfile) => {
    // For example, refresh the list or close the form
    console.log("Success!", profile);
    setShowForm(false);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>User Profiles</h1>
      <button onClick={handleCreateClick}>Create New Profile</button>

      {showForm && (
        <UserProfileForm
          initialData={selectedProfile || {}}
          onSuccess={handleFormSuccess}
        />
      )}

      {/* 
         If you want an edit button in the list, you can pass a callback into 
         `UserProfileList` that triggers handleEditClick. For now, this is a basic list.
       */}
      <UserProfileList />
    </div>
  );
};

export default ProfilePage;
