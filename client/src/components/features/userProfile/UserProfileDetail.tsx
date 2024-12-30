import React, { useEffect, useState } from "react";
import { getUserProfile } from "../../../services/userService";
import { UserProfile } from "../../../types/UserProfile";

interface UserProfileDetailProps {
  id: number; // The ID of the user profile to fetch
}

const UserProfileDetail: React.FC<UserProfileDetailProps> = ({ id }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(id);
        setProfile(data);
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchProfile();
  }, [id]);

  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h2>User Profile Detail</h2>
      <p>User ID: {profile.user}</p>
      <p>Contact: {profile.contact}</p>
      <p>Date of Birth: {profile.dob}</p>
      {/* etc... */}
    </div>
  );
};

export default UserProfileDetail;
